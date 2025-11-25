export function getModuleHTML() {
  return `
    <h2>Local Storage</h2>
    <label>Key</label>
    <input id="store-key" placeholder="Key"/>
    <label style="margin-top:8px;display:block;">Value (string or JSON)</label>
    <textarea id="store-value" placeholder='e.g. "hello" or {"a":1}' rows="3"></textarea>
    <div style="margin-top:10px; display:flex; gap:10px; align-items:center;">
      <button id="store-save">Save</button>
      <button id="store-load">Load</button>
      <button id="store-delete">Delete</button>
    </div>
    <h3>Result</h3>
    <pre id="store-output" style="min-height:100px;white-space:pre-wrap;"></pre>
  `
}

export function initModule() {
  const keyInput = document.getElementById("store-key")
  const valueInput = document.getElementById("store-value")
  const output = document.getElementById("store-output")

  document.getElementById("store-save").onclick = () => {
    const key = keyInput.value.trim()
    if (!key) {
      output.textContent = "Key required."
      return
    }

    let val = valueInput.value.trim()
    try {
      if (val.startsWith("{") || val.startsWith("[")) val = JSON.stringify(JSON.parse(val))
    } catch {
      output.textContent = "Invalid JSON. Saving as string."
    }

    localStorage.setItem(key, val)
    output.textContent = "Saved."
  }

  document.getElementById("store-load").onclick = () => {
    const key = keyInput.value.trim()
    if (!key) {
      output.textContent = "Key required."
      return
    }

    const val = localStorage.getItem(key)
    if (val === null) {
      output.textContent = "Key not found."
      return
    }

    try {
      output.textContent = JSON.stringify(JSON.parse(val), null, 2)
    } catch {
      output.textContent = val
    }
  }

  document.getElementById("store-delete").onclick = () => {
    const key = keyInput.value.trim()
    if (!key) {
      output.textContent = "Key required."
      return
    }
    localStorage.removeItem(key)
    output.textContent = "Deleted."
  }
}
