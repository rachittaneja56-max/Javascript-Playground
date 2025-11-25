export function getModuleHTML() {
  return `
    <h2>DOM Module</h2>
    <label>Enter item</label>
    <input id="dom-input" placeholder="Enter item"/>
    <div style="margin-top:10px; display:flex; align-items:center; gap:10px;">
      <button id="dom-add">Add</button>
      <button id="dom-remove">Remove Last</button>
      <button id="dom-clear">Clear</button>
      <span id="dom-count" style="font-weight:bold;">Count: 0</span>
    </div>
    <h3>List</h3>
    <ul id="dom-list"></ul>
  `
}

export function initModule() {
  const input = document.getElementById("dom-input")
  const list = document.getElementById("dom-list")
  const countEl = document.getElementById("dom-count")

  function updateCount() {
    countEl.textContent = "Count: " + list.children.length
  }

  function createListItem(text) {
    const li = document.createElement("li")
    li.textContent = text
    li.style.cursor = "pointer"
    li.addEventListener("click", () => {
      li.style.textDecoration = li.style.textDecoration === "line-through" ? "none" : "line-through"
    })
    li.addEventListener("dblclick", () => {
      const newText = prompt("Edit item:", li.textContent)
      if (newText !== null && newText.trim() !== "") li.textContent = newText
    })
    return li
  }

  document.getElementById("dom-add").onclick = () => {
    const val = input.value.trim()
    if (!val) return
    const li = createListItem(val)
    list.appendChild(li)
    input.value = ""
    updateCount()
  }

  document.getElementById("dom-remove").onclick = () => {
    if (list.lastChild) list.lastChild.remove()
    updateCount()
  }

  document.getElementById("dom-clear").onclick = () => {
    list.innerHTML = ""
    updateCount()
  }

  updateCount()
}
