# Project Memory

- `MediaRecorder`'s `stop` event fires asynchronously after `.stop()` is called. Any code path that
  calls `stopActiveRecording()` and then immediately mutates `recordingSessionId` or clears result
  UI (as `resetResult()` did) races ahead of `showRecordingResult()`/`renderFeedback()`, discarding
  results. Fix: make `stopActiveRecording()` return a Promise resolved by an additional `stop`
  listener registered after the existing one (listeners fire in registration order), and `await` it
  before resetting anything.
- On this machine, `which python3` resolves to the WindowsApps alias stub (fails silently, exit 49),
  not a real interpreter. Use the real install directly, e.g.
  `"/c/Users/kmath/AppData/Local/Programs/Python/Python312/python" -m http.server 8123`, when a
  local static server is needed to preview this app in a browser.
