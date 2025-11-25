export function getModuleHTML() {
  return `
    <h2>Async / Fetch Demo</h2>
    <div style="margin-bottom:10px;">
      <button id="fetch-btn">Get Random User</button>
    </div>
    <pre id="async-output" style="min-height:150px;white-space:pre-wrap;"></pre>
  `
}

export function initModule() {
  const btn = document.getElementById("fetch-btn")
  const output = document.getElementById("async-output")

  btn.onclick = async () => {
    output.textContent = "Loading..."
    const res = await fetch("https://randomuser.me/api/")
    const data = await res.json()
    output.textContent = JSON.stringify(data.results[0], null, 2)
  }
}
