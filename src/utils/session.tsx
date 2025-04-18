export function getSessionId() {
  let sessionId = localStorage.getItem("user-session-id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("user-session-id", sessionId);
  }

  return sessionId;
}
