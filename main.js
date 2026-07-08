const FALLBACK_QUESTIONS = [
  "2026 경기진로교육 정책에서 강조하는 '경기진로연계교육'의 개념을 설명하고, 진로전담교사로서 이를 학교교육과정 안에 실현하기 위한 방안을 학교 안, 지역사회, 온라인 플랫폼으로 나누어 구상하시오.",
  "2026 경기진로교육의 '지역 연계 진로체험교육 내실화'에 대해 설명하고, 진로전담교사로서의 실천 방안을 말하시오.",
  "'꿈잇다'의 개념과 주요 기능을 설명하고, '꿈잇다 2.0' 고도화의 방향을 말하시오. 이를 바탕으로 학생의 자기주도적 진로설계역량을 강화하기 위한 진로전담교사의 구체적 실천 전략을 3가지 제시하시오.",
  "2026년 경기교육 기본계획 정책 3가지 방향과 진로교육 연계 방안",
  "2026년 경기 진로직업교육과 정책 추진 기본계획",
  "2026년 경기진로교육 기본 정책 방향 3가지 제시하고, 정책과제 1을 구체적으로 설명",
  "지역 연계 진로체험교육의 정책 방향을 설명하고, 학교 현장에서의 내실화 방안을 3가지 제안하시오.",
  "학교 진로연계교육의 필요성을 설명하고, 학교에서 이를 활성화 하기 위해 학교 교육과정 설계 방안을 제안하시오.",
  "디지털 환경에서 AI 기반 진로진학 지원 플랫폼인 「꿈it(잇)다」를 이용해 학생의 '자기주도적 진로설계역량'을 강화하기 위한 구체적인 방안을 3가지 제안하시오.",
  "진로 사각지대 해소를 위한 학생과 학부모에 대한 진로교육 상시 지원 체제를 제안하시오.",
  "2026 경기교육정책이 학교의 진로교육에 반영될 수 있도록 각 섹터 별로 제안하시오.",
  "경기교육 기본계획을 바탕으로 진로 전담교사로서 어떤 역할을 수행하고 싶습니까?",
  "진로교육 중심 학교 교육과정의 특징과 진로 전담교사의 역할을 제시하시오.",
  "경기진로교육 정책 중 하나인 사각지대 없는 진로교육 상시 지원을 학교 현장에서 실천하기 위해, 진로 미결정 상태에 있거나 사회적 취약계층인 학생들을 대상으로 어떤 지도를 실시하겠습니까?"
];

const PREP_SECONDS = 10;
const ANSWER_SECONDS = 90;
const QUESTION_FILE_NAMES = ["면접예상질문.txt", "면접예상질문2.txt"];
const CUSTOM_QUESTIONS_KEY = "practiceInterviewCustomQuestions";
const DELETED_CUSTOM_QUESTIONS_KEY = "practiceInterviewDeletedCustomQuestions";
const BASE_QUESTION_EDITS_KEY = "practiceInterviewBaseQuestionEdits";
const DELETED_BASE_QUESTIONS_KEY = "practiceInterviewDeletedBaseQuestions";
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
const startBtn = document.querySelector("#startBtn");
const skipBtn = document.querySelector("#skipBtn");
const retryBtn = document.querySelector("#retryBtn");
const deviceCheckBtn = document.querySelector("#deviceCheckBtn");
const recordingState = document.querySelector("#recordingState");
const cameraState = document.querySelector("#cameraState");
const cameraPreview = document.querySelector("#cameraPreview");
const videoPlayer = document.querySelector("#videoPlayer");
const audioPlayer = document.querySelector("#audioPlayer");
const transcriptText = document.querySelector("#transcriptText");
const answerGuide = document.querySelector("#answerGuide");
const environmentList = document.querySelector("#environmentList");
const feedbackBox = document.querySelector("#feedbackBox");
const practiceHistory = document.querySelector("#practiceHistory");
const historyCount = document.querySelector("#historyCount");
const questionPicker = document.querySelector("#questionPicker");
const openCustomQuestionBtn = document.querySelector("#openCustomQuestionBtn");
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
const confirmActions = document.querySelector("#confirmActions");
const confirmCloseBtn = document.querySelector("#confirmCloseBtn");
const improvementStore = window.supabase?.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY) || null;

let baseQuestions = [...FALLBACK_QUESTIONS];
let baseQuestionEdits = {};
let deletedBaseQuestions = [];
let customQuestions = [];
let deletedCustomQuestions = [];
let questions = [...baseQuestions];
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
let activeConfirmDialog = null;
let improvementRefreshTimerId = null;
let improvementRealtimeChannel = null;
let improvementStorageMode = "remote";
let isBaseRestoreListOpen = false;

init();

function init() {
  loadQuestionPersonalizations();
  syncQuestions();
  loadQuestionsFromTextFile();
  renderPracticeHistory();
  startBtn.addEventListener("click", startPractice);
  skipBtn.addEventListener("click", skipQuestion);
  retryBtn.addEventListener("click", retryCurrentQuestion);
  deviceCheckBtn.addEventListener("click", checkEnvironment);
  questionPicker.addEventListener("change", reserveSelectedQuestion);
  openCustomQuestionBtn.addEventListener("click", openCustomQuestionModal);
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
      loadedQuestions.push(...parseQuestions(text));
    }

    if (loadedQuestions.length > 0) {
      baseQuestions = loadedQuestions;
    }
    syncQuestions();
  } catch {
    baseQuestions = [...FALLBACK_QUESTIONS];
    syncQuestions();
  }
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
  resetResult();
  pickRandomQuestion();
  await runCurrentQuestion();
}

function skipQuestion() {
  stopCurrentTimer();
  stopActiveRecording();
  resetResult();
  pickRandomQuestion(currentQuestion);
  runCurrentQuestion();
}

async function retryCurrentQuestion() {
  if (phase !== "answer" || currentTimerRemaining <= ANSWER_SECONDS - 20 || !currentQuestion) return;

  stopCurrentTimer();
  stopActiveRecording();
  resetResult();
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
    finishPractice("마이크 권한을 허용하면 답변 녹음을 시작할 수 있습니다.");
    return;
  }

  setPhase("answer");
  await runTimer(ANSWER_SECONDS, "답변 시간");

  if (phase === "answer") {
    finishAnswer();
  }
}

function pickRandomQuestion(previousQuestion = "") {
  if (reservedQuestion) {
    currentQuestion = reservedQuestion;
    reservedQuestion = "";
    reservedQuestionState.textContent = "무작위";
    questionPicker.value = "";
    updateQuestionPickerPlaceholder();
    setQuestionText(currentQuestion);
    renderAnswerGuide(currentQuestion);
    return;
  }

  const candidates = questions.filter((question) => question !== previousQuestion);
  const pool = candidates.length > 0 ? candidates : questions;
  currentQuestion = pool[Math.floor(Math.random() * pool.length)];
  setQuestionText(currentQuestion);
  renderAnswerGuide(currentQuestion);
}

function setQuestionText(question) {
  questionText.textContent = question;
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

function updateTimer(remaining, total) {
  currentTimerRemaining = remaining;
  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");
  const elapsedRatio = total === 0 ? 0 : ((total - remaining) / total) * 100;

  timerText.textContent = `${minutes}:${seconds}`;
  progressBar.style.width = `${Math.min(100, Math.max(0, elapsedRatio))}%`;
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
  finishPractice("답변이 종료되었습니다. 녹음 결과를 확인해 주세요.");
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
    recorder.stop();
  }

  if (audioStream) {
    audioStream.getTracks().forEach((track) => track.stop());
    audioStream = null;
  }

  stopPreviewStream();

  cameraPreview.srcObject = null;
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
  feedbackBox.hidden = true;
  feedbackBox.innerHTML = "";
  transcriptText.textContent = "답변 시간이 끝나면 녹음 파일과 음성 인식 텍스트가 이곳에 표시됩니다.";
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
}

function updateRetryAvailability() {
  retryBtn.disabled = !(phase === "answer" && currentTimerRemaining > ANSWER_SECONDS - 20);
}

async function checkEnvironment() {
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
  if (stream.getVideoTracks().length === 0) return;

  cameraPreview.srcObject = stream;
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
  const elapsedSeconds = answerStartedAt ? Math.round((Date.now() - answerStartedAt) / 1000) : ANSWER_SECONDS;
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
  questions = [...getVisibleBaseQuestions(), ...customQuestions];
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
      questions = [...getVisibleBaseQuestions(), ...customQuestions];
    }
  }
  if (reservedQuestion && !questions.includes(reservedQuestion)) {
    reservedQuestion = "";
    reservedQuestionState.textContent = "무작위";
  }
  renderQuestionPicker();
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

  questions.forEach((question, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `${index + 1}. ${question}`;
    questionPicker.append(option);
  });

  const reservedIndex = questions.indexOf(reservedQuestion);
  questionPicker.value = reservedIndex >= 0 ? String(reservedIndex) : "";
  updateQuestionPickerPlaceholder();
}

function reserveSelectedQuestion() {
  if (questionPicker.value === "") return;

  const selectedQuestion = questions[Number(questionPicker.value)];
  if (!selectedQuestion) return;

  reservedQuestion = selectedQuestion;
  reservedQuestionState.textContent = "예약됨";
  updateQuestionPickerPlaceholder();
}

function clearReservedQuestion() {
  reservedQuestion = "";
  reservedQuestionState.textContent = "무작위";
  questionPicker.value = "";
  updateQuestionPickerPlaceholder();
}

function updateQuestionPickerPlaceholder() {
  questionPicker.classList.toggle("is-placeholder", questionPicker.value === "");
}

function openCustomQuestionModal() {
  stopImprovementAutoRefresh();
  isBaseRestoreListOpen = false;
  modalTitle.textContent = "질문 관리";
  modalBody.innerHTML = `
    <form id="customQuestionForm" class="custom-question-form">
      <input id="customQuestionEditType" type="hidden">
      <input id="customQuestionEditIndex" type="hidden">
      <input id="customQuestionEditKey" type="hidden">
      <label class="custom-question-label" for="customQuestionInput">질문 입력</label>
      <textarea id="customQuestionInput" class="custom-question-input" rows="4" maxlength="400" placeholder="연습하고 싶은 질문을 입력하세요." required></textarea>
      <div class="custom-question-form-actions">
        <p id="customQuestionStatus" class="custom-question-status" aria-live="polite"></p>
        <div class="custom-question-buttons">
          <button id="cancelCustomQuestionEditBtn" class="mini-btn" type="button" hidden>수정 취소</button>
          <button id="saveCustomQuestionBtn" class="primary-btn compact-btn" type="submit">추가</button>
        </div>
      </div>
    </form>
    <div id="customQuestionList" class="custom-question-list"></div>
  `;
  infoModal.hidden = false;
  closeModalBtn.focus();
  setupCustomQuestionForm();
  renderCustomQuestionList();
}

function setupCustomQuestionForm() {
  const form = document.querySelector("#customQuestionForm");
  const cancelEditBtn = document.querySelector("#cancelCustomQuestionEditBtn");
  if (!form || !cancelEditBtn) return;

  form.addEventListener("submit", saveCustomQuestion);
  cancelEditBtn.addEventListener("click", resetCustomQuestionForm);
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

  if (editType === "base" && baseQuestions.includes(editKey)) {
    const previousQuestion = baseQuestionEdits[editKey] || editKey;
    if (question === editKey) {
      delete baseQuestionEdits[editKey];
    } else {
      baseQuestionEdits[editKey] = question;
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
    if (reservedQuestion === previousQuestion) {
      reservedQuestion = question;
      reservedQuestionState.textContent = "예약됨";
    }
    status.textContent = "질문을 수정했습니다.";
  } else {
    customQuestions.unshift(question);
    status.textContent = "질문을 추가했습니다.";
  }

  status.classList.remove("is-error");
  saveCustomQuestions();
  syncQuestions();
  resetCustomQuestionForm(status.textContent);
  renderCustomQuestionList();
}

function resetCustomQuestionForm(message = "") {
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
        <article class="custom-question-item">
          <div class="custom-question-item-header">
            <span class="custom-question-badge">기본</span>
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
      <article class="custom-question-item">
        <div class="custom-question-item-header">
          <span class="custom-question-badge is-custom">개인</span>
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
      </div>
      ${customQuestionsHtml}
    </section>
    <section class="custom-question-section">
      <div class="custom-question-section-header">
        <h3>기본 질문</h3>
        ${restoreButtonHtml}
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
    reservedQuestionState.textContent = "무작위";
  }
  syncQuestions();
  resetCustomQuestionForm("질문을 삭제했습니다.");
  renderCustomQuestionList();
}

function getVisibleQuestionCount() {
  return getVisibleBaseQuestions().length + customQuestions.length;
}

function restoreBaseQuestion(question) {
  deletedBaseQuestions = deletedBaseQuestions.filter((deletedQuestion) => deletedQuestion !== question);
  if (deletedBaseQuestions.length === 0 && deletedCustomQuestions.length === 0) {
    isBaseRestoreListOpen = false;
  }
  saveBaseQuestionPersonalizations();
  syncQuestions();
  resetCustomQuestionForm("기본 질문을 복원했습니다.");
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
    danger = false
  } = options;

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

    activeConfirmDialog = { finish, hasInput: Boolean(inputLabel) };
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

  activeConfirmDialog.finish(activeConfirmDialog.hasInput ? confirmInput.value : true);
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
