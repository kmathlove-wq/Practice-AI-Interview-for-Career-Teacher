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
- The `:root` CSS variables (--primary/--text/--muted/--line/--panel/--danger/--shadow) are used
  consistently across modals, forms, and result panels, so a full visual reskin mostly needs new
  layout/component rules, not per-rule color edits — the variables already propagate.
- When repurposing `grid-template-areas` on `.practice-panel`, a narrow guide/result column breaks
  its `.result-header` (title + 2-3 pill buttons) onto vertical single-character lines unless
  `.answer-result .result-header{flex-direction:column}` is set for that width tier — verified by
  screenshotting the 900-1180px tier specifically, not just the widest desktop width.
- This codebase has no stable question IDs; base questions are keyed by their original (pre-edit)
  text and custom questions by their current text. The new question-order feature reuses that same
  convention with `base:`/`custom:` key prefixes to avoid collisions between the two key spaces.
