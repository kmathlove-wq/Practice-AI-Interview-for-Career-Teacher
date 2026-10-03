const FALLBACK_QUESTIONS = [
  "1-1-1 교원대상 진로연계교육 역량 강화 연수 확대",
  "1-1-2 진로교육 중심 학교교육과정 운영 지원",
  "1-1-3 경기도교육청진로교육협의회 운영",
  "1-2-1 진로연계교육 정책연구학교 운영",
  "1-2-2 지역별 진로전담교사 네트워크 활성화 지원",
  "1-2-3 경기진로교육지원단 운영",
  "1-2-4 경기진로연계교육 실천사례 공모전 운영",
  "1-3-1 일반고 직업교육 위탁과정 운영",
  "2-1-1 시군 진로체험지원센터 운영 지원",
  "2-1-2 거점 진로체험지원센터 운영",
  "2-1-3 시군 진로박람회 운영 지원",
  "2-2-1 직업계고 학과체험 프로그램 운영",
  "2-2-2 꿈길 시스템 연계 진로체험교육 운영",
  "2-2-3 지역 연계 진로체험 프로그램 개발",
  "2-3-1 사회적 취약계층 진로멘토링",
  "2-3-2 학부모 대상 진로교육 연수 및 프로그램 운영",
  "3-1-1 초중고 꿈잇다 일반화 지원",
  "3-1-2 꿈잇다 정책연구학교 운영",
  "3-1-3 꿈잇다 시스템 개인정보 보호 및 정보보안 강화",
  "3-2-1 꿈잇다 2.0 고도화 추진",
  "[9진로01-01] 진로와 직업의 의미를 이해하고 다양한 직업인의 진로 특성과 삶의 모습을 탐색한다.",
  "[9진로01-02] 다양한 방법으로 자신의 진로 특성을 파악하고 긍정적 자아개념을 갖는다.",
  "[9진로01-03] 함께 일하고 싶은 직업인의 특성을 알아보고 바람직한 직업인의 자세를 갖는다.",
  "[9진로01-04] 일과 여가의 의미와 상호관계를 이해하고 조화롭고 행복한 삶을 생각한다.",
  "[9진로02-01] 사회 변화에 따른 직업 세계의 변화를 이해한다.",
  "[9진로02-02] 진로경로의 다양성과 가변성을 이해하고, 유연한 진로 탐색 태도를 함양한다.",
  "[9진로02-03] 진로 정보를 탐색하는 다양한 방법을 알아보고 관심 분야의 진로 정보를 탐색하고 활용한다.",
  "[9진로02-04] 다양한 경험과 진로 활동을 자신의 진로와 연계하며 주도적인 진로 탐색 태도를 함양한다.",
  "[9진로02-05] 고등학교의 유형, 특성, 교육과정에 대한 정보를 통해 교육 기회를 탐색한다.",
  "[9진로02-06] 창업의 특성과 창업가 정신을 이해하고 그 중요성을 인식한다.",
  "[9진로03-01] 진로의사결정의 방법과 고려 사항을 이해하고 진로를 잠정적으로 결정한다.",
  "[9진로03-02] 관심 진로 분야의 다양한 진로 경로를 탐색하고 자신의 진로 경로를 설정한다.",
  "[9진로03-03] 진로 목표 성취를 위해 학습의 필요성을 이해하고 학습 계획을 자기 주도적으로 수립하여 실천한다.",
  "[9진로03-04] 졸업 이후의 진로 계획을 수립하고 자기 관리 및 진로 준비 방법을 알아보고 실천한다.",
  "[12진로01-01] 관심 분야 직업인의 삶과 진로 특성을 탐구함으로써 관심 직업 및 전공 분야에서 요구되는 진로 특성을 이해한다.",
  "[12진로01-02] 나의 진로 특성을 통합적으로 이해하고, 관심 직업과 전공 분야에서 요구되는 특성 및 수행과 관련지어 나의 진로 특성을 점검하고 강점을 강화하고 부족한 점은 보완한다.",
  "[12진로01-03] 직업 윤리의 중요성을 이해하고 건강하고 안전한 일터를 만드는 직업인의 사회적 책임을 인식한다.",
  "[12진로01-04] 일, 학습, 여가의 가치와 상호 관계를 이해하고 자신의 직업 가치를 성찰한다.",
  "[12진로02-01] 미래 직업 세계를 탐색하고, 관심 분야의 직업 세계 변화를 예측 및 탐색한다.",
  "[12진로02-02] 관심 직업의 진로경로에 따라 요구되는 역량을 탐구한다.",
  "[12진로02-03] 관심 직업의 구체적인 정보를 수집하고 나에게 필요한 내용을 선별하여 활용한다.",
  "[12진로02-04] 관심 직업과 관련된 진학 또는 취업 정보를 탐색한다.",
  "[12진로02-05] 지속 가능한 진로 개발을 위해 다양한 진로 경로를 탐색하고 평생 학습의 중요성을 이해한다.",
  "[12진로02-06] 창업가 정신을 적용하여 관심 분야의 문제 해결을 시도하고 새로운 가치를 발견한다.",
  "[12진로02-07] 고용 관계의 권리와 책임을 이해하고, 상호 존중의 자세를 지닌다.",
  "[12진로03-01] 진로의사결정의 요인과 변화가능성을 고려하여 의사 결정을 재평가함으로써 보완하고 지속적으로 점검한다.",
  "[12진로03-02] 잠정적인 진로 목표를 설정하고 고등학교 졸업 이후의 장단기 진로 계획을 설계한다.",
  "[12진로03-03] 나의 진로 목표에 따라 진학 또는 취업에 필요한 학업 계획을 세우고 실천한다.",
  "[12진로03-04] 진로 계획의 실천을 위해 자기 관리를 하며, 환경적 변화에 대응하여 유연하게 진로를 준비한다.",
  "AI 이음 플랫폼의 중요성을 설명하고, 진로교사의 역할(활성화방안)을 말하시오.",
  "이주배경 학생의 진로특성 3가지와 진로상담방안을 말하시오.",
  "노동인권교육을 설명하고, 진로교육활성화 방안을 말하시오.",
  "온라인 창업교육 플랫폼의 메뉴를 설명하고, 이를 활용한 수업방안을 말하시오.",
  "교육기회 탐색에 대해 설명하고, 수업방안 3가지를 말하시오.",
  "'잠정성'에 대해 설명하고, 수업방안 3가지를 말하시오.",
  "진로 교육의 3대 영역 중 하나를 선택하여 수업방안 3가지를 말하시오.",
  "진로계획실천에 대해 설명하고 활성화할 수 있는 수업방안 3가지를 말하시오.",
  "환경변화에 대응한 진로교육에 대해 설명하고, 수업방안을 말하시오.",
  "경기진로교육정책의 주체 4가지와 주체별 역할에 대해 설명하시오.",
  "경기진로교육정책 3가지를 말하고, 그 중 한가지를 설명하시오.",
  "AI교육체제에 대해 설명하고, 진로교육방안을 말하시오.",
  "'격차 제로 프로젝트'를 설명하고, 교육격차 해소방안을 말하시오.",
  "LAS에 대해 설명하고, 진로교육 활성화 방안을 말하시오.",
  "금융경제교육을 설명하고, 진로교육 활성화 방안을 말하시오.",
  "진로장벽에 대해 설명하고, 지도방안을 말하시오.",
  "진로미결정 학생의 진로상담방안을 말하시오.",
  "진로변경 학생의 진로상담방안을 말하시오.",
  "고교학점제 지원방안(학업설계,학업관리,학습코칭 등)에 대해 말하시오.",
  "고교학점제에서 학생들이 겪을 수 있는 어려움을 말하고, 상담방안을 구상하시오.",
  "진로설계유형에 따른 상담방안을 말하시오.",
  "진로학업설계 지도 절차를 설명하고, 지도방안을 말하시오.",
  "진로탄력성의 요소를 말하고, 지도 방안을 말하시오.",
  "진로동기 요소를 말하고, 지도 방안을 말하시오.",
  "진로체험 운영 절차를 설명하고, 활성화 방안을 말하시오."
];

const PREP_SECONDS = 10;
const ANSWER_SECONDS_OPTIONS = [90, 120];
const DEFAULT_ANSWER_SECONDS = 90;
const RETRY_EARLY_WINDOW_SECONDS = 20;
const ANSWER_DURATION_KEY = "practiceInterviewAnswerSeconds";
const QUESTION_FILE_NAMES = ["면접예상질문.txt", "면접예상질문2.txt"];
const CUSTOM_QUESTIONS_KEY = "practiceInterviewCustomQuestions";
const DELETED_CUSTOM_QUESTIONS_KEY = "practiceInterviewDeletedCustomQuestions";
const BASE_QUESTION_EDITS_KEY = "practiceInterviewBaseQuestionEdits";
const DELETED_BASE_QUESTIONS_KEY = "practiceInterviewDeletedBaseQuestions";
const QUESTION_ORDER_KEY = "practiceInterviewQuestionOrder";
const DISABLED_TOPICS_KEY = "practiceInterviewDisabledTopics";
const DISABLED_QUESTIONS_KEY = "practiceInterviewDisabledQuestions";
const CUSTOM_QUESTION_TOPICS_KEY = "practiceInterviewCustomQuestionTopics";
const BASE_QUESTION_TOPIC_EDITS_KEY = "practiceInterviewBaseQuestionTopicEdits";
const TOPIC_RENAMES_KEY = "practiceInterviewTopicRenames";
const DELETED_TOPICS_KEY = "practiceInterviewDeletedTopics";
const DEFAULT_TOPIC = "기본 질문";
const CUSTOM_TOPIC = "개인 질문";
const NO_TOPIC = "주제 없음";
const NEW_TOPIC_VALUE = "__new_topic__";
const SUPABASE_URL = "https://habehqibpnazvsmefgew.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_dn4KwHEe4QbLlg2Lp7OQnA_Z4d4oMZd";
const IMPROVEMENT_AUTHOR_KEY = "practiceInterviewImprovementAuthorId";
const LOCAL_IMPROVEMENTS_KEY = "practiceInterviewLocalImprovements";
const IMPROVEMENT_COMPLETION_PASSWORD = "1+1=1+1=1+1=1";
const IMPROVEMENT_PROMO_DISMISS_KEY = "practiceInterviewImprovementPromoDismissDate";
const IMPROVEMENT_PROMO_VERSION = "2026-06-21-v1";

const questionText = document.querySelector("#questionText");
const questionBox = document.querySelector(".question-box");
const phaseLabel = document.querySelector("#phaseLabel");
const timerTitle = document.querySelector("#timerTitle");
const timerText = document.querySelector("#timerText");
const progressBar = document.querySelector("#progressBar");
const timerRing = document.querySelector("#timerRing");
const answerDurationToggle = document.querySelector("#answerDurationToggle");
const startBtn = document.querySelector("#startBtn");
const skipBtn = document.querySelector("#skipBtn");
const retryBtn = document.querySelector("#retryBtn");
const deviceCheckBtn = document.querySelector("#deviceCheckBtn");
const recordingState = document.querySelector("#recordingState");
const cameraState = document.querySelector("#cameraState");
const cameraPreview = document.querySelector("#cameraPreview");
const cameraPlaceholder = document.querySelector("#cameraPlaceholder");
const videoPlayer = document.querySelector("#videoPlayer");
const audioPlayer = document.querySelector("#audioPlayer");
const transcriptText = document.querySelector("#transcriptText");
const answerGuide = document.querySelector("#answerGuide");
const environmentList = document.querySelector("#environmentList");
const envPopover = document.querySelector("#envStatusPopover");
const envPopoverCloseBtn = document.querySelector("#envPopoverCloseBtn");
const feedbackBox = document.querySelector("#feedbackBox");
const practiceHistory = document.querySelector("#practiceHistory");
const historyCount = document.querySelector("#historyCount");
const questionPicker = document.querySelector("#questionPicker");
const openCustomQuestionBtn = document.querySelector("#openCustomQuestionBtn");
const openTopicFilterBtn = document.querySelector("#openTopicFilterBtn");
const randomQuestionBtn = document.querySelector("#randomQuestionBtn");
const reservedQuestionState = document.querySelector("#reservedQuestionState");
const openImprovementsBtn = document.querySelector("#openImprovementsBtn");
const openGuideBtn = document.querySelector("#openGuideBtn");
const openHistoryBtn = document.querySelector("#openHistoryBtn");
const improvementPromoModal = document.querySelector("#improvementPromoModal");
const promoCloseBtn = document.querySelector("#promoCloseBtn");
const promoDismissTodayBtn = document.querySelector("#promoDismissTodayBtn");
const promoOpenImprovementsBtn = document.querySelector("#promoOpenImprovementsBtn");
const infoModal = document.querySelector("#infoModal");
const modalTitle = document.querySelector("#modalTitle");
const modalBody = document.querySelector("#modalBody");
const closeModalBtn = document.querySelector("#closeModalBtn");
const confirmModal = document.querySelector("#confirmModal");
const confirmTitle = document.querySelector("#confirmTitle");
const confirmMessage = document.querySelector("#confirmMessage");
const confirmInputLabel = document.querySelector("#confirmInputLabel");
const confirmInputWrap = document.querySelector("#confirmInputWrap");
const confirmInput = document.querySelector("#confirmInput");
const toggleConfirmPasswordBtn = document.querySelector("#toggleConfirmPasswordBtn");
const confirmError = document.querySelector("#confirmError");
const confirmTopicWrap = document.querySelector("#confirmTopicWrap");
const confirmTopicSelect = document.querySelector("#confirmTopicSelect");
const confirmNewTopicInput = document.querySelector("#confirmNewTopicInput");
const confirmActions = document.querySelector("#confirmActions");
const confirmCloseBtn = document.querySelector("#confirmCloseBtn");
const improvementStore = window.supabase?.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY) || null;

let baseQuestions = [...FALLBACK_QUESTIONS];
let baseQuestionEdits = {};
let deletedBaseQuestions = [];
let customQuestions = [];
let deletedCustomQuestions = [];
let questionOrder = [];
let orderedQuestionEntries = [];
let baseQuestionTopics = {};
let disabledTopics = [];
let disabledQuestionKeys = [];
let expandedTopicNames = new Set();
let customQuestionTopics = {};
let baseQuestionTopicEdits = {};
let topicRenames = {};
let deletedTopics = [];
let renamingTopic = "";
let questions = [...baseQuestions];
let enabledQuestions = [...baseQuestions];
let currentQuestion = "";
let timerId = null;
let recorder = null;
let audioStream = null;
let previewStream = null;
let audioChunks = [];
let recognition = null;
let shouldRecognize = false;
let transcript = "";
let recognitionCommittedTranscript = "";
let phase = "idle";
let recordingSessionId = 0;
let answerStartedAt = 0;
let isVideoRecording = false;
let reservedQuestion = "";
let currentTimerRemaining = 0;
let answerSeconds = DEFAULT_ANSWER_SECONDS;
let activeConfirmDialog = null;
let improvementRefreshTimerId = null;
let improvementRealtimeChannel = null;
let improvementStorageMode = "remote";
let isBaseRestoreListOpen = false;
let isQuestionOrderListOpen = false;
let expandedOrderQuestionKeys = new Set();

init();

function init() {
  loadQuestionPersonalizations();
  syncQuestions();
  loadQuestionsFromTextFile();
  renderPracticeHistory();
  loadAnswerDuration();
  renderAnswerDurationButtons();
  answerDurationToggle.addEventListener("click", selectAnswerDuration);
  startBtn.addEventListener("click", startPractice);
  skipBtn.addEventListener("click", skipQuestion);
  retryBtn.addEventListener("click", retryCurrentQuestion);
  deviceCheckBtn.addEventListener("click", checkEnvironment);
  envPopoverCloseBtn.addEventListener("click", hideEnvPopover);
  questionPicker.addEventListener("change", reserveSelectedQuestion);
  openCustomQuestionBtn.addEventListener("click", openCustomQuestionModal);
  openTopicFilterBtn.addEventListener("click", openTopicFilterModal);
  modalBody.addEventListener("change", handleTopicFilterChange);
  modalBody.addEventListener("submit", handleTopicRenameSubmit);
  confirmTopicSelect.addEventListener("change", updateConfirmNewTopicVisibility);
  confirmNewTopicInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    confirmActions.querySelector("[data-confirm-ok]")?.click();
  });
  randomQuestionBtn.addEventListener("click", clearReservedQuestion);
  openImprovementsBtn.addEventListener("click", openImprovementsModal);
  openGuideBtn.addEventListener("click", () => openInfoModal("면접 가이드", answerGuide.innerHTML));
  openHistoryBtn.addEventListener("click", () => openInfoModal("최근 답변 기록", practiceHistory.innerHTML));
  promoCloseBtn.addEventListener("click", closeImprovementPromo);
  promoDismissTodayBtn.addEventListener("click", dismissImprovementPromoToday);
  promoOpenImprovementsBtn.addEventListener("click", () => {
    closeImprovementPromo();
    openImprovementsModal();
  });
  improvementPromoModal.addEventListener("click", (event) => {
    if (event.target.hasAttribute("data-promo-close")) {
      closeImprovementPromo();
    }
  });
  closeModalBtn.addEventListener("click", closeInfoModal);
  confirmCloseBtn.addEventListener("click", cancelConfirmDialog);
  confirmActions.addEventListener("click", handleConfirmAction);
  confirmInput.addEventListener("keydown", handleConfirmInputKeydown);
  toggleConfirmPasswordBtn.addEventListener("click", toggleConfirmPasswordVisibility);
  confirmModal.addEventListener("click", (event) => {
    if (event.target.hasAttribute("data-confirm-cancel")) {
      cancelConfirmDialog();
    }
  });
  modalBody.addEventListener("click", handleModalClick);
  infoModal.addEventListener("click", (event) => {
    if (event.target.hasAttribute("data-close-modal")) {
      closeInfoModal();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !confirmModal.hidden) {
      cancelConfirmDialog();
      return;
    }

    if (event.key === "Escape" && !infoModal.hidden) {
      closeInfoModal();
      return;
    }

    if (event.key === "Escape" && !improvementPromoModal.hidden) {
      closeImprovementPromo();
    }
  });
  window.addEventListener("beforeunload", stopAllMedia);
  showImprovementPromo();
}

function showImprovementPromo() {
  if (getImprovementPromoDismissValue() === getImprovementPromoTodayValue()) return;

  improvementPromoModal.hidden = false;
  promoOpenImprovementsBtn.focus();
}

function closeImprovementPromo() {
  improvementPromoModal.hidden = true;
}

function dismissImprovementPromoToday() {
  try {
    localStorage.setItem(IMPROVEMENT_PROMO_DISMISS_KEY, getImprovementPromoTodayValue());
  } catch {
    // The modal can still be closed when storage is unavailable.
  }
  closeImprovementPromo();
}

function getImprovementPromoDismissValue() {
  try {
    return localStorage.getItem(IMPROVEMENT_PROMO_DISMISS_KEY);
  } catch {
    return null;
  }
}

function getImprovementPromoTodayValue() {
  return `${getLocalDateKey()}:${IMPROVEMENT_PROMO_VERSION}`;
}

function getLocalDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
}

async function loadQuestionsFromTextFile() {
  try {
    const loadedQuestions = [];

    for (const fileName of QUESTION_FILE_NAMES) {
      const response = await fetch(fileName, { cache: "no-store" });
      if (!response.ok) continue;

      const text = await response.text();
      loadedQuestions.push(...parseTopicQuestions(text));
    }

    if (loadedQuestions.length > 0) {
      baseQuestions = loadedQuestions.map((item) => item.text);
      baseQuestionTopics = Object.fromEntries(loadedQuestions.map((item) => [item.text, item.topic]));
    }
    syncQuestions();
  } catch {
    baseQuestions = [...FALLBACK_QUESTIONS];
    syncQuestions();
  }
}

// 질문 파일의 "<주제이름>" 줄을 만나면 그 아래 질문들을 해당 주제로 묶는다.
function parseTopicQuestions(text) {
  const sections = [];
  let current = { topic: DEFAULT_TOPIC, lines: [] };

  text.replace(/\r/g, "").split("\n").forEach((line) => {
    const topicMatch = line.trim().match(/^<(.+)>$/);
    if (topicMatch) {
      sections.push(current);
      current = { topic: topicMatch[1].trim(), lines: [] };
      return;
    }
    current.lines.push(line);
  });
  sections.push(current);

  return sections.flatMap((section) =>
    parseQuestions(section.lines.join("\n")).map((question) => ({ text: question, topic: section.topic }))
  );
}

function parseQuestions(text) {
  const normalizedText = text.replace(/\r/g, "");
  const numberedQuestions = normalizedText.match(/(^|\n)\s*\d+[.)]\s*[\s\S]*?(?=\n\s*\d+[.)]\s*|$)/g);
  const questionBlocks = numberedQuestions && numberedQuestions.length > 1
    ? numberedQuestions.map((question) => question.replace(/^\s*\d+[.)]\s*/, ""))
    : normalizedText.split(/\n\s*\n/);

  return questionBlocks
    .map((question) => question.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);
}

async function startPractice() {
  if (!reservedQuestion && enabledQuestions.length === 0) {
    showNoEnabledQuestionMessage();
    return;
  }
  resetResult();
  pickRandomQuestion();
  await runCurrentQuestion();
}

async function skipQuestion() {
  stopCurrentTimer();
  await stopActiveRecording();
  if (!reservedQuestion && enabledQuestions.length === 0) {
    finishPractice("질문 없음");
    showNoEnabledQuestionMessage();
    return;
  }
  resetResult();
  pickRandomQuestion(currentQuestion);
  await runCurrentQuestion();
}

// 시계 가운데 글자 자리는 좁아서 짧은 말만 넣고, 긴 안내는 넓은 질문 칸에 흐린 글씨로 보여 준다.
function showNoEnabledQuestionMessage() {
  timerTitle.textContent = "질문 없음";
  questionText.textContent = "켜진 질문이 없어요. '주제 선택'에서 질문을 켜 주세요.";
  questionBox.classList.remove("long-question", "very-long-question");
  questionBox.classList.add("placeholder-question");
}

async function retryCurrentQuestion() {
  const canRetryEarly = phase === "answer" && currentTimerRemaining > answerSeconds - RETRY_EARLY_WINDOW_SECONDS;
  const canRetryAfterAnswer = phase === "done";
  if ((!canRetryEarly && !canRetryAfterAnswer) || !currentQuestion) return;

  stopCurrentTimer();
  await stopActiveRecording();
  resetResult();
  retryBtn.disabled = true;
  setQuestionText(currentQuestion);
  renderAnswerGuide(currentQuestion);
  await runAnswerPhase();
}

async function runCurrentQuestion() {
  startBtn.disabled = true;
  skipBtn.disabled = false;
  updateRetryAvailability();
  setPhase("prep");
  await runTimer(PREP_SECONDS, "준비 시간");

  if (phase !== "prep") return;

  await runAnswerPhase();
}

async function runAnswerPhase() {
  startBtn.disabled = true;
  skipBtn.disabled = false;

  const recordingStarted = await startRecording();
  if (!recordingStarted) {
    finishPractice("마이크 필요");
    return;
  }

  setPhase("answer");
  await runTimer(answerSeconds, "답변 시간");

  if (phase === "answer") {
    finishAnswer();
  }
}

function pickRandomQuestion(previousQuestion = "") {
  if (reservedQuestion) {
    currentQuestion = reservedQuestion;
    reservedQuestion = "";
    reservedQuestionState.textContent = "예약 없음";
    questionPicker.value = "";
    updateQuestionPickerPlaceholder();
    setQuestionText(currentQuestion);
    renderAnswerGuide(currentQuestion);
    return;
  }

  const candidates = enabledQuestions.filter((question) => question !== previousQuestion);
  const pool = candidates.length > 0 ? candidates : enabledQuestions;
  currentQuestion = pool[Math.floor(Math.random() * pool.length)];
  setQuestionText(currentQuestion);
  renderAnswerGuide(currentQuestion);
}

function setQuestionText(question) {
  questionText.textContent = question;
  questionBox.classList.remove("placeholder-question");
  questionBox.classList.toggle("long-question", question.length > 95);
  questionBox.classList.toggle("very-long-question", question.length > 150);
}

function runTimer(totalSeconds, label) {
  stopCurrentTimer();
  timerTitle.textContent = label;
  updateTimer(totalSeconds, totalSeconds);

  return new Promise((resolve) => {
    let remaining = totalSeconds;
    timerId = window.setInterval(() => {
      remaining -= 1;
      updateTimer(remaining, totalSeconds);

      if (remaining <= 0) {
        stopCurrentTimer();
        resolve();
      }
    }, 1000);
  });
}

const TIMER_RING_CIRCUMFERENCE = 2 * Math.PI * 54;

function updateTimer(remaining, total) {
  currentTimerRemaining = remaining;
  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");
  const elapsedRatio = total === 0 ? 0 : ((total - remaining) / total) * 100;
  const remainingRatio = total === 0 ? 0 : Math.min(1, Math.max(0, remaining / total));

  timerText.textContent = `${minutes}:${seconds}`;
  progressBar.style.width = `${Math.min(100, Math.max(0, elapsedRatio))}%`;
  timerRing.style.strokeDashoffset = `${TIMER_RING_CIRCUMFERENCE * (1 - remainingRatio)}`;
  updateRetryAvailability();
}

async function startRecording() {
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    transcriptText.textContent = getMediaSupportMessage("영상/음성 녹음");
    return false;
  }

  try {
    stopPreviewStream();
    audioStream = await getInterviewStream();
    recordingSessionId += 1;
    const sessionId = recordingSessionId;
    audioChunks = [];
    isVideoRecording = audioStream.getVideoTracks().length > 0;
    recorder = new MediaRecorder(audioStream);

    recorder.addEventListener("dataavailable", (event) => {
      if (sessionId === recordingSessionId && event.data.size > 0) {
        audioChunks.push(event.data);
      }
    });

    recorder.addEventListener("stop", () => showRecordingResult(sessionId));
    recorder.start();
    answerStartedAt = Date.now();
    attachPreview(audioStream);
    startSpeechRecognition();
    recordingState.textContent = isVideoRecording ? "영상 녹화 중" : "음성 녹음 중";
    recordingState.classList.add("recording");
    phaseLabel.classList.add("recording");
    cameraState.textContent = isVideoRecording ? "카메라 녹화 중" : "음성만 녹음";
    return true;
  } catch {
    // 시계 안에는 '마이크 필요'만 보이므로, 자세한 안내는 넓은 녹음 결과 칸에 보여 준다.
    transcriptText.textContent = "마이크 권한을 허용하면 답변 녹음을 시작할 수 있습니다.";
    return false;
  }
}

async function getInterviewStream() {
  try {
    return await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  } catch {
    return navigator.mediaDevices.getUserMedia({ audio: true });
  }
}

function startSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  transcript = "";
  recognitionCommittedTranscript = "";
  shouldRecognize = true;

  if (!SpeechRecognition) {
    transcriptText.textContent = "음성 인식은 이 브라우저에서 지원되지 않습니다. 녹음 파일은 답변 후 재생할 수 있습니다.";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "ko-KR";
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.addEventListener("result", (event) => {
    const sessionTranscript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join(" ")
      .trim();
    const text = [recognitionCommittedTranscript, sessionTranscript]
      .filter(Boolean)
      .join(" ")
      .trim();

    transcript = text;
    transcriptText.textContent = text || "음성을 듣고 있습니다...";
  });

  recognition.addEventListener("end", () => {
    if (shouldRecognize && phase === "answer") {
      recognitionCommittedTranscript = transcript.trim();
      try {
        recognition.start();
      } catch {
        // Some browsers briefly reject immediate restarts.
      }
    }
  });

  try {
    recognition.start();
  } catch {
    transcriptText.textContent = "음성 인식을 시작하지 못했습니다. 녹음 파일은 답변 후 재생할 수 있습니다.";
  }
}

function finishAnswer() {
  stopCurrentTimer();
  setPhase("done");
  stopActiveRecording();
  finishPractice("답변 종료");
}

function finishPractice(message) {
  setPhase("done");
  startBtn.disabled = false;
  startBtn.textContent = "새 질문 시작";
  skipBtn.disabled = true;
  updateRetryAvailability();
  timerTitle.textContent = message;
  progressBar.style.width = "100%";
}

function showRecordingResult(sessionId) {
  if (sessionId !== recordingSessionId) return;

  if (audioChunks.length > 0) {
    const blob = new Blob(audioChunks, { type: recorder?.mimeType || "video/webm" });
    const mediaUrl = URL.createObjectURL(blob);

    if (isVideoRecording) {
      videoPlayer.src = mediaUrl;
      videoPlayer.hidden = false;
      audioPlayer.hidden = true;
    } else {
      audioPlayer.src = mediaUrl;
      audioPlayer.hidden = false;
      videoPlayer.hidden = true;
    }
  }

  recordingState.textContent = isVideoRecording ? "영상 완료" : "녹음 완료";
  recordingState.classList.remove("recording");
  phaseLabel.classList.remove("recording");
  cameraState.textContent = isVideoRecording ? "영상 저장 완료" : "카메라 미사용";

  if (transcript.trim()) {
    transcriptText.textContent = `인식된 답변:\n${transcript.trim()}`;
  } else if (!transcriptText.textContent.includes("지원되지 않습니다")) {
    transcriptText.textContent = "녹음은 완료되었습니다. 인식된 텍스트가 없으면 영상을 재생해 답변을 확인해 주세요.";
  }

  renderFeedback();
  savePracticeRecord();
  renderPracticeHistory();
}

function stopActiveRecording() {
  // 녹음기의 "정지됨" 신호(stop 이벤트)는 비동기로 늦게 도착한다. 그 신호가 도착해야
  // showRecordingResult()가 실행되어 피드백이 만들어지므로, 건너뛰기/다시 시작에서도
  // 피드백을 보여주려면 이 신호가 끝날 때까지 기다려야 한다.
  return new Promise((resolve) => {
    shouldRecognize = false;

    if (recognition) {
      try {
        recognition.stop();
      } catch {
        // Recognition may already be stopped.
      }
      recognition = null;
    }

    if (recorder && recorder.state !== "inactive") {
      recorder.addEventListener("stop", () => resolve(), { once: true });
      recorder.stop();
    } else {
      resolve();
    }

    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
      audioStream = null;
    }

    stopPreviewStream();

    cameraPreview.srcObject = null;
    cameraPlaceholder.hidden = false;
  });
}

function stopCurrentTimer() {
  if (timerId) {
    window.clearInterval(timerId);
    timerId = null;
  }
  currentTimerRemaining = 0;
  updateRetryAvailability();
}

function resetResult() {
  recordingSessionId += 1;
  audioChunks = [];
  transcript = "";
  recognitionCommittedTranscript = "";
  answerStartedAt = 0;
  isVideoRecording = false;
  videoPlayer.hidden = true;
  videoPlayer.removeAttribute("src");
  videoPlayer.load();
  audioPlayer.hidden = true;
  audioPlayer.removeAttribute("src");
  audioPlayer.load();
  recordingState.textContent = "녹음 전";
  recordingState.classList.remove("recording");
  // 피드백 박스는 여기서 지우지 않는다. 건너뛰기/다시 시작 직전에 stopActiveRecording()이
  // 끝난 답변의 피드백을 이미 렌더링해뒀고, 다음 답변이 끝나면 그때 새 결과로 덮어써진다.
  updateRetryAvailability();
}

function setPhase(nextPhase) {
  phase = nextPhase;

  const labels = {
    idle: "대기 중",
    prep: "준비 중",
    answer: "답변 녹음 중",
    done: "완료"
  };

  phaseLabel.textContent = labels[nextPhase] || labels.idle;
  updateRetryAvailability();
  renderAnswerDurationButtons();
}

function loadAnswerDuration() {
  try {
    const saved = Number(localStorage.getItem(ANSWER_DURATION_KEY));
    answerSeconds = ANSWER_SECONDS_OPTIONS.includes(saved) ? saved : DEFAULT_ANSWER_SECONDS;
  } catch {
    answerSeconds = DEFAULT_ANSWER_SECONDS;
  }
}

// 준비·답변 중에 시간이 바뀌면 헷갈리므로, 그때는 버튼을 잠근다.
function renderAnswerDurationButtons() {
  const isLocked = phase === "prep" || phase === "answer";
  answerDurationToggle.querySelectorAll("[data-answer-seconds]").forEach((button) => {
    const isActive = Number(button.dataset.answerSeconds) === answerSeconds;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    button.disabled = isLocked;
  });
}

function selectAnswerDuration(event) {
  const button = event.target.closest("[data-answer-seconds]");
  if (!button || phase === "prep" || phase === "answer") return;

  answerSeconds = Number(button.dataset.answerSeconds);
  try {
    localStorage.setItem(ANSWER_DURATION_KEY, String(answerSeconds));
  } catch {
    // 저장이 안 되는 브라우저에서도 이번 연습에는 고른 시간이 적용된다.
  }
  renderAnswerDurationButtons();
}

function updateRetryAvailability() {
  const canRetryEarly = phase === "answer" && currentTimerRemaining > answerSeconds - RETRY_EARLY_WINDOW_SECONDS;
  const canRetryAfterAnswer = phase === "done" && Boolean(currentQuestion);
  retryBtn.disabled = !canRetryEarly && !canRetryAfterAnswer;
}

function showEnvPopover() {
  envPopover.hidden = false;
  positionEnvPopover();
}

function hideEnvPopover() {
  envPopover.hidden = true;
}

function positionEnvPopover() {
  const margin = 12;
  const btnRect = deviceCheckBtn.getBoundingClientRect();
  const popoverRect = envPopover.getBoundingClientRect();

  let left = btnRect.right + margin;
  let top = btnRect.top;

  if (left + popoverRect.width > window.innerWidth - margin) {
    left = btnRect.left - popoverRect.width - margin;
  }
  if (left < margin) {
    left = Math.max(margin, btnRect.left);
    top = btnRect.top - popoverRect.height - margin;
  }
  top = Math.min(top, window.innerHeight - popoverRect.height - margin);
  top = Math.max(top, margin);

  envPopover.style.left = `${left}px`;
  envPopover.style.top = `${top}px`;
}

async function checkEnvironment() {
  showEnvPopover();

  if (!navigator.mediaDevices?.getUserMedia) {
    const message = getMediaSupportMessage("카메라와 마이크 확인");
    updateEnvironmentItem("camera", message, false);
    updateEnvironmentItem("microphone", message, false);
    return;
  }

  stopPreviewStream();

  try {
    previewStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    attachPreview(previewStream);
    updateEnvironmentItem("camera", "카메라 권한 확인 완료", true);
    updateEnvironmentItem("microphone", "마이크 권한 확인 완료", true);
    cameraState.textContent = "환경 체크 완료";
  } catch {
    try {
      previewStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      updateEnvironmentItem("camera", "카메라 권한이 없어 음성만 사용할 수 있습니다.", false);
      updateEnvironmentItem("microphone", "마이크 권한 확인 완료", true);
      cameraState.textContent = "음성만 가능";
    } catch {
      updateEnvironmentItem("camera", "카메라 권한을 확인하지 못했습니다.", false);
      updateEnvironmentItem("microphone", "마이크 권한을 확인하지 못했습니다.", false);
      cameraState.textContent = "권한 필요";
    }
  }
}

function attachPreview(stream) {
  showEnvPopover();

  if (stream.getVideoTracks().length === 0) return;

  cameraPreview.srcObject = stream;
  cameraPlaceholder.hidden = true;
  updateEnvironmentItem("camera", "카메라가 정상적으로 연결되었습니다.", true);
  updateEnvironmentItem("microphone", "마이크가 정상적으로 연결되었습니다.", true);
}

function updateEnvironmentItem(checkName, message, passed) {
  const item = environmentList.querySelector(`[data-check="${checkName}"]`);
  if (!item) return;

  item.textContent = message;
  item.classList.toggle("passed", passed);
}

function getMediaSupportMessage(featureName) {
  if (!window.isSecureContext) {
    return `${featureName}은 HTTPS 주소 또는 localhost에서만 사용할 수 있습니다. GitHub Pages의 https:// 주소로 접속해 주세요.`;
  }

  return `이 브라우저에서는 ${featureName}을 지원하지 않습니다. Chrome 또는 Edge 최신 버전에서 다시 시도해 주세요.`;
}

function renderAnswerGuide(question) {
  const keywords = getQuestionKeywords(question);
  const focus = keywords.length > 0 ? keywords.join(", ") : "정책 이해, 학교 적용, 교사 역할";

  answerGuide.innerHTML = `
    <h4>추천 답변 방향</h4>
    <ul>
      <li>핵심 개념을 먼저 1문장으로 정의하세요.</li>
      <li>학교 현장 적용 방안을 학생, 교육과정, 지역 연계 관점으로 나누어 말하세요.</li>
      <li>마지막에는 진로전담교사로서 실행 의지와 기대 효과를 정리하세요.</li>
    </ul>
    <h4>지양할 답변</h4>
    <ul>
      <li>정책명만 나열하고 실제 학교 운영 장면을 말하지 않는 답변</li>
      <li>학생 맞춤 지원, 학부모 소통, 지역사회 연계를 빠뜨리는 답변</li>
    </ul>
    <h4>유사 질문</h4>
    <ul>
      <li>${focus}을 학교 교육과정에 반영한다면 어떤 순서로 추진하시겠습니까?</li>
      <li>학생의 자기주도적 진로설계역량을 높이기 위해 가장 먼저 할 일은 무엇입니까?</li>
    </ul>
  `;
}

function getQuestionKeywords(question) {
  const keywordMap = [
    "경기진로연계교육",
    "지역 연계",
    "꿈잇다",
    "꿈it",
    "자기주도적 진로설계역량",
    "진로 사각지대",
    "학교 교육과정",
    "진로전담교사",
    "경기교육정책"
  ];

  return keywordMap.filter((keyword) => question.includes(keyword)).slice(0, 3);
}

function renderFeedback() {
  const cleanText = transcript.trim();
  const elapsedSeconds = answerStartedAt ? Math.round((Date.now() - answerStartedAt) / 1000) : answerSeconds;
  const words = cleanText ? cleanText.split(/\s+/).filter(Boolean) : [];
  const fillerCount = (cleanText.match(/음|어|그|저기|약간|뭔가/g) || []).length;
  const keywords = getQuestionKeywords(currentQuestion);
  const coveredKeywords = keywords.filter((keyword) => cleanText.includes(keyword));
  const keywordScore = keywords.length === 0 ? 100 : Math.round((coveredKeywords.length / keywords.length) * 100);
  const pace = elapsedSeconds > 0 ? Math.round((words.length / elapsedSeconds) * 60) : 0;

  feedbackBox.hidden = false;
  feedbackBox.innerHTML = `
    <h4>문항별 세부 피드백</h4>
    <ul>
      <li>답변 분량: ${words.length}어절</li>
      <li>말하기 속도: 약 ${pace}어절/분</li>
      <li>질문 핵심어 반영률: ${keywordScore}%${coveredKeywords.length ? ` (${coveredKeywords.map(escapeHtml).join(", ")})` : ""}</li>
      <li>습관어 추정: ${fillerCount}회</li>
    </ul>
    <p>${getFeedbackMessage(words.length, pace, keywordScore)}</p>
  `;
}

function getFeedbackMessage(wordCount, pace, keywordScore) {
  if (wordCount === 0) {
    return "음성 인식 텍스트가 없어 정량 피드백이 제한됩니다. 영상/오디오를 재생하며 답변 구조를 직접 확인해 주세요.";
  }

  if (keywordScore < 50) {
    return "질문에 포함된 핵심 개념을 답변 초반에 더 분명히 언급하면 답변의 방향성이 좋아집니다.";
  }

  if (pace > 180) {
    return "말하기 속도가 빠른 편입니다. 개념 정의 뒤에 한 박자 쉬고 사례를 말해 보세요.";
  }

  if (wordCount < 35) {
    return "답변이 짧은 편입니다. 정책 이해, 실천 방안, 기대 효과 순서로 한 문장씩 보강해 보세요.";
  }

  return "핵심어와 답변 분량이 안정적으로 잡혔습니다. 다음 연습에서는 실제 학교 사례를 더 구체적으로 붙여 보세요.";
}

function savePracticeRecord() {
  const records = getPracticeRecords();
  const record = {
    question: currentQuestion,
    transcript: transcript.trim(),
    date: new Date().toLocaleString("ko-KR"),
    mode: isVideoRecording ? "영상면접" : "음성면접"
  };

  records.unshift(record);
  localStorage.setItem("practiceInterviewRecords", JSON.stringify(records.slice(0, 5)));
}

function getPracticeRecords() {
  try {
    return JSON.parse(localStorage.getItem("practiceInterviewRecords")) || [];
  } catch {
    return [];
  }
}

function renderPracticeHistory() {
  const records = getPracticeRecords();
  historyCount.textContent = `${records.length}개`;

  if (records.length === 0) {
    practiceHistory.textContent = "아직 저장된 연습 기록이 없습니다.";
    return;
  }

  practiceHistory.innerHTML = records
    .map((record, index) => `
      <article class="history-item">
        <div class="history-item-header">
          <strong>${escapeHtml(record.mode)} · ${escapeHtml(record.date)}</strong>
          <button class="delete-record-btn" type="button" data-delete-record="${index}">삭제</button>
        </div>
        <p><b>질문:</b> ${escapeHtml(record.question)}</p>
        <p><b>답변:</b> ${record.transcript ? escapeHtml(record.transcript) : "인식된 답변 텍스트 없음"}</p>
      </article>
    `)
    .join("");
}

function stopAllMedia() {
  stopActiveRecording();
}

function loadQuestionPersonalizations() {
  try {
    const savedQuestions = JSON.parse(localStorage.getItem(CUSTOM_QUESTIONS_KEY) || "[]");
    customQuestions = Array.isArray(savedQuestions)
      ? savedQuestions.map((question) => String(question).trim()).filter(Boolean)
      : [];
  } catch {
    customQuestions = [];
  }

  try {
    const savedDeletedCustomQuestions = JSON.parse(localStorage.getItem(DELETED_CUSTOM_QUESTIONS_KEY) || "[]");
    deletedCustomQuestions = Array.isArray(savedDeletedCustomQuestions)
      ? savedDeletedCustomQuestions.map((question) => String(question).trim()).filter(Boolean)
      : [];
  } catch {
    deletedCustomQuestions = [];
  }

  try {
    const savedEdits = JSON.parse(localStorage.getItem(BASE_QUESTION_EDITS_KEY) || "{}");
    baseQuestionEdits = savedEdits && typeof savedEdits === "object" && !Array.isArray(savedEdits)
      ? Object.fromEntries(
        Object.entries(savedEdits)
          .map(([originalQuestion, editedQuestion]) => [String(originalQuestion), String(editedQuestion).trim()])
          .filter(([, editedQuestion]) => editedQuestion)
      )
      : {};
  } catch {
    baseQuestionEdits = {};
  }

  try {
    const savedDeletedQuestions = JSON.parse(localStorage.getItem(DELETED_BASE_QUESTIONS_KEY) || "[]");
    deletedBaseQuestions = Array.isArray(savedDeletedQuestions)
      ? savedDeletedQuestions.map((question) => String(question)).filter(Boolean)
      : [];
  } catch {
    deletedBaseQuestions = [];
  }

  try {
    const savedTopics = JSON.parse(localStorage.getItem(DISABLED_TOPICS_KEY) || "[]");
    disabledTopics = Array.isArray(savedTopics) ? savedTopics.map((topic) => String(topic)) : [];
    const savedQuestionKeys = JSON.parse(localStorage.getItem(DISABLED_QUESTIONS_KEY) || "[]");
    disabledQuestionKeys = Array.isArray(savedQuestionKeys) ? savedQuestionKeys.map((key) => String(key)) : [];
  } catch {
    disabledTopics = [];
    disabledQuestionKeys = [];
  }

  customQuestionTopics = readStoredStringMap(CUSTOM_QUESTION_TOPICS_KEY);
  baseQuestionTopicEdits = readStoredStringMap(BASE_QUESTION_TOPIC_EDITS_KEY);
  topicRenames = readStoredStringMap(TOPIC_RENAMES_KEY);
  try {
    const savedDeletedTopics = JSON.parse(localStorage.getItem(DELETED_TOPICS_KEY) || "[]");
    deletedTopics = Array.isArray(savedDeletedTopics) ? savedDeletedTopics.map((topic) => String(topic)) : [];
  } catch {
    deletedTopics = [];
  }

  try {
    const savedOrder = JSON.parse(localStorage.getItem(QUESTION_ORDER_KEY) || "[]");
    questionOrder = Array.isArray(savedOrder) ? savedOrder.map((key) => String(key)) : [];
  } catch {
    questionOrder = [];
  }
}

function saveQuestionOrder() {
  localStorage.setItem(QUESTION_ORDER_KEY, JSON.stringify(questionOrder));
}

// 기본 질문은 원본(수정 전) 텍스트를, 개인 질문은 현재 텍스트를 순서 키로 쓴다.
// "base:"/"custom:" 접두사로 두 종류의 키가 우연히 같은 문장이어도 서로 겹치지 않게 한다.
// (개인 질문 텍스트를 수정하면 그 항목의 수동 순서는 초기화된다 — 별도 ID가 없어 생기는 한계.)
function buildQuestionEntries() {
  const visibleBaseOriginals = baseQuestions.filter((question) => !deletedBaseQuestions.includes(question));
  const baseEntries = visibleBaseOriginals.map((original) => ({
    key: `base:${original}`,
    text: baseQuestionEdits[original] || original,
    type: "base",
    topic: getBaseQuestionTopic(original)
  }));
  const customEntries = customQuestions.map((question) => ({
    key: `custom:${question}`,
    text: question,
    type: "custom",
    topic: getCustomQuestionTopic(question)
  }));
  const entries = [...baseEntries, ...customEntries];
  const known = new Set(entries.map((entry) => entry.key));
  const orderedKeys = questionOrder.filter((key) => known.has(key));
  const orderedEntries = orderedKeys.map((key) => entries.find((entry) => entry.key === key));
  const remainingEntries = entries.filter((entry) => !orderedKeys.includes(entry.key));
  return [...orderedEntries, ...remainingEntries];
}

function readStoredStringMap(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "{}");
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return {};
    return Object.fromEntries(
      Object.entries(saved)
        .map(([mapKey, value]) => [String(mapKey), String(value).trim()])
        .filter(([, value]) => value)
    );
  } catch {
    return {};
  }
}

// 주제 이름은 세 겹으로 정해진다.
// ① 질문 파일의 원래 주제(또는 '개인 질문') → ② 주제 이름 바꾸기(topicRenames) → ③ 질문마다 직접 고른 주제.
function resolveTopicName(rawTopic) {
  return topicRenames[rawTopic] || rawTopic;
}

function getBaseFileTopic(originalQuestion) {
  return resolveTopicName(baseQuestionTopics[originalQuestion] || DEFAULT_TOPIC);
}

function getBaseQuestionTopic(originalQuestion) {
  return baseQuestionTopicEdits[originalQuestion] || getBaseFileTopic(originalQuestion);
}

function getDefaultCustomTopic() {
  return resolveTopicName(CUSTOM_TOPIC);
}

function getCustomQuestionTopic(question) {
  return customQuestionTopics[question] || getDefaultCustomTopic();
}

// 질문 파일의 주제를 파일 순서대로 먼저, 직접 만든 주제를 그다음, '개인 질문'과 '주제 없음'을 맨 뒤에 둔다.
function getTopicNameOrder() {
  const defaultCustomTopic = getDefaultCustomTopic();
  const fileTopics = [...new Set(baseQuestions.map(getBaseFileTopic))];
  const usedTopics = [...new Set(orderedQuestionEntries.map((entry) => entry.topic))];
  const createdTopics = usedTopics.filter((topic) => !fileTopics.includes(topic) && topic !== defaultCustomTopic && topic !== NO_TOPIC);
  // 삭제한 주제는 (질문이 다시 들어가기 전까지) 목록에서 뺀다. '주제 없음'은 항상 남긴다.
  return [...new Set([...fileTopics, ...createdTopics, defaultCustomTopic, NO_TOPIC])]
    .filter((topic) => topic === NO_TOPIC || usedTopics.includes(topic) || !deletedTopics.includes(topic));
}

// 새 질문을 넣을 때 처음 골라져 있는 주제. '개인 질문' 주제를 지웠다면 '주제 없음'.
function getFormDefaultTopic() {
  const defaultCustomTopic = getDefaultCustomTopic();
  return deletedTopics.includes(defaultCustomTopic) ? NO_TOPIC : defaultCustomTopic;
}

// 지웠던 주제 이름에 질문을 다시 넣으면 그 주제는 되살아난다.
function reviveTopic(topic) {
  deletedTopics = deletedTopics.filter((deletedTopic) => deletedTopic !== topic);
}

function saveTopicSettings() {
  localStorage.setItem(CUSTOM_QUESTION_TOPICS_KEY, JSON.stringify(customQuestionTopics));
  localStorage.setItem(BASE_QUESTION_TOPIC_EDITS_KEY, JSON.stringify(baseQuestionTopicEdits));
  localStorage.setItem(TOPIC_RENAMES_KEY, JSON.stringify(topicRenames));
  localStorage.setItem(DELETED_TOPICS_KEY, JSON.stringify(deletedTopics));
}

// base: 기본 질문 원본 텍스트 목록, custom: 개인 질문 텍스트 목록
function moveQuestionsToTopic({ base = [], custom = [] }, targetTopic) {
  base.forEach((originalQuestion) => {
    if (targetTopic === getBaseFileTopic(originalQuestion)) {
      delete baseQuestionTopicEdits[originalQuestion];
    } else {
      baseQuestionTopicEdits[originalQuestion] = targetTopic;
    }
  });
  custom.forEach((question) => {
    customQuestionTopics[question] = targetTopic;
  });
  reviveTopic(targetTopic);
  saveTopicSettings();
}

// 주제 고르기 팝업을 띄우고, 고른 주제 이름(취소하면 null)을 돌려준다.
function askTargetTopic({ title, message, confirmText, excludeTopic = "", defaultTopic = "", danger = false }) {
  const topicOptions = getTopicNameOrder().filter((topic) => topic !== excludeTopic);
  return openConfirmDialog({
    title,
    message,
    confirmText,
    danger,
    topicOptions,
    defaultTopic: topicOptions.includes(defaultTopic) ? defaultTopic : NO_TOPIC
  });
}

async function deleteTopic(topic) {
  if (topic === NO_TOPIC) return;

  // 화면에 보이는 질문뿐 아니라 복원 목록(삭제한 질문)에 있는 질문도 함께 옮긴다.
  const baseInTopic = baseQuestions.filter((question) => getBaseQuestionTopic(question) === topic);
  const customInTopic = [...customQuestions, ...deletedCustomQuestions]
    .filter((question) => getCustomQuestionTopic(question) === topic);
  const visibleCount = orderedQuestionEntries.filter((entry) => entry.topic === topic).length;

  const targetTopic = await askTargetTopic({
    title: `'${topic}' 주제를 삭제할까요?`,
    message: `안에 있던 질문 ${visibleCount}개는 아래에서 고른 주제로 옮겨져요. 질문은 지워지지 않아요.`,
    confirmText: "삭제",
    excludeTopic: topic,
    danger: true
  });
  if (!targetTopic) return;

  moveQuestionsToTopic({ base: baseInTopic, custom: customInTopic }, targetTopic);
  if (!deletedTopics.includes(topic)) deletedTopics.push(topic);
  disabledTopics = disabledTopics.filter((disabledTopic) => disabledTopic !== topic);
  expandedTopicNames.delete(topic);
  saveTopicSettings();
  applyTopicFilterChange();
}

async function moveSelectedQuestionsTopic() {
  const selectedQuestions = getSelectedActiveQuestionKeys();
  const selectedCount = selectedQuestions.base.length + selectedQuestions.custom.length;
  if (selectedCount === 0) {
    resetCustomQuestionForm("주제를 바꿀 질문을 먼저 선택해 주세요.");
    document.querySelector("#customQuestionStatus")?.classList.add("is-error");
    return;
  }

  // 고른 질문들이 모두 같은 주제면 그 주제를 미리 골라 둔다.
  const selectedTopics = new Set([
    ...selectedQuestions.base.map(getBaseQuestionTopic),
    ...selectedQuestions.custom.map(getCustomQuestionTopic)
  ]);
  const targetTopic = await askTargetTopic({
    title: "선택한 질문의 주제를 바꿀까요?",
    message: `선택한 질문 ${selectedCount}개를 아래에서 고른 주제로 옮겨요.`,
    confirmText: "바꾸기",
    defaultTopic: selectedTopics.size === 1 ? [...selectedTopics][0] : ""
  });
  if (!targetTopic) return;

  moveQuestionsToTopic(selectedQuestions, targetTopic);
  syncQuestions();
  let message = `질문 ${selectedCount}개의 주제를 '${targetTopic}'(으)로 바꿨어요.`;
  if (disabledTopics.includes(targetTopic)) {
    message += ` '${targetTopic}' 주제는 지금 꺼져 있어서 무작위로 나오지 않아요.`;
  }
  resetCustomQuestionForm(message);
  renderQuestionOrderList();
  renderCustomQuestionList();
}

function saveCustomQuestions() {
  localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(customQuestions));
  localStorage.setItem(DELETED_CUSTOM_QUESTIONS_KEY, JSON.stringify(deletedCustomQuestions));
}

function saveBaseQuestionPersonalizations() {
  localStorage.setItem(BASE_QUESTION_EDITS_KEY, JSON.stringify(baseQuestionEdits));
  localStorage.setItem(DELETED_BASE_QUESTIONS_KEY, JSON.stringify(deletedBaseQuestions));
}

function syncQuestions() {
  orderedQuestionEntries = buildQuestionEntries();
  questions = orderedQuestionEntries.map((entry) => entry.text);
  if (questions.length === 0) {
    const customQuestionToRestore = deletedCustomQuestions.shift();
    const questionToRestore = customQuestionToRestore || deletedBaseQuestions.pop();
    if (questionToRestore) {
      if (customQuestionToRestore) {
        customQuestions.unshift(customQuestionToRestore);
        saveCustomQuestions();
      } else {
        saveBaseQuestionPersonalizations();
      }
      orderedQuestionEntries = buildQuestionEntries();
      questions = orderedQuestionEntries.map((entry) => entry.text);
    }
  }
  enabledQuestions = orderedQuestionEntries.filter(isEntryEnabled).map((entry) => entry.text);
  if (reservedQuestion && !enabledQuestions.includes(reservedQuestion)) {
    reservedQuestion = "";
    reservedQuestionState.textContent = "예약 없음";
  }
  renderQuestionPicker();
}

// 주제가 켜져 있고, 그 질문도 따로 꺼지지 않았을 때만 무작위 후보가 된다.
// 주제 끄기와 질문 끄기는 따로 저장되므로, 주제를 다시 켜도 개별로 꺼둔 질문은 꺼진 채 남는다.
function isEntryEnabled(entry) {
  return !disabledTopics.includes(entry.topic) && !disabledQuestionKeys.includes(entry.key);
}

function saveTopicFilter() {
  localStorage.setItem(DISABLED_TOPICS_KEY, JSON.stringify(disabledTopics));
  localStorage.setItem(DISABLED_QUESTIONS_KEY, JSON.stringify(disabledQuestionKeys));
}

function getTopicGroups() {
  const groups = new Map();
  orderedQuestionEntries.forEach((entry) => {
    if (!groups.has(entry.topic)) groups.set(entry.topic, []);
    groups.get(entry.topic).push(entry);
  });
  return getTopicNameOrder()
    .filter((topic) => groups.has(topic))
    .map((topic) => ({ topic, entries: groups.get(topic) }));
}

function openTopicFilterModal() {
  stopImprovementAutoRefresh();
  renamingTopic = "";
  modalTitle.textContent = "주제 선택";
  modalBody.innerHTML = `
    <p class="topic-filter-help">켜진 주제의 켜진 질문에서만 무작위로 나와요.</p>
    <div class="topic-filter-toolbar">
      <button class="mini-btn" type="button" data-enable-all-topics>모두 켜기</button>
      <button class="mini-btn" type="button" data-disable-all-topics>모두 끄기</button>
      <span id="topicFilterCount" class="chip"></span>
    </div>
    <div id="topicFilterList" class="topic-filter-list"></div>
  `;
  infoModal.hidden = false;
  closeModalBtn.focus();
  renderTopicFilterList();
}

function renderTopicFilterList() {
  const list = document.querySelector("#topicFilterList");
  const count = document.querySelector("#topicFilterCount");
  if (!list) return;

  if (count) {
    count.textContent = `켜진 질문 ${enabledQuestions.length} / ${orderedQuestionEntries.length}`;
  }

  list.innerHTML = getTopicGroups()
    .map(({ topic, entries }) => {
      const isTopicOn = !disabledTopics.includes(topic);
      const isOpen = expandedTopicNames.has(topic);
      const onCount = entries.filter((entry) => !disabledQuestionKeys.includes(entry.key)).length;
      const headerHtml = renamingTopic === topic
        ? `
          <form class="topic-rename-form" data-topic-rename-form="${escapeHtml(topic)}">
            <input class="topic-rename-input" type="text" maxlength="40" value="${escapeHtml(topic)}" aria-label="새 주제 이름" required>
            <button class="mini-btn" type="submit">저장</button>
            <button class="mini-btn" type="button" data-cancel-topic-rename>취소</button>
          </form>
        `
        : `
          <label class="topic-filter-label">
            <input type="checkbox" data-topic-checkbox="${escapeHtml(topic)}" data-partial="${onCount > 0 && onCount < entries.length}" ${isTopicOn ? "checked" : ""}>
            <strong>${escapeHtml(topic)}</strong>
            <span class="topic-filter-count">${onCount}/${entries.length}</span>
          </label>
          <div class="topic-filter-actions">
            ${topic === NO_TOPIC ? "" : `
              <button class="mini-btn" type="button" data-rename-topic="${escapeHtml(topic)}">이름 바꾸기</button>
              <button class="delete-record-btn" type="button" data-delete-topic="${escapeHtml(topic)}">삭제</button>
            `}
            <button class="mini-btn" type="button" data-toggle-topic-questions="${escapeHtml(topic)}">${isOpen ? "질문 접기 ▴" : "질문 보기 ▾"}</button>
          </div>
        `;
      return `
        <section class="topic-filter-group${isTopicOn ? "" : " is-off"}">
          <div class="topic-filter-header">${headerHtml}</div>
          ${isOpen ? `
            <ul class="topic-question-list">
              ${entries.map((entry) => `
                <li>
                  <label class="topic-question-label">
                    <input type="checkbox" data-question-checkbox="${escapeHtml(entry.key)}" ${disabledQuestionKeys.includes(entry.key) ? "" : "checked"} ${isTopicOn ? "" : "disabled"}>
                    <span>${escapeHtml(entry.text)}</span>
                  </label>
                </li>
              `).join("")}
            </ul>
          ` : ""}
        </section>
      `;
    })
    .join("");

  // 주제는 켜져 있지만 그 안의 질문 일부만 꺼져 있으면 체크박스를 '반쯤 체크(−)'로 보여 준다.
  list.querySelectorAll("[data-topic-checkbox]").forEach((checkbox) => {
    checkbox.indeterminate = checkbox.checked && checkbox.dataset.partial === "true";
  });

  const renameInput = list.querySelector(".topic-rename-input");
  if (renameInput) {
    renameInput.focus();
    renameInput.select();
  }
}

function handleTopicRenameSubmit(event) {
  const form = event.target.closest("[data-topic-rename-form]");
  if (!form) return;

  event.preventDefault();
  const input = form.querySelector(".topic-rename-input");
  renameTopic(form.dataset.topicRenameForm, input ? input.value : "");
}

// 이미 있는 주제 이름으로 바꾸면 두 주제가 하나로 합쳐진다.
function renameTopic(oldName, newNameInput) {
  const newName = newNameInput.replace(/\s+/g, " ").trim();
  renamingTopic = "";
  if (!newName || newName === oldName) {
    renderTopicFilterList();
    return;
  }

  const rawTopics = new Set([
    ...Object.values(baseQuestionTopics),
    ...Object.keys(topicRenames),
    DEFAULT_TOPIC,
    CUSTOM_TOPIC
  ]);
  rawTopics.forEach((rawTopic) => {
    if (resolveTopicName(rawTopic) !== oldName) return;
    if (rawTopic === newName) {
      delete topicRenames[rawTopic];
    } else {
      topicRenames[rawTopic] = newName;
    }
  });
  [customQuestionTopics, baseQuestionTopicEdits].forEach((topicMap) => {
    Object.keys(topicMap).forEach((key) => {
      if (topicMap[key] === oldName) topicMap[key] = newName;
    });
  });

  const wasDisabled = disabledTopics.includes(oldName);
  disabledTopics = disabledTopics.filter((topic) => topic !== oldName);
  if (wasDisabled && !disabledTopics.includes(newName)) disabledTopics.push(newName);
  if (expandedTopicNames.delete(oldName)) expandedTopicNames.add(newName);
  reviveTopic(newName);

  saveTopicSettings();
  applyTopicFilterChange();
}

function handleTopicFilterChange(event) {
  const topicCheckbox = event.target.closest("[data-topic-checkbox]");
  if (topicCheckbox) {
    const topic = topicCheckbox.dataset.topicCheckbox;
    disabledTopics = topicCheckbox.checked
      ? disabledTopics.filter((item) => item !== topic)
      : [...disabledTopics, topic];
    applyTopicFilterChange();
    return;
  }

  const questionCheckbox = event.target.closest("[data-question-checkbox]");
  if (questionCheckbox) {
    const key = questionCheckbox.dataset.questionCheckbox;
    disabledQuestionKeys = questionCheckbox.checked
      ? disabledQuestionKeys.filter((item) => item !== key)
      : [...disabledQuestionKeys, key];
    applyTopicFilterChange();
  }
}

function setAllTopicsEnabled(isEnabled) {
  disabledTopics = isEnabled ? [] : getTopicGroups().map((group) => group.topic);
  if (isEnabled) disabledQuestionKeys = [];
  applyTopicFilterChange();
}

function applyTopicFilterChange() {
  saveTopicFilter();
  syncQuestions();
  renderTopicFilterList();
}

function moveQuestionToFront(key) {
  const order = orderedQuestionEntries.map((entry) => entry.key);
  const index = order.indexOf(key);
  if (index <= 0) return;
  order.splice(index, 1);
  order.unshift(key);
  questionOrder = order;
  saveQuestionOrder();
  syncQuestions();
  renderQuestionOrderList();
}

function moveQuestionStep(key, direction) {
  const order = orderedQuestionEntries.map((entry) => entry.key);
  const index = order.indexOf(key);
  const targetIndex = index + direction;
  if (index < 0 || targetIndex < 0 || targetIndex >= order.length) return;
  [order[index], order[targetIndex]] = [order[targetIndex], order[index]];
  questionOrder = order;
  saveQuestionOrder();
  syncQuestions();
  renderQuestionOrderList();
}

function getVisibleBaseQuestions() {
  return baseQuestions
    .filter((question) => !deletedBaseQuestions.includes(question))
    .map((question) => baseQuestionEdits[question] || question);
}

function renderQuestionPicker() {
  questionPicker.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = "연습할 질문을 선택하세요";
  placeholderOption.hidden = true;
  questionPicker.append(placeholderOption);

  enabledQuestions.forEach((question, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `${index + 1}. ${question}`;
    questionPicker.append(option);
  });

  const reservedIndex = enabledQuestions.indexOf(reservedQuestion);
  questionPicker.value = reservedIndex >= 0 ? String(reservedIndex) : "";
  updateQuestionPickerPlaceholder();
}

function reserveSelectedQuestion() {
  if (questionPicker.value === "") return;

  const selectedQuestion = enabledQuestions[Number(questionPicker.value)];
  if (!selectedQuestion) return;

  reservedQuestion = selectedQuestion;
  reservedQuestionState.textContent = "예약됨";
  updateQuestionPickerPlaceholder();
}

function clearReservedQuestion() {
  reservedQuestion = "";
  reservedQuestionState.textContent = "예약 없음";
  questionPicker.value = "";
  updateQuestionPickerPlaceholder();
}

function updateQuestionPickerPlaceholder() {
  questionPicker.classList.toggle("is-placeholder", questionPicker.value === "");
}

function openCustomQuestionModal() {
  stopImprovementAutoRefresh();
  isBaseRestoreListOpen = false;
  isQuestionOrderListOpen = false;
  expandedOrderQuestionKeys = new Set();
  modalTitle.textContent = "질문 관리";
  modalBody.innerHTML = `
    <form id="customQuestionForm" class="custom-question-form">
      <input id="customQuestionEditType" type="hidden">
      <input id="customQuestionEditIndex" type="hidden">
      <input id="customQuestionEditKey" type="hidden">
      <label class="custom-question-label" for="customQuestionInput">질문 입력</label>
      <textarea id="customQuestionInput" class="custom-question-input" rows="4" maxlength="400" placeholder="연습하고 싶은 질문을 입력하세요." required></textarea>
      <div class="custom-question-topic-row">
        <label class="custom-question-label" for="customQuestionTopic">주제</label>
        <select id="customQuestionTopic" class="question-picker custom-question-topic-select"></select>
        <input id="customQuestionNewTopic" class="topic-rename-input" type="text" maxlength="40" placeholder="새 주제 이름을 입력하세요" aria-label="새 주제 이름" hidden>
      </div>
      <div class="custom-question-form-actions">
        <p id="customQuestionStatus" class="custom-question-status" aria-live="polite"></p>
        <div class="custom-question-buttons">
          <button id="cancelCustomQuestionEditBtn" class="mini-btn" type="button" hidden>수정 취소</button>
          <button id="saveCustomQuestionBtn" class="primary-btn compact-btn" type="submit">추가</button>
        </div>
      </div>
    </form>
    <section class="custom-question-section">
      <div class="custom-question-section-header">
        <h3>질문 순서</h3>
        <button id="toggleQuestionOrderBtn" class="mini-btn custom-question-restore-btn" type="button" data-toggle-question-order>질문 순서 보기</button>
      </div>
      <div id="questionOrderList" class="custom-question-list"></div>
    </section>
    <div id="customQuestionList" class="custom-question-list"></div>
  `;
  infoModal.hidden = false;
  closeModalBtn.focus();
  setupCustomQuestionForm();
  renderQuestionOrderList();
  renderCustomQuestionList();
}

function setupCustomQuestionForm() {
  const form = document.querySelector("#customQuestionForm");
  const cancelEditBtn = document.querySelector("#cancelCustomQuestionEditBtn");
  if (!form || !cancelEditBtn) return;

  form.addEventListener("submit", saveCustomQuestion);
  cancelEditBtn.addEventListener("click", () => resetCustomQuestionForm());
  document.querySelector("#customQuestionTopic")?.addEventListener("change", updateNewTopicInputVisibility);
  renderCustomQuestionTopicOptions(getFormDefaultTopic());
}

function renderCustomQuestionTopicOptions(selectedTopic) {
  const select = document.querySelector("#customQuestionTopic");
  if (!select) return;

  const topics = getTopicNameOrder();
  if (selectedTopic && !topics.includes(selectedTopic)) topics.push(selectedTopic);
  select.innerHTML = `
    ${topics.map((topic) => `<option value="${escapeHtml(topic)}">${escapeHtml(topic)}</option>`).join("")}
    <option value="${NEW_TOPIC_VALUE}">＋ 새 주제 만들기</option>
  `;
  select.value = selectedTopic || getFormDefaultTopic();
  updateNewTopicInputVisibility();
}

function updateNewTopicInputVisibility() {
  const select = document.querySelector("#customQuestionTopic");
  const newTopicInput = document.querySelector("#customQuestionNewTopic");
  if (!select || !newTopicInput) return;

  const isNewTopic = select.value === NEW_TOPIC_VALUE;
  newTopicInput.hidden = !isNewTopic;
  if (isNewTopic) {
    newTopicInput.focus();
  } else {
    newTopicInput.value = "";
  }
}

// 고른 주제 이름을 돌려준다. '새 주제 만들기'인데 이름이 비어 있으면 빈 문자열.
function getSelectedFormTopic() {
  const select = document.querySelector("#customQuestionTopic");
  const newTopicInput = document.querySelector("#customQuestionNewTopic");
  if (!select) return getFormDefaultTopic();
  if (select.value !== NEW_TOPIC_VALUE) return select.value;
  return newTopicInput ? newTopicInput.value.replace(/\s+/g, " ").trim() : "";
}

function saveCustomQuestion(event) {
  event.preventDefault();

  const input = document.querySelector("#customQuestionInput");
  const editTypeInput = document.querySelector("#customQuestionEditType");
  const editIndexInput = document.querySelector("#customQuestionEditIndex");
  const editKeyInput = document.querySelector("#customQuestionEditKey");
  const status = document.querySelector("#customQuestionStatus");
  if (!input || !editTypeInput || !editIndexInput || !editKeyInput || !status) return;

  const question = input.value.replace(/\s+/g, " ").trim();
  const editType = editTypeInput.value;
  const editIndex = editIndexInput.value === "" ? -1 : Number(editIndexInput.value);
  const editKey = editKeyInput.value;
  if (!question) {
    status.textContent = "질문을 입력해 주세요.";
    status.classList.add("is-error");
    input.focus();
    return;
  }

  if (hasDuplicateQuestion(question, editType, editType === "base" ? editKey : editIndex)) {
    status.textContent = "이미 있는 질문입니다.";
    status.classList.add("is-error");
    input.focus();
    return;
  }

  const topic = getSelectedFormTopic();
  if (!topic) {
    status.textContent = "새 주제 이름을 입력해 주세요.";
    status.classList.add("is-error");
    document.querySelector("#customQuestionNewTopic")?.focus();
    return;
  }

  if (editType === "base" && baseQuestions.includes(editKey)) {
    const previousQuestion = baseQuestionEdits[editKey] || editKey;
    if (question === editKey) {
      delete baseQuestionEdits[editKey];
    } else {
      baseQuestionEdits[editKey] = question;
    }
    if (topic === getBaseFileTopic(editKey)) {
      delete baseQuestionTopicEdits[editKey];
    } else {
      baseQuestionTopicEdits[editKey] = topic;
    }
    if (reservedQuestion === previousQuestion) {
      reservedQuestion = question;
      reservedQuestionState.textContent = "예약됨";
    }
    saveBaseQuestionPersonalizations();
    status.textContent = "기본 질문을 수정했습니다.";
  } else if (editType === "custom" && editIndex >= 0 && customQuestions[editIndex]) {
    const previousQuestion = customQuestions[editIndex];
    customQuestions[editIndex] = question;
    delete customQuestionTopics[previousQuestion];
    customQuestionTopics[question] = topic;
    if (reservedQuestion === previousQuestion) {
      reservedQuestion = question;
      reservedQuestionState.textContent = "예약됨";
    }
    status.textContent = "질문을 수정했습니다.";
  } else {
    customQuestions.unshift(question);
    customQuestionTopics[question] = topic;
    status.textContent = "질문을 추가했습니다.";
  }

  reviveTopic(topic);
  if (disabledTopics.includes(topic)) {
    status.textContent += ` '${topic}' 주제는 지금 꺼져 있어서 무작위로 나오지 않아요.`;
  }

  status.classList.remove("is-error");
  saveTopicSettings();
  saveCustomQuestions();
  syncQuestions();
  // 같은 주제에 질문을 이어서 넣기 편하도록 방금 고른 주제를 그대로 둔다.
  resetCustomQuestionForm(status.textContent, topic);
  renderQuestionOrderList();
  renderCustomQuestionList();
}

function resetCustomQuestionForm(message = "", topic = getFormDefaultTopic()) {
  renderCustomQuestionTopicOptions(topic);
  const input = document.querySelector("#customQuestionInput");
  const editTypeInput = document.querySelector("#customQuestionEditType");
  const editIndexInput = document.querySelector("#customQuestionEditIndex");
  const editKeyInput = document.querySelector("#customQuestionEditKey");
  const status = document.querySelector("#customQuestionStatus");
  const saveBtn = document.querySelector("#saveCustomQuestionBtn");
  const cancelEditBtn = document.querySelector("#cancelCustomQuestionEditBtn");
  if (!input || !editTypeInput || !editIndexInput || !editKeyInput || !status || !saveBtn || !cancelEditBtn) return;

  input.value = "";
  editTypeInput.value = "";
  editIndexInput.value = "";
  editKeyInput.value = "";
  saveBtn.textContent = "추가";
  cancelEditBtn.hidden = true;
  status.textContent = message;
  status.classList.remove("is-error");
}

const QUESTION_ORDER_TRUNCATE_LENGTH = 40;

function renderQuestionOrderList() {
  const toggleBtn = document.querySelector("#toggleQuestionOrderBtn");
  if (toggleBtn) {
    toggleBtn.textContent = isQuestionOrderListOpen
      ? "질문 순서 닫기"
      : `질문 순서 보기 (${orderedQuestionEntries.length})`;
  }

  const container = document.querySelector("#questionOrderList");
  if (!container) return;

  if (!isQuestionOrderListOpen) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = orderedQuestionEntries.length
    ? orderedQuestionEntries
      .map((entry, index) => {
        const isExpanded = expandedOrderQuestionKeys.has(entry.key);
        const isLong = entry.text.length > QUESTION_ORDER_TRUNCATE_LENGTH;
        const displayText = isExpanded || !isLong
          ? entry.text
          : `${entry.text.slice(0, QUESTION_ORDER_TRUNCATE_LENGTH)}…`;
        return `
        <article class="custom-question-item">
          <div class="custom-question-item-header">
            <span class="custom-question-badge">${index + 1}번</span>
            <span class="custom-question-badge${entry.type === "custom" ? " is-custom" : ""}">${entry.type === "custom" ? "개인" : "기본"}</span>
          </div>
          <p>${escapeHtml(displayText)}${isLong ? ` <button class="mini-btn" type="button" data-toggle-question-order-text="${escapeHtml(entry.key)}">${isExpanded ? "접기" : "전체"}</button>` : ""}</p>
          <div class="custom-question-item-actions">
            <button class="mini-btn" type="button" data-move-question-top="${escapeHtml(entry.key)}" ${index === 0 ? "disabled" : ""}>맨 앞으로</button>
            <button class="mini-btn" type="button" data-move-question-up="${escapeHtml(entry.key)}" ${index === 0 ? "disabled" : ""}>▲ 위로</button>
            <button class="mini-btn" type="button" data-move-question-down="${escapeHtml(entry.key)}" ${index === orderedQuestionEntries.length - 1 ? "disabled" : ""}>▼ 아래로</button>
          </div>
        </article>
      `;
      })
      .join("")
    : `<p class="custom-question-empty">질문이 없습니다.</p>`;
}

function renderTopicBadge(topic) {
  return `<span class="custom-question-badge ${topic === NO_TOPIC ? "is-no-topic" : "is-topic"}">${escapeHtml(topic)}</span>`;
}

function renderCustomQuestionList() {
  const list = document.querySelector("#customQuestionList");
  if (!list) return;

  const visibleBaseQuestionItems = baseQuestions
    .map((question) => ({
      originalQuestion: question,
      question: baseQuestionEdits[question] || question,
      isDeleted: deletedBaseQuestions.includes(question),
      isEdited: Boolean(baseQuestionEdits[question])
    }))
    .filter((item) => !item.isDeleted);
  const deletedBaseQuestionItems = deletedBaseQuestions
    .filter((question) => baseQuestions.includes(question))
    .map((question) => ({
      originalQuestion: question,
      question: baseQuestionEdits[question] || question,
      type: "base"
    }));
  const deletedCustomQuestionItems = deletedCustomQuestions
    .map((question, index) => ({
      index,
      question,
      type: "custom"
    }));
  const deletedQuestionItems = [...deletedCustomQuestionItems, ...deletedBaseQuestionItems];
  const baseQuestionsHtml = visibleBaseQuestionItems.length
    ? visibleBaseQuestionItems
      .map((item) => `
        <article class="custom-question-item is-selectable">
          <label class="question-select">
            <input class="question-select-input" type="checkbox" data-active-select-base="${escapeHtml(item.originalQuestion)}">
            <span class="question-select-box" aria-hidden="true"></span>
            <span class="sr-only">기본 질문 선택</span>
          </label>
          <div class="custom-question-item-header">
            <span class="custom-question-badge">기본</span>
            ${renderTopicBadge(getBaseQuestionTopic(item.originalQuestion))}
            ${item.isEdited ? `<span class="custom-question-badge is-edited">수정됨</span>` : ""}
          </div>
          <p>${escapeHtml(item.question)}</p>
          <div class="custom-question-item-actions">
            <button class="mini-btn" type="button" data-edit-base-question="${escapeHtml(item.originalQuestion)}">수정</button>
            <button class="delete-record-btn" type="button" data-delete-base-question="${escapeHtml(item.originalQuestion)}">삭제</button>
          </div>
        </article>
      `)
      .join("")
    : `<p class="custom-question-empty">표시 중인 기본 질문이 없습니다.</p>`;
  const deletedQuestionsHtml = deletedQuestionItems.length
    ? deletedQuestionItems
      .map((item) => `
        <article class="custom-question-item is-deleted">
          <label class="restore-select">
            <input class="restore-select-input" type="checkbox" ${item.type === "custom" ? `data-restore-select-custom="${item.index}"` : `data-restore-select-base="${escapeHtml(item.originalQuestion)}"`}>
            <span class="restore-select-box" aria-hidden="true"></span>
            <span class="sr-only">복원 목록에서 선택</span>
          </label>
          <div class="custom-question-item-header">
            <span class="custom-question-badge${item.type === "custom" ? " is-custom" : ""}">${item.type === "custom" ? "개인" : "기본"}</span>
            <span class="custom-question-badge is-deleted">삭제됨</span>
          </div>
          <p>${escapeHtml(item.question)}</p>
          <div class="custom-question-item-actions">
            <button class="mini-btn" type="button" ${item.type === "custom" ? `data-restore-custom-question="${item.index}"` : `data-restore-base-question="${escapeHtml(item.originalQuestion)}"`}>복원</button>
            <button class="delete-record-btn" type="button" ${item.type === "custom" ? `data-delete-deleted-custom-question="${item.index}"` : `data-delete-deleted-base-question="${escapeHtml(item.originalQuestion)}"`}>완전 삭제</button>
          </div>
        </article>
      `)
      .join("")
    : `<p class="custom-question-empty">삭제한 질문이 없습니다.</p>`;
  const customQuestionsHtml = customQuestions.length
    ? customQuestions
      .map((question, index) => `
      <article class="custom-question-item is-selectable">
        <label class="question-select">
          <input class="question-select-input" type="checkbox" data-active-select-custom="${index}">
          <span class="question-select-box" aria-hidden="true"></span>
          <span class="sr-only">개인 질문 선택</span>
        </label>
        <div class="custom-question-item-header">
          <span class="custom-question-badge is-custom">개인</span>
          ${renderTopicBadge(getCustomQuestionTopic(question))}
        </div>
        <p>${escapeHtml(question)}</p>
        <div class="custom-question-item-actions">
          <button class="mini-btn" type="button" data-edit-custom-question="${index}">수정</button>
          <button class="delete-record-btn" type="button" data-delete-custom-question="${index}">삭제</button>
        </div>
      </article>
    `)
      .join("")
    : `<p class="custom-question-empty">아직 직접 추가한 질문이 없습니다.</p>`;
  const restoreButtonHtml = deletedQuestionItems.length > 0
    ? `<button class="mini-btn custom-question-restore-btn" type="button" data-toggle-base-restore-list>${isBaseRestoreListOpen ? "복원 목록 닫기" : `삭제한 질문 복원 (${deletedQuestionItems.length})`}</button>`
    : "";
  const deletedBaseQuestionsSectionHtml = isBaseRestoreListOpen
    ? `
      <section class="custom-question-section">
        <div class="custom-question-section-header">
          <h3>복원할 질문</h3>
          <div class="custom-question-bulk-actions">
            <button class="mini-btn" type="button" data-restore-selected-questions>선택 복원</button>
            <button class="delete-record-btn" type="button" data-delete-selected-questions>선택 삭제</button>
          </div>
        </div>
        ${deletedQuestionsHtml}
      </section>
    `
    : "";

  list.innerHTML = `
    ${deletedBaseQuestionsSectionHtml}
    <section class="custom-question-section">
      <div class="custom-question-section-header">
        <h3>개인 질문</h3>
        ${customQuestions.length ? `<div class="custom-question-bulk-actions"><button class="mini-btn" type="button" data-move-selected-topic>선택 주제 바꾸기</button><button class="delete-record-btn" type="button" data-delete-selected-active-questions>선택 삭제</button></div>` : ""}
      </div>
      ${customQuestionsHtml}
    </section>
    <section class="custom-question-section">
      <div class="custom-question-section-header">
        <h3>기본 질문</h3>
        <div class="custom-question-bulk-actions">
          ${visibleBaseQuestionItems.length ? `<button class="mini-btn" type="button" data-move-selected-topic>선택 주제 바꾸기</button><button class="delete-record-btn" type="button" data-delete-selected-active-questions>선택 삭제</button>` : ""}
          ${restoreButtonHtml}
        </div>
      </div>
      ${baseQuestionsHtml}
    </section>
  `;
}

function hasDuplicateQuestion(question, currentType = "", currentKey = "") {
  const duplicateBaseQuestion = baseQuestions.some((baseQuestion) => {
    if (deletedBaseQuestions.includes(baseQuestion)) return false;
    if (currentType === "base" && baseQuestion === currentKey) return false;
    return (baseQuestionEdits[baseQuestion] || baseQuestion) === question;
  });
  const duplicateCustomQuestion = customQuestions.some((customQuestion, index) => {
    if (currentType === "custom" && index === currentKey) return false;
    return customQuestion === question;
  });

  return duplicateBaseQuestion || duplicateCustomQuestion;
}

function editQuestion(type, key) {
  const question = type === "base" ? baseQuestionEdits[key] || key : customQuestions[key];
  const input = document.querySelector("#customQuestionInput");
  const editTypeInput = document.querySelector("#customQuestionEditType");
  const editIndexInput = document.querySelector("#customQuestionEditIndex");
  const editKeyInput = document.querySelector("#customQuestionEditKey");
  const status = document.querySelector("#customQuestionStatus");
  const saveBtn = document.querySelector("#saveCustomQuestionBtn");
  const cancelEditBtn = document.querySelector("#cancelCustomQuestionEditBtn");
  if (!question || !input || !editTypeInput || !editIndexInput || !editKeyInput || !status || !saveBtn || !cancelEditBtn) return;

  input.value = question;
  renderCustomQuestionTopicOptions(type === "base" ? getBaseQuestionTopic(key) : getCustomQuestionTopic(question));
  editTypeInput.value = type;
  editIndexInput.value = type === "custom" ? String(key) : "";
  editKeyInput.value = type === "base" ? key : "";
  saveBtn.textContent = "수정 저장";
  cancelEditBtn.hidden = false;
  status.textContent = "수정할 내용을 입력한 뒤 저장하세요.";
  status.classList.remove("is-error");
  input.focus();
}

async function deleteQuestion(type, key) {
  const question = type === "base" ? baseQuestionEdits[key] || key : customQuestions[key];
  if (!question) return;
  if (getVisibleQuestionCount() <= 1) {
    resetCustomQuestionForm("질문은 최소 1개 이상 남아 있어야 합니다.");
    const status = document.querySelector("#customQuestionStatus");
    status?.classList.add("is-error");
    return;
  }

  const confirmed = await openConfirmDialog({
    title: "질문을 삭제할까요?",
    message: `"${question}" 질문이 내 질문 목록에서 사라집니다.`,
    confirmText: "삭제",
    danger: true
  });
  if (!confirmed) return;

  if (type === "base") {
    if (!deletedBaseQuestions.includes(key)) {
      deletedBaseQuestions.push(key);
    }
    delete baseQuestionEdits[key];
    saveBaseQuestionPersonalizations();
  } else {
    const deletedQuestion = customQuestions.splice(key, 1)[0];
    if (deletedQuestion && !deletedCustomQuestions.includes(deletedQuestion)) {
      deletedCustomQuestions.unshift(deletedQuestion);
    }
    saveCustomQuestions();
  }

  if (reservedQuestion === question) {
    reservedQuestion = "";
    reservedQuestionState.textContent = "예약 없음";
  }
  syncQuestions();
  resetCustomQuestionForm("질문을 삭제했습니다.");
  renderQuestionOrderList();
  renderCustomQuestionList();
}

function getVisibleQuestionCount() {
  return getVisibleBaseQuestions().length + customQuestions.length;
}

function getSelectedActiveQuestionKeys() {
  const selectedBaseQuestions = [...document.querySelectorAll("[data-active-select-base]:checked")]
    .map((input) => input.dataset.activeSelectBase)
    .filter(Boolean);
  const selectedCustomQuestions = [...document.querySelectorAll("[data-active-select-custom]:checked")]
    .map((input) => customQuestions[Number(input.dataset.activeSelectCustom)])
    .filter(Boolean);

  return {
    base: [...new Set(selectedBaseQuestions)],
    custom: [...new Set(selectedCustomQuestions)]
  };
}

async function deleteSelectedActiveQuestions() {
  const selectedQuestions = getSelectedActiveQuestionKeys();
  const selectedCount = selectedQuestions.base.length + selectedQuestions.custom.length;
  if (selectedCount === 0) {
    resetCustomQuestionForm("삭제할 질문을 선택해 주세요.");
    const status = document.querySelector("#customQuestionStatus");
    status?.classList.add("is-error");
    return;
  }

  if (getVisibleQuestionCount() - selectedCount < 1) {
    resetCustomQuestionForm("질문은 최소 1개 이상 남아 있어야 합니다.");
    const status = document.querySelector("#customQuestionStatus");
    status?.classList.add("is-error");
    return;
  }

  const confirmed = await openConfirmDialog({
    title: "선택한 질문을 삭제할까요?",
    message: `${selectedCount}개 질문이 내 질문 목록에서 사라지고 복원 목록으로 이동합니다.`,
    confirmText: "삭제",
    cancelText: "취소",
    danger: true
  });
  if (!confirmed) return;

  const selectedVisibleQuestions = [
    ...selectedQuestions.base.map((question) => baseQuestionEdits[question] || question),
    ...selectedQuestions.custom
  ];

  selectedQuestions.base.forEach((question) => {
    if (!deletedBaseQuestions.includes(question)) {
      deletedBaseQuestions.push(question);
    }
    delete baseQuestionEdits[question];
  });

  selectedQuestions.custom.forEach((question) => {
    if (!deletedCustomQuestions.includes(question)) {
      deletedCustomQuestions.unshift(question);
    }
  });
  customQuestions = customQuestions.filter((question) => !selectedQuestions.custom.includes(question));

  if (selectedVisibleQuestions.includes(reservedQuestion)) {
    reservedQuestion = "";
    reservedQuestionState.textContent = "예약 없음";
  }

  saveBaseQuestionPersonalizations();
  saveCustomQuestions();
  syncQuestions();
  resetCustomQuestionForm(`${selectedCount}개 질문을 삭제했습니다.`);
  renderQuestionOrderList();
  renderCustomQuestionList();
}

function restoreBaseQuestion(question) {
  deletedBaseQuestions = deletedBaseQuestions.filter((deletedQuestion) => deletedQuestion !== question);
  if (deletedBaseQuestions.length === 0 && deletedCustomQuestions.length === 0) {
    isBaseRestoreListOpen = false;
  }
  saveBaseQuestionPersonalizations();
  syncQuestions();
  resetCustomQuestionForm("기본 질문을 복원했습니다.");
  renderQuestionOrderList();
  renderCustomQuestionList();
}

function restoreCustomQuestion(index) {
  const question = deletedCustomQuestions[index];
  if (!question) return;

  deletedCustomQuestions.splice(index, 1);
  if (!hasDuplicateQuestion(question)) {
    customQuestions.unshift(question);
  }
  if (deletedBaseQuestions.length === 0 && deletedCustomQuestions.length === 0) {
    isBaseRestoreListOpen = false;
  }
  saveCustomQuestions();
  syncQuestions();
  resetCustomQuestionForm("개인 질문을 복원했습니다.");
  renderQuestionOrderList();
  renderCustomQuestionList();
}

function getSelectedDeletedQuestionKeys() {
  const selectedBaseQuestions = [...document.querySelectorAll("[data-restore-select-base]:checked")]
    .map((input) => input.dataset.restoreSelectBase)
    .filter(Boolean);
  const selectedCustomQuestions = [...document.querySelectorAll("[data-restore-select-custom]:checked")]
    .map((input) => deletedCustomQuestions[Number(input.dataset.restoreSelectCustom)])
    .filter(Boolean);

  return {
    base: [...new Set(selectedBaseQuestions)],
    custom: [...new Set(selectedCustomQuestions)]
  };
}

function restoreDeletedQuestions(baseQuestionsToRestore, customQuestionsToRestore) {
  deletedBaseQuestions = deletedBaseQuestions.filter((question) => !baseQuestionsToRestore.includes(question));
  deletedCustomQuestions = deletedCustomQuestions.filter((question) => !customQuestionsToRestore.includes(question));

  customQuestionsToRestore
    .filter((question) => !hasDuplicateQuestion(question))
    .reverse()
    .forEach((question) => customQuestions.unshift(question));

  if (deletedBaseQuestions.length === 0 && deletedCustomQuestions.length === 0) {
    isBaseRestoreListOpen = false;
  }

  saveBaseQuestionPersonalizations();
  saveCustomQuestions();
  syncQuestions();
}

function restoreSelectedDeletedQuestions() {
  const selectedQuestions = getSelectedDeletedQuestionKeys();
  const selectedCount = selectedQuestions.base.length + selectedQuestions.custom.length;
  if (selectedCount === 0) {
    resetCustomQuestionForm("복원할 질문을 선택해 주세요.");
    const status = document.querySelector("#customQuestionStatus");
    status?.classList.add("is-error");
    return;
  }

  restoreDeletedQuestions(selectedQuestions.base, selectedQuestions.custom);
  resetCustomQuestionForm(`${selectedCount}개 질문을 복원했습니다.`);
  renderQuestionOrderList();
  renderCustomQuestionList();
}

async function permanentlyDeleteDeletedQuestion(type, key) {
  const confirmed = await openConfirmDialog({
    title: "복원 목록에서 삭제할까요?",
    message: "삭제하면 이 질문은 복원 목록에서도 사라집니다.",
    confirmText: "삭제",
    cancelText: "취소",
    danger: true
  });
  if (!confirmed) return;

  if (type === "base") {
    deletedBaseQuestions = deletedBaseQuestions.filter((question) => question !== key);
    saveBaseQuestionPersonalizations();
  } else {
    deletedCustomQuestions.splice(key, 1);
    saveCustomQuestions();
  }

  if (deletedBaseQuestions.length === 0 && deletedCustomQuestions.length === 0) {
    isBaseRestoreListOpen = false;
  }
  resetCustomQuestionForm("복원 목록에서 삭제했습니다.");
  renderCustomQuestionList();
}

async function permanentlyDeleteSelectedDeletedQuestions() {
  const selectedQuestions = getSelectedDeletedQuestionKeys();
  const selectedCount = selectedQuestions.base.length + selectedQuestions.custom.length;
  if (selectedCount === 0) {
    resetCustomQuestionForm("삭제할 질문을 선택해 주세요.");
    const status = document.querySelector("#customQuestionStatus");
    status?.classList.add("is-error");
    return;
  }

  const confirmed = await openConfirmDialog({
    title: "선택한 질문을 삭제할까요?",
    message: `${selectedCount}개 질문이 복원 목록에서도 사라집니다.`,
    confirmText: "삭제",
    cancelText: "취소",
    danger: true
  });
  if (!confirmed) return;

  deletedBaseQuestions = deletedBaseQuestions.filter((question) => !selectedQuestions.base.includes(question));
  deletedCustomQuestions = deletedCustomQuestions.filter((question) => !selectedQuestions.custom.includes(question));
  if (deletedBaseQuestions.length === 0 && deletedCustomQuestions.length === 0) {
    isBaseRestoreListOpen = false;
  }
  saveBaseQuestionPersonalizations();
  saveCustomQuestions();
  resetCustomQuestionForm(`${selectedCount}개 질문을 복원 목록에서 삭제했습니다.`);
  renderCustomQuestionList();
}

function openInfoModal(title, content) {
  modalTitle.textContent = title;
  modalBody.innerHTML = content || "표시할 내용이 없습니다.";
  infoModal.hidden = false;
  closeModalBtn.focus();
}

function openImprovementsModal() {
  modalTitle.textContent = "개선사항";
  modalBody.innerHTML = `
    <form id="improvementForm" class="improvement-form">
      <input id="improvementEditId" type="hidden">
      <label class="improvement-label" for="improvementInput">개선사항 입력</label>
      <textarea id="improvementInput" class="improvement-input" rows="4" maxlength="500" placeholder="불편한 점이나 개선 아이디어를 적어 주세요." required></textarea>
      <div class="improvement-form-actions">
        <p id="improvementStatus" class="improvement-status" aria-live="polite"></p>
        <div class="improvement-buttons">
          <button id="cancelImprovementEditBtn" class="mini-btn" type="button" hidden>수정 취소</button>
          <button id="saveImprovementBtn" class="primary-btn compact-btn" type="submit">등록</button>
        </div>
      </div>
    </form>
    <div id="improvementList" class="improvement-list">개선사항을 불러오는 중입니다.</div>
  `;
  infoModal.hidden = false;
  closeModalBtn.focus();
  setupImprovementForm();
  loadImprovements();
  startImprovementAutoRefresh();
}

function setupImprovementForm() {
  const form = document.querySelector("#improvementForm");
  const cancelEditBtn = document.querySelector("#cancelImprovementEditBtn");
  if (!form || !cancelEditBtn) return;

  form.addEventListener("submit", saveImprovement);
  cancelEditBtn.addEventListener("click", resetImprovementForm);
}

async function loadImprovements() {
  const list = document.querySelector("#improvementList");
  if (!list) return;

  if (!improvementStore) {
    showLocalImprovements("공유 저장소를 불러오지 못해 이 브라우저에만 임시 저장합니다.");
    return;
  }

  const { data, error } = await improvementStore
    .from("improvement_items")
    .select("id, content, author_id, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("Failed to load improvements from Supabase", error);
    showLocalImprovements("공유 저장소에 연결하지 못해 이 브라우저에만 임시 저장합니다. Supabase 프로젝트 상태를 확인해 주세요.");
    return;
  }

  improvementStorageMode = "remote";
  renderImprovementList(data || []);
}

function startImprovementAutoRefresh() {
  stopImprovementAutoRefresh();

  improvementRefreshTimerId = window.setInterval(() => {
    if (!infoModal.hidden && document.querySelector("#improvementList")) {
      loadImprovements();
    }
  }, 5000);

  if (!improvementStore?.channel) return;

  improvementRealtimeChannel = improvementStore
    .channel("improvement-items-live")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "improvement_items" },
      () => {
        if (!infoModal.hidden && document.querySelector("#improvementList")) {
          loadImprovements();
        }
      }
    )
    .subscribe();
}

function stopImprovementAutoRefresh() {
  if (improvementRefreshTimerId) {
    window.clearInterval(improvementRefreshTimerId);
    improvementRefreshTimerId = null;
  }

  if (improvementRealtimeChannel && improvementStore?.removeChannel) {
    improvementStore.removeChannel(improvementRealtimeChannel);
    improvementRealtimeChannel = null;
  }
}

function showLocalImprovements(message) {
  improvementStorageMode = "local";
  renderImprovementList(getLocalImprovements(), {
    isLocal: true,
    message
  });
}

function renderImprovementList(items, options = {}) {
  const list = document.querySelector("#improvementList");
  if (!list) return;

  const noticeHtml = options.message
    ? `<p class="improvement-notice">${escapeHtml(options.message)}</p>`
    : "";

  if (items.length === 0) {
    list.innerHTML = `${noticeHtml}<p class="improvement-empty">아직 등록된 개선사항이 없습니다.</p>`;
    return;
  }

  const authorId = getImprovementAuthorId();
  list.innerHTML = noticeHtml + items
    .map((item) => {
      const isMine = options.isLocal || item.author_id === authorId;
      const createdAt = formatImprovementDate(item.created_at);
      const mineActions = isMine
        ? `
          <button class="mini-btn" type="button" data-edit-improvement="${escapeHtml(item.id)}">수정</button>
          <button class="delete-record-btn" type="button" data-delete-improvement="${escapeHtml(item.id)}">삭제</button>
        `
        : "";

      return `
        <article class="improvement-item">
          <div class="improvement-item-header">
            <strong>${options.isLocal ? "내 임시 개선사항" : isMine ? "내 개선사항" : "공유 개선사항"}</strong>
            <span>${escapeHtml(createdAt)}</span>
          </div>
          <p>${escapeHtml(item.content)}</p>
          <div class="improvement-item-actions">
            ${mineActions}
            <button class="complete-improvement-btn" type="button" data-complete-improvement="${escapeHtml(item.id)}">수정 완료</button>
          </div>
        </article>
      `;
    })
    .join("");
}

async function saveImprovement(event) {
  event.preventDefault();
  const input = document.querySelector("#improvementInput");
  const editId = document.querySelector("#improvementEditId")?.value || "";
  const content = input?.value.trim() || "";

  if (!input || !content) return;
  if (improvementStorageMode === "local" || !improvementStore) {
    saveLocalImprovement(editId, content);
    return;
  }

  setImprovementStatus(editId ? "개선사항을 수정하는 중입니다." : "개선사항을 등록하는 중입니다.");

  const authorId = getImprovementAuthorId();
  const query = editId
    ? improvementStore
      .from("improvement_items")
      .update({ content, updated_at: new Date().toISOString() })
      .eq("id", editId)
      .eq("author_id", authorId)
      .select("id")
    : improvementStore
      .from("improvement_items")
      .insert({ content, author_id: authorId })
      .select("id");

  const { error } = await query;
  if (error) {
    console.warn("Failed to save improvement to Supabase", error);
    improvementStorageMode = "local";
    saveLocalImprovement(editId, content);
    return;
  }

  resetImprovementForm();
  setImprovementStatus(editId ? "수정했습니다." : "등록했습니다.");
  await refreshImprovementsAfterMutation();
}

async function editImprovement(id) {
  const item = await getImprovementById(id);
  if (!item) return;

  if (item.author_id !== getImprovementAuthorId()) {
    setImprovementStatus("다른 사람이 입력한 개선사항은 수정할 수 없습니다.", true);
    return;
  }

  const editId = document.querySelector("#improvementEditId");
  const input = document.querySelector("#improvementInput");
  const saveBtn = document.querySelector("#saveImprovementBtn");
  const cancelEditBtn = document.querySelector("#cancelImprovementEditBtn");
  if (!editId || !input || !saveBtn || !cancelEditBtn) return;

  editId.value = item.id;
  input.value = item.content;
  saveBtn.textContent = "수정 저장";
  cancelEditBtn.hidden = false;
  input.focus();
  setImprovementStatus("수정할 내용을 입력하세요.");
}

async function deleteImprovement(id) {
  const item = await getImprovementById(id);
  if (!item) return;

  if (item.author_id !== getImprovementAuthorId()) {
    setImprovementStatus("다른 사람이 입력한 개선사항은 삭제할 수 없습니다.", true);
    return;
  }

  const confirmed = await openConfirmDialog({
    title: "개선사항을 삭제할까요?",
    message: "삭제하면 이 개선사항 목록에서 사라집니다.",
    confirmText: "삭제",
    cancelText: "취소",
    danger: true
  });

  if (!confirmed) return;
  await removeImprovement(id, "삭제했습니다.");
}

async function completeImprovement(id) {
  const password = await openConfirmDialog({
    title: "수정 완료",
    message: "비밀번호를 입력하면 이 개선사항이 목록에서 사라집니다.",
    inputLabel: "비밀번호",
    inputType: "password",
    confirmText: "완료",
    cancelText: "취소"
  });

  if (password === null) return;

  if (password !== IMPROVEMENT_COMPLETION_PASSWORD) {
    setImprovementStatus("비밀번호가 맞지 않습니다.", true);
    return;
  }

  await removeImprovement(id, "수정 완료 처리했습니다.");
}

async function removeImprovement(id, successMessage) {
  if (improvementStorageMode === "local" || !improvementStore) {
    removeLocalImprovement(id, successMessage);
    return;
  }

  const { error } = await improvementStore
    .from("improvement_items")
    .delete()
    .eq("id", id);

  if (error) {
    console.warn("Failed to remove improvement from Supabase", error);
    improvementStorageMode = "local";
    removeLocalImprovement(id, successMessage);
    return;
  }

  resetImprovementForm();
  setImprovementStatus(successMessage);
  await refreshImprovementsAfterMutation();
}

async function refreshImprovementsAfterMutation() {
  await loadImprovements();
  window.setTimeout(() => {
    if (!infoModal.hidden && document.querySelector("#improvementList")) {
      loadImprovements();
    }
  }, 350);
}

async function getImprovementById(id) {
  if (improvementStorageMode === "local") {
    const item = getLocalImprovements().find((improvement) => improvement.id === id);
    if (!item) {
      setImprovementStatus("개선사항 정보를 찾지 못했습니다.", true);
    }
    return item || null;
  }

  if (!improvementStore) return null;

  const { data, error } = await improvementStore
    .from("improvement_items")
    .select("id, content, author_id")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    setImprovementStatus("개선사항 정보를 찾지 못했습니다.", true);
    return null;
  }

  return data;
}

function getLocalImprovements() {
  try {
    const items = JSON.parse(localStorage.getItem(LOCAL_IMPROVEMENTS_KEY) || "[]");
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

function setLocalImprovements(items) {
  localStorage.setItem(LOCAL_IMPROVEMENTS_KEY, JSON.stringify(items));
}

function saveLocalImprovement(editId, content) {
  const now = new Date().toISOString();
  const authorId = getImprovementAuthorId();
  const items = getLocalImprovements();

  if (editId) {
    const index = items.findIndex((item) => item.id === editId);
    if (index >= 0) {
      items[index] = { ...items[index], content, updated_at: now };
    }
  } else {
    items.unshift({
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      content,
      author_id: authorId,
      created_at: now,
      updated_at: now
    });
  }

  setLocalImprovements(items);
  resetImprovementForm();
  setImprovementStatus(editId ? "임시 저장소에 수정했습니다." : "임시 저장소에 등록했습니다.");
  showLocalImprovements("공유 저장소에 연결하지 못해 이 브라우저에만 임시 저장 중입니다.");
}

function removeLocalImprovement(id, successMessage) {
  const items = getLocalImprovements().filter((item) => item.id !== id);
  setLocalImprovements(items);
  resetImprovementForm();
  setImprovementStatus(successMessage);
  showLocalImprovements("공유 저장소에 연결하지 못해 이 브라우저에만 임시 저장 중입니다.");
}

function resetImprovementForm() {
  const editId = document.querySelector("#improvementEditId");
  const input = document.querySelector("#improvementInput");
  const saveBtn = document.querySelector("#saveImprovementBtn");
  const cancelEditBtn = document.querySelector("#cancelImprovementEditBtn");

  if (editId) editId.value = "";
  if (input) input.value = "";
  if (saveBtn) saveBtn.textContent = "등록";
  if (cancelEditBtn) cancelEditBtn.hidden = true;
}

function getImprovementAuthorId() {
  let authorId = localStorage.getItem(IMPROVEMENT_AUTHOR_KEY);
  if (!authorId) {
    authorId = window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    localStorage.setItem(IMPROVEMENT_AUTHOR_KEY, authorId);
  }
  return authorId;
}

function setImprovementStatus(message, isError = false) {
  const status = document.querySelector("#improvementStatus");
  if (!status) return;

  status.textContent = message;
  status.classList.toggle("is-error", isError);
}

function formatImprovementDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function openConfirmDialog(options) {
  const {
    title,
    message = "",
    inputLabel = "",
    inputType = "text",
    confirmText = "확인",
    cancelText = "취소",
    danger = false,
    topicOptions = null,
    defaultTopic = ""
  } = options;
  const hasTopic = Array.isArray(topicOptions);

  confirmTopicWrap.hidden = !hasTopic;
  if (hasTopic) {
    confirmTopicSelect.innerHTML = `
      ${topicOptions.map((topic) => `<option value="${escapeHtml(topic)}">${escapeHtml(topic)}</option>`).join("")}
      <option value="${NEW_TOPIC_VALUE}">＋ 새 주제 만들기</option>
    `;
    confirmTopicSelect.value = defaultTopic || topicOptions[0] || NEW_TOPIC_VALUE;
    confirmNewTopicInput.value = "";
    updateConfirmNewTopicVisibility();
  }

  confirmTitle.textContent = title;
  confirmMessage.textContent = message;
  confirmInputLabel.textContent = inputLabel;
  confirmInputLabel.hidden = !inputLabel;
  confirmInputWrap.hidden = !inputLabel;
  confirmInput.value = "";
  confirmInput.type = inputType;
  toggleConfirmPasswordBtn.hidden = inputType !== "password";
  toggleConfirmPasswordBtn.setAttribute("aria-pressed", "false");
  toggleConfirmPasswordBtn.setAttribute("aria-label", "비밀번호 보기");
  confirmError.textContent = "";
  confirmActions.innerHTML = `
    <button class="confirm-secondary-btn" type="button" data-confirm-cancel>${escapeHtml(cancelText)}</button>
    <button class="confirm-primary-btn${danger ? " is-danger" : ""}" type="button" data-confirm-ok>${escapeHtml(confirmText)}</button>
  `;
  confirmModal.hidden = false;

  if (inputLabel) {
    confirmInput.focus();
  } else if (hasTopic) {
    confirmTopicSelect.focus();
  } else {
    confirmActions.querySelector("[data-confirm-ok]")?.focus();
  }

  return new Promise((resolve) => {
    const finish = (value) => {
      confirmModal.hidden = true;
      confirmActions.innerHTML = "";
      activeConfirmDialog = null;
      resolve(value);
    };

    activeConfirmDialog = { finish, hasInput: Boolean(inputLabel), hasTopic };
  });
}

function handleConfirmAction(event) {
  const cancelButton = event.target.closest("[data-confirm-cancel]");
  if (cancelButton) {
    cancelConfirmDialog();
    return;
  }

  const okButton = event.target.closest("[data-confirm-ok]");
  if (!okButton || !activeConfirmDialog) return;

  if (activeConfirmDialog.hasInput && !confirmInput.value.trim()) {
    confirmError.textContent = "값을 입력해 주세요.";
    confirmInput.focus();
    return;
  }

  if (activeConfirmDialog.hasTopic) {
    const topic = confirmTopicSelect.value === NEW_TOPIC_VALUE
      ? confirmNewTopicInput.value.replace(/\s+/g, " ").trim()
      : confirmTopicSelect.value;
    if (!topic) {
      confirmError.textContent = "새 주제 이름을 입력해 주세요.";
      confirmNewTopicInput.focus();
      return;
    }
    activeConfirmDialog.finish(topic);
    return;
  }

  activeConfirmDialog.finish(activeConfirmDialog.hasInput ? confirmInput.value : true);
}

function updateConfirmNewTopicVisibility() {
  const isNewTopic = confirmTopicSelect.value === NEW_TOPIC_VALUE;
  confirmNewTopicInput.hidden = !isNewTopic;
  confirmError.textContent = "";
  if (isNewTopic) confirmNewTopicInput.focus();
}

function handleConfirmInputKeydown(event) {
  if (event.key !== "Enter" || !activeConfirmDialog) {
    return;
  }

  event.preventDefault();
  if (!confirmInput.value.trim()) {
    confirmError.textContent = "값을 입력해 주세요.";
    return;
  }

  activeConfirmDialog.finish(confirmInput.value);
}

function toggleConfirmPasswordVisibility() {
  const isVisible = confirmInput.type === "text";
  confirmInput.type = isVisible ? "password" : "text";
  toggleConfirmPasswordBtn.setAttribute("aria-pressed", String(!isVisible));
  toggleConfirmPasswordBtn.setAttribute("aria-label", isVisible ? "비밀번호 보기" : "비밀번호 숨기기");
  confirmInput.focus();
}

function cancelConfirmDialog() {
  if (!activeConfirmDialog) return;
  activeConfirmDialog.finish(null);
}

function closeInfoModal() {
  stopImprovementAutoRefresh();
  infoModal.hidden = true;
  modalBody.innerHTML = "";
}

async function handleModalClick(event) {
  if (event.target.closest("[data-enable-all-topics]")) {
    setAllTopicsEnabled(true);
    return;
  }

  if (event.target.closest("[data-disable-all-topics]")) {
    setAllTopicsEnabled(false);
    return;
  }

  const deleteTopicButton = event.target.closest("[data-delete-topic]");
  if (deleteTopicButton) {
    await deleteTopic(deleteTopicButton.dataset.deleteTopic);
    return;
  }

  if (event.target.closest("[data-move-selected-topic]")) {
    await moveSelectedQuestionsTopic();
    return;
  }

  const renameTopicButton = event.target.closest("[data-rename-topic]");
  if (renameTopicButton) {
    renamingTopic = renameTopicButton.dataset.renameTopic;
    renderTopicFilterList();
    return;
  }

  if (event.target.closest("[data-cancel-topic-rename]")) {
    renamingTopic = "";
    renderTopicFilterList();
    return;
  }

  const toggleTopicQuestionsButton = event.target.closest("[data-toggle-topic-questions]");
  if (toggleTopicQuestionsButton) {
    const topic = toggleTopicQuestionsButton.dataset.toggleTopicQuestions;
    if (expandedTopicNames.has(topic)) {
      expandedTopicNames.delete(topic);
    } else {
      expandedTopicNames.add(topic);
    }
    renderTopicFilterList();
    return;
  }

  const toggleBaseRestoreListButton = event.target.closest("[data-toggle-base-restore-list]");
  if (toggleBaseRestoreListButton) {
    isBaseRestoreListOpen = !isBaseRestoreListOpen;
    renderCustomQuestionList();
    return;
  }

  const restoreSelectedQuestionsButton = event.target.closest("[data-restore-selected-questions]");
  if (restoreSelectedQuestionsButton) {
    restoreSelectedDeletedQuestions();
    return;
  }

  const deleteSelectedQuestionsButton = event.target.closest("[data-delete-selected-questions]");
  if (deleteSelectedQuestionsButton) {
    await permanentlyDeleteSelectedDeletedQuestions();
    return;
  }

  const deleteSelectedActiveQuestionsButton = event.target.closest("[data-delete-selected-active-questions]");
  if (deleteSelectedActiveQuestionsButton) {
    await deleteSelectedActiveQuestions();
    return;
  }

  const toggleQuestionOrderButton = event.target.closest("[data-toggle-question-order]");
  if (toggleQuestionOrderButton) {
    isQuestionOrderListOpen = !isQuestionOrderListOpen;
    renderQuestionOrderList();
    return;
  }

  const toggleQuestionOrderTextButton = event.target.closest("[data-toggle-question-order-text]");
  if (toggleQuestionOrderTextButton) {
    const key = toggleQuestionOrderTextButton.dataset.toggleQuestionOrderText;
    if (expandedOrderQuestionKeys.has(key)) {
      expandedOrderQuestionKeys.delete(key);
    } else {
      expandedOrderQuestionKeys.add(key);
    }
    renderQuestionOrderList();
    return;
  }

  const moveQuestionTopButton = event.target.closest("[data-move-question-top]");
  if (moveQuestionTopButton) {
    moveQuestionToFront(moveQuestionTopButton.dataset.moveQuestionTop);
    return;
  }

  const moveQuestionUpButton = event.target.closest("[data-move-question-up]");
  if (moveQuestionUpButton) {
    moveQuestionStep(moveQuestionUpButton.dataset.moveQuestionUp, -1);
    return;
  }

  const moveQuestionDownButton = event.target.closest("[data-move-question-down]");
  if (moveQuestionDownButton) {
    moveQuestionStep(moveQuestionDownButton.dataset.moveQuestionDown, 1);
    return;
  }

  const editBaseQuestionButton = event.target.closest("[data-edit-base-question]");
  if (editBaseQuestionButton) {
    editQuestion("base", editBaseQuestionButton.dataset.editBaseQuestion);
    return;
  }

  const editCustomQuestionButton = event.target.closest("[data-edit-custom-question]");
  if (editCustomQuestionButton) {
    editQuestion("custom", Number(editCustomQuestionButton.dataset.editCustomQuestion));
    return;
  }

  const deleteBaseQuestionButton = event.target.closest("[data-delete-base-question]");
  if (deleteBaseQuestionButton) {
    await deleteQuestion("base", deleteBaseQuestionButton.dataset.deleteBaseQuestion);
    return;
  }

  const deleteCustomQuestionButton = event.target.closest("[data-delete-custom-question]");
  if (deleteCustomQuestionButton) {
    await deleteQuestion("custom", Number(deleteCustomQuestionButton.dataset.deleteCustomQuestion));
    return;
  }

  const restoreBaseQuestionButton = event.target.closest("[data-restore-base-question]");
  if (restoreBaseQuestionButton) {
    restoreBaseQuestion(restoreBaseQuestionButton.dataset.restoreBaseQuestion);
    return;
  }

  const restoreCustomQuestionButton = event.target.closest("[data-restore-custom-question]");
  if (restoreCustomQuestionButton) {
    restoreCustomQuestion(Number(restoreCustomQuestionButton.dataset.restoreCustomQuestion));
    return;
  }

  const deleteDeletedBaseQuestionButton = event.target.closest("[data-delete-deleted-base-question]");
  if (deleteDeletedBaseQuestionButton) {
    await permanentlyDeleteDeletedQuestion("base", deleteDeletedBaseQuestionButton.dataset.deleteDeletedBaseQuestion);
    return;
  }

  const deleteDeletedCustomQuestionButton = event.target.closest("[data-delete-deleted-custom-question]");
  if (deleteDeletedCustomQuestionButton) {
    await permanentlyDeleteDeletedQuestion("custom", Number(deleteDeletedCustomQuestionButton.dataset.deleteDeletedCustomQuestion));
    return;
  }

  const deleteButton = event.target.closest("[data-delete-record]");
  if (deleteButton) {
    deletePracticeRecord(Number(deleteButton.dataset.deleteRecord));
    openInfoModal("최근 답변 기록", practiceHistory.innerHTML);
    return;
  }

  const editImprovementButton = event.target.closest("[data-edit-improvement]");
  if (editImprovementButton) {
    await editImprovement(editImprovementButton.dataset.editImprovement);
    return;
  }

  const deleteImprovementButton = event.target.closest("[data-delete-improvement]");
  if (deleteImprovementButton) {
    await deleteImprovement(deleteImprovementButton.dataset.deleteImprovement);
    return;
  }

  const completeImprovementButton = event.target.closest("[data-complete-improvement]");
  if (completeImprovementButton) {
    await completeImprovement(completeImprovementButton.dataset.completeImprovement);
  }
}

function deletePracticeRecord(index) {
  const records = getPracticeRecords();
  records.splice(index, 1);
  localStorage.setItem("practiceInterviewRecords", JSON.stringify(records));
  renderPracticeHistory();
}

function stopPreviewStream() {
  if (!previewStream) return;

  previewStream.getTracks().forEach((track) => track.stop());
  previewStream = null;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
