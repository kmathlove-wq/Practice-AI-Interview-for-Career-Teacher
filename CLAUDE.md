# Practice AI Interview for Career Teacher — CLAUDE.md

## 프로젝트 개요

진로전담교사 면접을 연습하기 위한 정적 웹앱이다. 별도 빌드 도구 없이 `index.html`, `style.css`, `main.js`, `면접예상질문.txt`, `면접예상질문2.txt`만으로 동작한다.
사용자는 예상 질문을 무작위 또는 예약 선택으로 받고, 준비 시간 없이 바로 영상/음성 답변을 1분 30초·1분 50초·3분 중 고른 시간 동안 녹화한다.
답변 종료 후 녹화/녹음 결과, 음성 인식 텍스트, 간단 피드백, 최근 기록을 확인할 수 있다.

## 파일 구조

```
Practice-AI-Interview-for-Career-Teacher/
├── AGENTS.md                    # Codex 작업 지침
├── CLAUDE.md                    # Claude 작업 지침
├── index.html                   # 앱 DOM, 모달, 버튼, 비디오/오디오 영역
├── main.js                      # 질문 로딩, 타이머, 녹화, 음성 인식, 기록 로직
├── style.css                    # 반응형 레이아웃과 면접 화면 스타일
├── 면접예상질문.txt             # 빈 줄로 구분된 예상 질문 원본
├── 면접예상질문2.txt            # 추가 예상 질문 원본
├── CNAME                        # GitHub Pages 사용자 지정 도메인
└── assets/
    └── interview-compass-mark.png # 파비콘/상단 로고
```

## 실행 방법

로컬에서는 정적 서버로 실행한다. 마이크/카메라는 `localhost` 또는 `https://`에서만 안정적으로 동작한다.

```bash
python3 -m http.server 8000
# http://127.0.0.1:8000/
```

## 기술 스택

- HTML/CSS/Vanilla JavaScript
- `navigator.mediaDevices.getUserMedia`
- `MediaRecorder`
- `SpeechRecognition` / `webkitSpeechRecognition`
- `localStorage`
- 개선사항 서버: Cloudflare Worker + D1 (`server/`)
- GitHub Pages

## 주요 상수

| 상수 | 값 | 설명 |
|---|---:|---|
| `answerSeconds` | 90 / 110 / 180 | 답변 녹화 시간(기본 110). 시간 아래 버튼으로 선택(`practiceInterviewAnswerSeconds`). 답변 중에 바꾸면 같은 문제를 새 시간으로 처음부터 다시 녹화하고 그때까지의 녹화는 버림. 준비 시간은 없음 |

타이머 시간은 사용자 요청 없이 변경하지 않는다.

## 핵심 동작

### 질문

- `FALLBACK_QUESTIONS`를 기본값으로 둔다.
- `loadQuestionsFromTextFile()`이 `면접예상질문.txt`, `면접예상질문2.txt`를 순서대로 가져와 질문 목록을 합친다.
- 질문 파일은 번호 목록/빈 줄로 구분하고, `<주제이름>` 줄 아래 질문은 그 주제로 묶는다(`parseTopicQuestions()`; 개인 질문은 `개인 질문` 주제).
- `주제 선택` 모달에서 주제·질문별 켜기/끄기(`…DisabledTopics`/`…DisabledQuestions`, 기본 전부 켜짐; 주제를 켜면 그 주제의 꺼진 질문도 모두 켜짐), 주제 이름 바꾸기(같은 이름이면 합쳐짐)·삭제(`askTargetTopic()` 팝업에서 옮길 주제 선택, `…DeletedTopics`; `주제 없음`은 둘 다 불가). 질문 관리의 `선택 주제 바꾸기`로 여러 질문 이동. 무작위·드롭다운은 `enabledQuestions`만 쓴다. 주제 결정 순서: 파일 주제 → `practiceInterviewTopicRenames` → 질문별 지정(`…CustomQuestionTopics`/`…BaseQuestionTopicEdits`, 질문 관리 폼의 주제 선택·새 주제 만들기).
- 드롭다운에서 질문을 고르면 즉시 다음 질문으로 예약된다.
- `무작위` 버튼은 예약 질문을 해제한다.
- `질문 추가`는 질문 관리 모달을 열고, 개인 질문은 `practiceInterviewCustomQuestions`에 저장한다.
- 기본 질문의 수정/삭제도 원본 파일을 바꾸지 않고 `practiceInterviewBaseQuestionEdits`, `practiceInterviewDeletedBaseQuestions`에 개인 설정으로 저장한다.
- 질문은 최소 1개 이상 남겨야 하며, 일반/복원 목록 질문은 체크박스로 다중 선택해 삭제·복원할 수 있다.
- `setQuestionText()`는 질문 길이에 따라 `long-question`, `very-long-question` 클래스를 붙여 글자 크기를 조정한다.
- "질문 순서" 목록(기본은 접힘, `질문 순서 보기` 버튼으로 펼침)에서 맨 앞으로/▲/▼로 연습 번호를
  바꾼다. 긴 질문은 40자로 줄이고 `전체`로 펼친다. `questionOrder`(`practiceInterviewQuestionOrder`)에
  `base:원본텍스트`/`custom:현재텍스트` 키로 저장(`buildQuestionEntries()`); 개인 질문 수정 시 순서 초기화.

### 면접 흐름

```
startPractice()
├── resetResult()
├── pickRandomQuestion()
└── runCurrentQuestion()
    ├── startRecording()
    ├── 답변 타이머 90·110·180초
    └── finishAnswer()
```

### 녹화와 권한

- `getInterviewStream()`은 영상+음성을 우선 요청하고, 실패하면 음성만 요청한다.
- `startRecording()`은 `MediaRecorder`, 카메라 미리보기, 음성 인식을 시작한다.
- `stopActiveRecording()`은 recognition, recorder, stream track을 모두 정리하고, `recorder`의
  비동기 `stop` 이벤트(= `showRecordingResult()` 실행 완료)까지 기다리는 Promise를 반환한다.
- `skipQuestion()`/`retryCurrentQuestion()`은 `stopActiveRecording()`을 반드시 `await`한 뒤
  `resetResult()`를 호출해야 건너뛴/재시도한 답변의 피드백이 먼저 렌더링된다.
- HTTPS가 아니면 카메라/마이크가 안 될 수 있으므로 `getMediaSupportMessage()` 메시지를 유지한다.
- 사용자 답변 영상/오디오는 서버에 업로드하지 않는다. 브라우저 메모리의 Object URL로만 재생한다.
- 진행 상태 팝업(`#envStatusPopover`, `position:fixed`)은 `checkEnvironment()` 호출 시(녹화 시작 때는 영상을 가리지 않게 열지 않음) `positionEnvPopover()`로 `#deviceCheckBtn` 옆에 열리고 `#envPopoverCloseBtn`(X)로만 닫힌다.

### 버튼 동작

| 버튼 | 동작 |
|---|---|
| 시작 / 새 질문 시작 | 페이지를 연 뒤 처음이면 응시 준비 창(유의사항 동의, 카메라·마이크 확인), 이후에는 새 질문 선택 후 바로 답변 녹화 시작 |
| 답변 제출 | 답변 중에 시작 버튼 자리에 나타남. 시간이 남아도 답변을 끝내고 결과 칸을 연다 |
| 질문 건너뛰기 | 현재 녹화/타이머를 멈추고 다른 질문으로 진행 |
| 다시 시작 | 답변 시작 후 20초 이내 또는 답변 종료 후, 같은 질문 재시작 |
| 응시 환경 체크 | 카메라/마이크 권한 및 미리보기 확인, `#envStatusPopover` 진행 상태 팝업 열림 |
| 질문 추가 | 기본/개인 질문을 개인 설정으로 추가·수정·삭제 |
| 무작위 | 예약 질문 해제 |
| 개선사항 | 개선사항 모달 열기 |
| 가이드 보기 | 면접 가이드 모달 열기 |
| 기록 보기 | 최근 답변 기록 모달 열기 |
| 삭제 | 해당 기록만 localStorage에서 삭제 |

### 결과와 기록

- 녹화 결과는 비디오 또는 오디오 플레이어에 표시한다.
- 음성 인식 텍스트는 `transcriptText`에 표시한다.
- `renderFeedback()`은 답변 분량, 말하기 속도, 핵심어 반영률, 습관어를 계산한다. AI API 없이
  텍스트 길이·속도·키워드 포함 여부만으로 규칙 기반 문구를 고른다.
- `질문 건너뛰기`/`다시 시작`으로 답변을 중단해도 그 시점까지의 피드백은 그대로 표시된다.
  `resetResult()`는 더 이상 `feedbackBox`를 지우지 않으며, 다음 답변이 끝나야 새 결과로 덮어써진다.
- `savePracticeRecord()`는 최근 5개 기록만 `practiceInterviewRecords` 키에 저장한다.
- `renderPracticeHistory()`는 `질문:` / `답변:` 라벨로 전체 답변을 표시한다.
- 기록의 `삭제` 버튼은 해당 항목만 localStorage에서 제거한다.

## DOM 주요 영역 (2026-11-07 검은 시험장 화면으로 개편)

`.exam-layout`이 위에 문제, 아래 왼쪽에 영상, 오른쪽에 시간을 배치한다(사용자 스케치 기준). 900px 미만은 문제→영상→시간 순서의 세로 배치다.

```
.top-bar           → 로고/제목, .top-actions(#phaseLabel, 연습 설정, 답변 결과, 가이드, 기록, 개선사항)
.question-box      → grid-area:question. #questionText
.stage-panel       → grid-area:stage. .stage(#cameraState 배지, #cameraPreview, #cameraPlaceholder)
.time-panel        → grid-area:time. #timerText, #progressBar, #timerTitle, #answerDurationToggle, .controls(#envStatusPopover 포함)
#settingsPanel     → 오른쪽에서 열리는 칸. 질문 예약(.order-panel)
#resultPanel       → 오른쪽에서 열리는 칸. #recordingState, 미디어 플레이어, transcript, feedback. 답변 종료 시 자동으로 열리고 답변 시작 시 닫힘
#examReadyModal    → 응시 준비 창. 마이크 확인과 동의가 있어야 시험 시작 가능(`hasPassedExamReady`, 저장하지 않음)
.sr-only           → #answerGuide/#practiceHistory/#historyCount 값만 유지, 가이드/기록 모달이 innerHTML 복사
#infoModal          → 가이드/기록/개선사항 모달
#confirmModal       → 개선사항 삭제/수정 완료 확인 모달
#improvementPromoModal → 개선사항 기능 안내 모달
```

### 개선사항

- 개선사항은 직접 만든 서버 `https://career-study-improvements.cf-jjakkung.workers.dev`(코드 `server/worker.js`)와 D1 `career-study-improvements`의 `improvement_items` 테이블에 저장한다.
- 서버를 고치면 `server/` 파일을 한글 없는 임시 폴더에 복사해 `npx wrangler deploy`한다(푸시만으로는 배포되지 않음). 새 사이트 주소를 쓰려면 `worker.js`의 `ALLOWED_ORIGINS`에 추가한다.
- 글쓰기는 같은 접속 주소당 20초에 한 번이다.
- 저장 실패는 오류로 알리고 글을 입력칸에 남긴다. 예전 임시 글(`practiceInterviewLocalImprovements`)은 모달을 열 때 서버로 올린다.
- 개선사항 모달이 열려 있고 탭이 보이는 동안 5초마다 목록을 새로고침한다.
- 개선사항 안내 모달의 `오늘 하루 안 보기` 날짜와 안내 버전은 `practiceInterviewImprovementPromoDismissDate`에 저장한다.
- `practiceInterviewImprovementAuthorId`를 `X-Author-Id`로 보내고, 서버가 글쓴이를 비교해 `mine`일 때만 수정/삭제 버튼을 표시한다.
- `수정 완료`는 서버가 비밀번호(Cloudflare 비밀 설정 `COMPLETE_PASSWORD`, 사본은 `~/.claude/secrets/.env`의 `CAREER_IMPROVEMENT_PASSWORD`)를 확인한 뒤 항목을 삭제한다.

## 스타일/레이아웃 주의사항

- 전체 색은 `style.css` 맨 위 변수로 관리하는 검은 화면이다. 창 높이가 낮으면 영상 크기를 줄여 한 화면에 맞춘다.
- 모든 화면에서 내용이 넘치면 일반 스크롤을 허용한다.
- 질문이 길면 `.long-question`, `.very-long-question`로 글자 크기를 낮춘다.
- `가이드 보기`와 `기록 보기`는 모달로 열며 기본 화면을 과도하게 차지하지 않게 한다.
- 카드 radius는 기존 8px 계열을 유지한다.

## 배포와 도메인

- GitHub 저장소: `https://github.com/kmathlove-wq/Practice-AI-Interview-for-Career-Teacher`
- 브랜치: `main`
- 사용자 지정 도메인: `진로스터디.kro.kr` (`CNAME`에는 `xn--2z1b65dvvmomhr2j.kro.kr` 저장)
- 카메라/마이크는 HTTPS가 필요하므로 GitHub Pages의 HTTPS 강제 적용 상태를 확인한다.

## 작업 규칙

### GitHub 업로드

- 사용자가 “업로드하지 마”라고 하지 않는 한 변경 후 GitHub에 커밋 + 푸시한다.
- 푸시는 처음부터 승인된 네트워크로 `env -u GITHUB_TOKEN git push`를 사용한다.
- 원격에 새 커밋이 있으면 `env -u GITHUB_TOKEN git pull --rebase origin main` 후 다시 푸시한다.
- 작업 후 `git status --short --branch`로 작업트리가 깨끗한지 확인한다.

### 검증

- 코드 변경 후 최소 `node --check main.js`를 실행한다.
- `main.js`/`style.css`를 바꾸면 `index.html`의 `?v=날짜-번호`를 올린다(안 올리면 브라우저 캐시로 옛 코드가 실행됨).
- HTML/CSS만 바꿔도 JS 참조를 건드렸다면 `node --check main.js`를 실행한다.
- 카메라/마이크 관련 변경은 HTTPS 또는 localhost 보안 컨텍스트를 고려한다.

### 절약 규칙

- 이미 읽은 파일은 다시 확인하지 않는다.
- 불필요한 도구 호출은 하지 않는다.
- 가능한 도구 호출은 동시에 실행한다.
- 긴 출력은 필요한 범위만 잘라 확인한다.
- 사용자가 이미 설명한 내용을 다시 반복하지 않는다.

### 기타 규칙

- 새로 알게된 프로젝트 지식은 필요할 때 `AGENTS.md` 또는 `CLAUDE.md`에 반영한다.
- `AGENTS.md`와 `CLAUDE.md`는 각각 200줄을 넘기지 않는다.
- 사용자 요청 없이 기존 변경사항을 되돌리지 않는다.
- 두 문서는 가능한 한 같은 목차와 같은 내용을 유지한다.
