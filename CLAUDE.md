# Practice AI Interview for Career Teacher — CLAUDE.md

## 프로젝트 개요

진로전담교사 면접을 연습하기 위한 정적 웹앱이다. 별도 빌드 도구 없이 `index.html`, `style.css`, `main.js`, `면접예상질문.txt`만으로 동작한다.
사용자는 예상 질문을 무작위 또는 예약 선택으로 받고, 준비 시간 10초 후 영상/음성 답변을 1분 30초 동안 녹화한다.
답변 종료 후 녹화/녹음 결과, 음성 인식 텍스트, 간단 피드백, 최근 기록을 확인할 수 있다.

## 파일 구조

```
Practice-AI-Interview-for-Career-Teacher/
├── index.html                    # 앱 DOM, 모달, 버튼, 비디오/오디오 영역
├── main.js                       # 질문 로딩, 타이머, 녹화, 음성 인식, 기록 로직
├── style.css                     # 반응형 레이아웃과 면접 화면 스타일
├── 면접예상질문.txt              # 빈 줄로 구분된 예상 질문 원본
├── CNAME                         # GitHub Pages 사용자 지정 도메인
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

- **HTML/CSS/Vanilla JavaScript** — 프레임워크와 빌드 도구 없음
- **MediaRecorder API** — 영상/음성 녹화
- **getUserMedia API** — 카메라/마이크 권한 요청
- **Web Speech API** — 한국어 음성 인식(`ko-KR`), Chrome/Edge 중심 지원
- **localStorage** — 최근 면접 기록 5개 저장
- **GitHub Pages** — 정적 배포

## 주요 상수

| 상수 | 값 | 설명 |
|---|---:|---|
| `PREP_SECONDS` | 10 | 질문 확인 후 준비 시간 |
| `ANSWER_SECONDS` | 90 | 답변 녹화 시간 |

## main.js 구조

### 초기화

`init()`에서 질문 선택 드롭다운, 기록 렌더링, 버튼 이벤트, 모달 이벤트, 종료 시 미디어 정리를 연결한다.
질문은 먼저 `FALLBACK_QUESTIONS`를 사용하고, 가능하면 `면접예상질문.txt`를 `fetch`하여 교체한다.

### 질문 로딩과 선택

- `parseQuestions(text)`는 빈 줄 기준으로 질문을 나누고 줄바꿈을 공백으로 정리한다.
- `renderQuestionPicker()`는 질문 드롭다운 옵션을 만든다.
- `reserveSelectedQuestion()`은 선택한 질문을 다음 질문으로 예약한다.
- `clearReservedQuestion()`은 예약을 해제하고 다음 질문을 무작위로 돌린다.
- `pickRandomQuestion()`은 예약 질문이 있으면 우선 사용하고, 없으면 무작위 질문을 선택한다.
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

### 녹화와 음성 인식

- `getInterviewStream()`은 카메라+마이크를 먼저 요청하고 실패하면 마이크만 요청한다.
- `startRecording()`은 `MediaRecorder`를 시작하고 카메라 미리보기와 음성 인식을 함께 시작한다.
- `startSpeechRecognition()`은 `SpeechRecognition` 또는 `webkitSpeechRecognition`을 사용한다.
- `showRecordingResult()`는 결과를 `videoPlayer` 또는 `audioPlayer`에 표시하고 피드백/기록을 갱신한다.
- HTTPS가 아니면 `getMediaSupportMessage()`가 `https://` 또는 `localhost` 필요 안내를 보여준다.

### 버튼 동작

| 버튼 | 동작 |
|---|---|
| 시작 / 새 질문 시작 | 새 질문 선택 후 준비 타이머 시작 |
| 질문 건너뛰기 | 현재 녹화/타이머를 멈추고 다른 질문으로 진행 |
| 다시 시작 | 답변 시작 후 20초가 지나기 전까지만 같은 질문 재시작 |
| 응시 환경 체크 | 카메라/마이크 권한 및 미리보기 확인 |
| 무작위 | 예약 질문 해제 |
| 가이드 보기 | 면접 가이드 모달 열기 |
| 기록 보기 | 최근 답변 기록 모달 열기 |
| 삭제 | 해당 기록만 localStorage에서 삭제 |

### 기록과 피드백

- `savePracticeRecord()`는 최근 기록을 5개까지 `practiceInterviewRecords` 키에 저장한다.
- `renderPracticeHistory()`는 `질문:` / `답변:` 라벨로 전체 답변을 표시한다.
- `renderFeedback()`은 답변 분량, 말하기 속도, 핵심어 반영률, 습관어 추정을 계산한다.

## 배포와 도메인

- GitHub 저장소: `https://github.com/kmathlove-wq/Practice-AI-Interview-for-Career-Teacher`
- 브랜치: `main`
- 사용자 지정 도메인: `xn--2z1b65dvvmomhr2j.kro.kr` (`진로스터디.kro.kr`)
- 카메라/마이크는 HTTPS가 필요하므로 GitHub Pages의 HTTPS 강제 적용 상태를 확인한다.

## 주의사항

- `면접예상질문.txt`는 정적 서버 또는 GitHub Pages에서 열어야 `fetch`가 안정적으로 동작한다.
- 사용자 답변 영상/오디오는 서버에 업로드하지 않는다. 현재 브라우저 메모리의 Object URL로만 재생한다.
- 기록은 사용자 브라우저의 localStorage에만 저장되므로 사용자/기기/브라우저별로 분리된다.
- Web Speech API는 브라우저 지원 차이가 크다. 음성 인식이 실패해도 녹화 파일은 확인 가능해야 한다.
- `GITHUB_TOKEN`이 invalid할 수 있으므로 푸시할 때 `env -u GITHUB_TOKEN git push`가 필요할 수 있다.

## 작업 규칙

- 사용자가 “업로드하지 마”라고 하지 않는 한 변경 후 GitHub에 커밋 + 푸시한다.
- 새로 알게 된 프로젝트 규칙이나 배포 이슈는 이 파일에도 반영한다.
- 이 파일은 200줄을 넘기지 않는다.
