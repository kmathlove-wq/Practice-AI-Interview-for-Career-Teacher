# Practice AI Interview for Career Teacher — CLAUDE.md

## 프로젝트 개요

진로전담교사 면접을 연습하기 위한 정적 웹앱이다. 별도 빌드 도구 없이 `index.html`, `style.css`, `main.js`, `면접예상질문.txt`만으로 동작한다.
사용자는 예상 질문을 무작위 또는 예약 선택으로 받고, 준비 시간 10초 후 영상/음성 답변을 1분 30초 동안 녹화한다.
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
- GitHub Pages

## 주요 상수

| 상수 | 값 | 설명 |
|---|---:|---|
| `PREP_SECONDS` | 10 | 질문 확인 후 준비 시간 |
| `ANSWER_SECONDS` | 90 | 답변 녹화 시간 |

타이머 시간은 사용자 요청 없이 변경하지 않는다.

## 핵심 동작

### 질문

- `FALLBACK_QUESTIONS`를 기본값으로 둔다.
- `loadQuestionsFromTextFile()`이 `면접예상질문.txt`를 가져오면 파일 내용으로 질문 목록을 교체한다.
- 질문 파일은 빈 줄 기준으로 구분하고, 줄바꿈은 공백으로 정리한다.
- 드롭다운에서 질문을 고르면 즉시 다음 질문으로 예약된다.
- `무작위` 버튼은 예약 질문을 해제한다.
- `setQuestionText()`는 질문 길이에 따라 `long-question`, `very-long-question` 클래스를 붙여 글자 크기를 조정한다.

### 면접 흐름

```
startPractice()
├── resetResult()
├── pickRandomQuestion()
└── runCurrentQuestion()
    ├── 준비 타이머 10초
    ├── startRecording()
    ├── 답변 타이머 90초
    └── finishAnswer()
```

### 녹화와 권한

- `getInterviewStream()`은 영상+음성을 우선 요청하고, 실패하면 음성만 요청한다.
- `startRecording()`은 `MediaRecorder`, 카메라 미리보기, 음성 인식을 시작한다.
- `stopActiveRecording()`은 recognition, recorder, stream track을 모두 정리한다.
- HTTPS가 아니면 카메라/마이크가 안 될 수 있으므로 `getMediaSupportMessage()` 메시지를 유지한다.
- 사용자 답변 영상/오디오는 서버에 업로드하지 않는다. 브라우저 메모리의 Object URL로만 재생한다.

### 버튼 동작

| 버튼 | 동작 |
|---|---|
| 시작 / 새 질문 시작 | 새 질문 선택 후 준비 타이머 시작 |
| 질문 건너뛰기 | 현재 녹화/타이머를 멈추고 다른 질문으로 진행 |
| 다시 시작 | 준비시간 제외, 답변 시작 후 20초가 지나기 전까지만 같은 질문 재시작 |
| 응시 환경 체크 | 카메라/마이크 권한 및 미리보기 확인 |
| 무작위 | 예약 질문 해제 |
| 가이드 보기 | 면접 가이드 모달 열기 |
| 기록 보기 | 최근 답변 기록 모달 열기 |
| 삭제 | 해당 기록만 localStorage에서 삭제 |

### 결과와 기록

- 녹화 결과는 비디오 또는 오디오 플레이어에 표시한다.
- 음성 인식 텍스트는 `transcriptText`에 표시한다.
- `renderFeedback()`은 답변 분량, 말하기 속도, 핵심어 반영률, 습관어를 계산한다.
- `savePracticeRecord()`는 최근 5개 기록만 `practiceInterviewRecords` 키에 저장한다.
- `renderPracticeHistory()`는 `질문:` / `답변:` 라벨로 전체 답변을 표시한다.
- 기록의 `삭제` 버튼은 해당 항목만 localStorage에서 제거한다.

## DOM 주요 영역

```
.top-bar            → 로고/제목/상태 표시
.question-box       → #questionText
.timer-area         → #timerTitle, #timerText, #progressBar
.controls           → 시작, 건너뛰기, 다시 시작, 환경 체크
.video-panel        → #cameraPreview, #environmentList
.order-panel        → #questionPicker, #randomQuestionBtn
.answer-result      → 결과 버튼, 미디어 플레이어, transcript, feedback
#infoModal          → 가이드/기록 모달
```

## 스타일/레이아웃 주의사항

- 데스크톱은 `@media (min-width: 900px)`에서 한 화면형 면접 대시보드로 고정한다.
- 모바일/좁은 화면은 일반 스크롤을 허용한다.
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
