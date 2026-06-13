# Practice AI Interview for Career Teacher — AGENTS.md

## 프로젝트 개요

진로전담교사 면접 연습용 정적 웹앱이다. 질문 선택, 준비 타이머, 영상/음성 녹화, 음성 인식, 간단 피드백, 최근 기록 저장을 제공한다.
프레임워크와 빌드 단계 없이 브라우저에서 바로 실행되는 구조다.

## 파일 구조

```
Practice-AI-Interview-for-Career-Teacher/
├── AGENTS.md                    # Codex 작업 지침
├── CLAUDE.md                    # Claude 작업 지침
├── index.html                   # 화면 DOM, 모달, 미디어 플레이어
├── main.js                      # 앱 상태와 동작 로직
├── style.css                    # 레이아웃/반응형/컴포넌트 스타일
├── 면접예상질문.txt             # 질문 목록, 빈 줄로 질문 구분
├── CNAME                        # GitHub Pages custom domain
└── assets/
    └── interview-compass-mark.png
```

## 실행 방법

```bash
python3 -m http.server 8000
# http://127.0.0.1:8000/
```

카메라/마이크는 보안 컨텍스트가 필요하다. 로컬은 `localhost` 계열, 배포는 `https://`로 접속해야 한다.

## 기술 스택

- Vanilla HTML/CSS/JavaScript
- `navigator.mediaDevices.getUserMedia`
- `MediaRecorder`
- `SpeechRecognition` / `webkitSpeechRecognition`
- `localStorage`
- GitHub Pages

## 핵심 동작

### 질문

- `FALLBACK_QUESTIONS`를 기본값으로 둔다.
- `loadQuestionsFromTextFile()`이 `면접예상질문.txt`를 가져오면 파일 내용으로 질문 목록을 교체한다.
- 질문 파일은 빈 줄 기준으로 구분한다.
- 드롭다운에서 질문을 고르면 즉시 다음 질문으로 예약된다.
- `무작위` 버튼은 예약을 해제한다.

### 타이머

- 준비 시간은 `PREP_SECONDS = 10`.
- 답변 시간은 `ANSWER_SECONDS = 90`.
- 타이머 시간은 사용자 요청 없이 변경하지 않는다.
- `다시 시작`은 준비시간이 아니라 답변 시작 후 20초가 지나기 전까지만 가능하다.

### 녹화와 권한

- `getInterviewStream()`은 영상+음성을 우선 요청하고, 실패하면 음성만 요청한다.
- `startRecording()`은 `MediaRecorder`, 카메라 미리보기, 음성 인식을 시작한다.
- `stopActiveRecording()`은 recognition, recorder, stream track을 모두 정리한다.
- HTTPS가 아니면 카메라/마이크가 안 될 수 있으므로 `getMediaSupportMessage()` 메시지를 유지한다.

### 결과와 기록

- 녹화 결과는 비디오 또는 오디오 플레이어에 표시한다.
- 음성 인식 텍스트는 `transcriptText`에 표시한다.
- `renderFeedback()`은 답변 분량, 속도, 핵심어 반영률, 습관어를 계산한다.
- `savePracticeRecord()`는 최근 5개 기록만 localStorage에 저장한다.
- 기록 보기 모달에는 `질문:`과 `답변:` 라벨을 붙이고 답변 전체를 표시한다.
- 기록의 `삭제` 버튼은 해당 항목만 localStorage에서 제거한다.

## DOM 주요 영역

```
.top-bar
  .brand
  #phaseLabel
.question-box
  #questionText
.timer-area
  #timerTitle
  #timerText
  #progressBar
.controls
  #startBtn
  #skipBtn
  #retryBtn
  #deviceCheckBtn
.video-panel
  #cameraPreview
  #environmentList
.order-panel
  #questionPicker
  #randomQuestionBtn
.answer-result
  #openGuideBtn
  #openHistoryBtn
  #recordingState
  #videoPlayer
  #audioPlayer
  #transcriptText
  #feedbackBox
#infoModal
```

## 스타일/레이아웃 주의사항

- 데스크톱은 `@media (min-width: 900px)`에서 한 화면형 면접 대시보드로 고정한다.
- 모바일/좁은 화면은 일반 스크롤을 허용한다.
- 질문이 길면 `.long-question`, `.very-long-question`로 글자 크기를 낮춘다.
- `가이드 보기`와 `기록 보기`는 모달로 열며 기본 화면을 과도하게 차지하지 않게 한다.
- 카드 radius는 기존 8px 계열을 유지한다.

## 배포

- 원격 저장소: `https://github.com/kmathlove-wq/Practice-AI-Interview-for-Career-Teacher.git`
- 브랜치: `main`
- 커스텀 도메인: `진로스터디.kro.kr` (`CNAME`에는 punycode 저장)
- HTTPS 인증서가 준비되지 않으면 카메라/마이크가 막힐 수 있다.

## Codex 작업 규칙

- 사용자가 “업로드하지 마”라고 하지 않는 한 작업 후 커밋하고 GitHub에 푸시한다.
- 푸시가 `GITHUB_TOKEN` 문제로 실패하면 `env -u GITHUB_TOKEN git push`를 사용한다.
- 원격에 새 커밋이 있으면 `env -u GITHUB_TOKEN git pull --rebase origin main` 후 푸시한다.
- 코드 변경 후 최소 `node --check main.js`를 실행한다.
- 문서에 새 규칙이 생기면 `AGENTS.md`와 필요 시 `CLAUDE.md`를 갱신한다.
