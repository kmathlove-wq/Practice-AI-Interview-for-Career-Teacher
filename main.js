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
const randomQuestionBtn = document.querySelector("#randomQuestionBtn");
const reservedQuestionState = document.querySelector("#reservedQuestionState");
const openGuideBtn = document.querySelector("#openGuideBtn");
const openHistoryBtn = document.querySelector("#openHistoryBtn");
const infoModal = document.querySelector("#infoModal");
const modalTitle = document.querySelector("#modalTitle");
const modalBody = document.querySelector("#modalBody");
const closeModalBtn = document.querySelector("#closeModalBtn");

let questions = [...FALLBACK_QUESTIONS];
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

init();

function init() {
  renderQuestionPicker();
  loadQuestionsFromTextFile();
  renderPracticeHistory();
  startBtn.addEventListener("click", startPractice);
  skipBtn.addEventListener("click", skipQuestion);
  retryBtn.addEventListener("click", retryCurrentQuestion);
  deviceCheckBtn.addEventListener("click", checkEnvironment);
  questionPicker.addEventListener("change", reserveSelectedQuestion);
  randomQuestionBtn.addEventListener("click", clearReservedQuestion);
  openGuideBtn.addEventListener("click", () => openInfoModal("면접 가이드", answerGuide.innerHTML));
  openHistoryBtn.addEventListener("click", () => openInfoModal("최근 답변 기록", practiceHistory.innerHTML));
  closeModalBtn.addEventListener("click", closeInfoModal);
  modalBody.addEventListener("click", handleModalClick);
  infoModal.addEventListener("click", (event) => {
    if (event.target.hasAttribute("data-close-modal")) {
      closeInfoModal();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !infoModal.hidden) {
      closeInfoModal();
    }
  });
  window.addEventListener("beforeunload", stopAllMedia);
}

async function loadQuestionsFromTextFile() {
  try {
    const response = await fetch("면접예상질문.txt", { cache: "no-store" });
    if (!response.ok) return;

    const text = await response.text();
    const parsedQuestions = parseQuestions(text);
    if (parsedQuestions.length > 0) {
      questions = parsedQuestions;
    }
    renderQuestionPicker();
  } catch {
    questions = [...FALLBACK_QUESTIONS];
    renderQuestionPicker();
  }
}

function parseQuestions(text) {
  return text
    .replace(/\r/g, "")
    .split(/\n\s*\n/)
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

function openInfoModal(title, content) {
  modalTitle.textContent = title;
  modalBody.innerHTML = content || "표시할 내용이 없습니다.";
  infoModal.hidden = false;
  closeModalBtn.focus();
}

function closeInfoModal() {
  infoModal.hidden = true;
  modalBody.innerHTML = "";
}

function handleModalClick(event) {
  const deleteButton = event.target.closest("[data-delete-record]");
  if (!deleteButton) return;

  deletePracticeRecord(Number(deleteButton.dataset.deleteRecord));
  openInfoModal("최근 답변 기록", practiceHistory.innerHTML);
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
