# Project Memory

- `MediaRecorder`'s `stop` event fires asynchronously after `.stop()` is called. Any code path that
  calls `stopActiveRecording()` and then immediately mutates `recordingSessionId` or clears result
  UI (as `resetResult()` did) races ahead of `showRecordingResult()`/`renderFeedback()`, discarding
  results. Fix: make `stopActiveRecording()` return a Promise resolved by an additional `stop`
  listener registered after the existing one (listeners fire in registration order), and `await` it
  before resetting anything.
