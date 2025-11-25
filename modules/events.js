export function getModuleHTML() {
  return `
    <h2>Events Module</h2>
    <div id="event-box" style="padding:20px;border:1px solid #000;width:220px;display:flex;align-items:center;justify-content:center;">
      Hover / Click / Type Here
    </div>
    <h3>Event Log</h3>
    <pre id="event-log" style="min-height:150px;white-space:pre-wrap;"></pre>
  `
}

export function initModule() {
  const box = document.getElementById("event-box")
  const log = document.getElementById("event-log")

  function appendLog(msg) {
    log.textContent += msg + "\n"
    const lines = log.textContent.split("\n")
    if (lines.length > 50) log.textContent = lines.slice(-50).join("\n")
  }

  box.addEventListener("click", () => appendLog("Clicked"))
  box.addEventListener("mouseenter", () => appendLog("Mouse Enter"))
  box.addEventListener("mouseleave", () => appendLog("Mouse Leave"))
  box.addEventListener("keydown", e => appendLog("Key Pressed: " + e.key))
  box.setAttribute("tabindex", "0")
}
