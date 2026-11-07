// 진로스터디 개선사항 서버 (Cloudflare Worker + D1)
// 화면(GitHub Pages)이 이 서버에 부탁하면, 서버가 검사한 뒤 데이터베이스에 저장한다.

const ALLOWED_ORIGINS = new Set([
  "https://www.xn--2z1b65dvvmomhr2j.kro.kr",
  "https://xn--2z1b65dvvmomhr2j.kro.kr",
  "http://localhost:8000",
  "http://127.0.0.1:8000"
]);
const CONTENT_MAX_LENGTH = 500; // 화면 입력칸의 maxlength와 같게 유지
const LIST_LIMIT = 200;
const IMPORT_MAX_ITEMS = 20;
const WRITE_COOLDOWN_MS = 20_000;
const PASSWORD_WINDOW_MS = 10 * 60 * 1000;
const PASSWORD_MAX_FAILS = 5;
const CLEANUP_AFTER_MS = 24 * 60 * 60 * 1000;
const AUTHOR_ID = /^[\w.-]{8,100}$/;
const ITEM_PATH = /^\/api\/improvements\/([\w-]{1,64})(\/complete)?$/;

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function sha256(text) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function corsHeaders(request) {
  const origin = request.headers.get("Origin");
  const headers = { Vary: "Origin" };
  if (ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "GET, POST, PATCH, DELETE, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type, X-Author-Id";
    headers["Access-Control-Max-Age"] = "86400";
  }
  return headers;
}

function json(request, body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...corsHeaders(request) }
  });
}

async function readBody(request) {
  try {
    return await request.json();
  } catch {
    throw new HttpError(400, "보낸 내용을 읽지 못했습니다.");
  }
}

function readContent(value) {
  const content = String(value ?? "").trim();
  if (!content) throw new HttpError(400, "내용을 적어 주세요.");
  if ([...content].length > CONTENT_MAX_LENGTH) throw new HttpError(400, `내용은 ${CONTENT_MAX_LENGTH}자까지 쓸 수 있습니다.`);
  return content;
}

// 글쓴이 표: 브라우저가 보관하는 값. 서버에는 섞은 값만 남고, 다른 사람에게는 내보내지 않는다.
async function authorHashOf(request) {
  const authorId = request.headers.get("X-Author-Id");
  return authorId && AUTHOR_ID.test(authorId) ? sha256(`author:${authorId}`) : null;
}

async function requireAuthor(request) {
  const hash = await authorHashOf(request);
  if (!hash) throw new HttpError(400, "브라우저 정보를 확인하지 못했습니다. 새로고침해 주세요.");
  return hash;
}

const ipHashOf = (request) => sha256(`ip:${request.headers.get("CF-Connecting-IP") || "unknown"}`);

// 같은 곳에서 쿨다운 안에 또 쓰면 false. 한 문장으로 처리해 동시에 눌러도 한 번만 통과한다.
async function passWriteLimit(env, key, now) {
  const result = await env.DB.prepare(
    `INSERT INTO write_limits (key, last_at) VALUES (?1, ?2)
     ON CONFLICT (key) DO UPDATE SET last_at = excluded.last_at WHERE write_limits.last_at <= ?3`
  ).bind(key, now, now - WRITE_COOLDOWN_MS).run();
  return result.meta.changes === 1;
}

async function requireWriteLimit(env, key, now) {
  if (await passWriteLimit(env, key, now)) return;
  throw new HttpError(429, "조금 뒤에 다시 등록해 주세요. (20초에 한 번)");
}

async function checkPassword(env, request, password, now) {
  const key = await ipHashOf(request);
  const cutoff = now - PASSWORD_WINDOW_MS;
  const row = await env.DB.prepare("SELECT fails, window_start FROM password_fails WHERE key = ?1").bind(key).first();
  if (row && row.window_start > cutoff && row.fails >= PASSWORD_MAX_FAILS) {
    throw new HttpError(429, "비밀번호를 너무 많이 틀렸습니다. 10분 뒤에 다시 시도해 주세요.");
  }
  const correct = env.COMPLETE_PASSWORD
    && (await sha256(String(password ?? "").slice(0, 200))) === (await sha256(env.COMPLETE_PASSWORD));
  if (correct) {
    await env.DB.prepare("DELETE FROM password_fails WHERE key = ?1").bind(key).run();
    return;
  }
  await env.DB.prepare(
    `INSERT INTO password_fails (key, fails, window_start) VALUES (?1, 1, ?2)
     ON CONFLICT (key) DO UPDATE SET
       fails = CASE WHEN window_start <= ?3 THEN 1 ELSE fails + 1 END,
       window_start = CASE WHEN window_start <= ?3 THEN excluded.window_start ELSE window_start END`
  ).bind(key, now, cutoff).run();
  throw new HttpError(401, "비밀번호가 맞지 않습니다.");
}

async function listItems(env, request) {
  const authorHash = await authorHashOf(request);
  const { results } = await env.DB.prepare(
    "SELECT id, content, author_hash, created_at, updated_at FROM improvement_items ORDER BY created_at DESC LIMIT ?1"
  ).bind(LIST_LIMIT).all();
  return results.map(({ author_hash: hash, ...item }) => ({ ...item, mine: Boolean(authorHash) && hash === authorHash }));
}

async function createItem(env, request, now) {
  const body = await readBody(request);
  const content = readContent(body?.content);
  const authorHash = await requireAuthor(request);
  await requireWriteLimit(env, `write:${await ipHashOf(request)}`, now);
  const at = new Date(now).toISOString();
  const id = crypto.randomUUID();
  await env.DB.prepare(
    "INSERT INTO improvement_items (id, content, author_hash, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?4)"
  ).bind(id, content, authorHash, at).run();
  await env.DB.batch([
    env.DB.prepare("DELETE FROM write_limits WHERE last_at < ?1").bind(now - CLEANUP_AFTER_MS),
    env.DB.prepare("DELETE FROM password_fails WHERE window_start < ?1").bind(now - CLEANUP_AFTER_MS)
  ]);
  return json(request, { id }, 201);
}

// 저장소가 잠들었던 동안 브라우저에만 임시 저장된 글을 한 번에 올린다.
async function importItems(env, request, now) {
  const body = await readBody(request);
  const authorHash = await requireAuthor(request);
  const items = Array.isArray(body?.items) ? body.items.slice(0, IMPORT_MAX_ITEMS) : [];
  if (items.length === 0) throw new HttpError(400, "올릴 글이 없습니다.");
  const rows = items.map((item) => {
    const created = Date.parse(item?.created_at);
    const at = new Date(Number.isFinite(created) && created <= now ? created : now).toISOString();
    return { content: readContent(item?.content), at };
  });
  await requireWriteLimit(env, `import:${await ipHashOf(request)}`, now);
  await env.DB.batch(rows.map(({ content, at }) => env.DB.prepare(
    "INSERT INTO improvement_items (id, content, author_hash, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?4)"
  ).bind(crypto.randomUUID(), content, authorHash, at)));
  return json(request, { imported: rows.length }, 201);
}

async function updateItem(env, request, id, now) {
  const body = await readBody(request);
  const content = readContent(body?.content);
  const authorHash = await requireAuthor(request);
  const result = await env.DB.prepare(
    "UPDATE improvement_items SET content = ?1, updated_at = ?2 WHERE id = ?3 AND author_hash = ?4"
  ).bind(content, new Date(now).toISOString(), id, authorHash).run();
  if (result.meta.changes !== 1) throw new HttpError(403, "내가 쓴 개선사항만 수정할 수 있습니다.");
  return json(request, { ok: true });
}

async function deleteItem(env, request, id) {
  const authorHash = await requireAuthor(request);
  const result = await env.DB.prepare(
    "DELETE FROM improvement_items WHERE id = ?1 AND author_hash = ?2"
  ).bind(id, authorHash).run();
  if (result.meta.changes !== 1) throw new HttpError(403, "내가 쓴 개선사항만 삭제할 수 있습니다.");
  return json(request, { ok: true });
}

async function completeItem(env, request, id, now) {
  const body = await readBody(request);
  await checkPassword(env, request, body?.password, now);
  const result = await env.DB.prepare("DELETE FROM improvement_items WHERE id = ?1").bind(id).run();
  if (result.meta.changes !== 1) throw new HttpError(404, "이미 지워진 개선사항입니다.");
  return json(request, { ok: true });
}

async function route(request, env) {
  const { pathname } = new URL(request.url);
  const { method } = request;
  const now = Date.now();

  if (pathname === "/health" && method === "GET") return json(request, { ok: true });
  if (pathname === "/api/improvements") {
    if (method === "GET") return json(request, { items: await listItems(env, request) });
    if (method === "POST") return createItem(env, request, now);
  }
  if (pathname === "/api/improvements/import" && method === "POST") return importItems(env, request, now);

  const match = pathname.match(ITEM_PATH);
  if (match) {
    const [, id, complete] = match;
    if (complete && method === "POST") return completeItem(env, request, id, now);
    if (!complete && method === "PATCH") return updateItem(env, request, id, now);
    if (!complete && method === "DELETE") return deleteItem(env, request, id);
  }
  throw new HttpError(404, "없는 주소입니다.");
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(request) });
    try {
      return await route(request, env);
    } catch (error) {
      if (error instanceof HttpError) return json(request, { error: error.message }, error.status);
      console.error(error);
      return json(request, { error: "서버에 문제가 생겼습니다. 잠시 뒤 다시 시도해 주세요." }, 500);
    }
  }
};
