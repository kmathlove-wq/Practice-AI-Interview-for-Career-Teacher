-- 개선사항 글. 글쓴이 표는 원본 대신 섞은 값(author_hash)만 저장한다.
CREATE TABLE IF NOT EXISTS improvement_items (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  author_hash TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS improvement_items_created_at ON improvement_items (created_at DESC);

-- 도배 막기: 접속 주소를 섞은 값별로 마지막에 쓴 때를 기억한다.
CREATE TABLE IF NOT EXISTS write_limits (
  key TEXT PRIMARY KEY,
  last_at INTEGER NOT NULL
);

-- 비밀번호를 여러 번 틀린 곳을 잠시 막는다.
CREATE TABLE IF NOT EXISTS password_fails (
  key TEXT PRIMARY KEY,
  fails INTEGER NOT NULL,
  window_start INTEGER NOT NULL
);
