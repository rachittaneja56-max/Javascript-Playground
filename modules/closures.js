export function getModuleHTML() {
  return `
    <h2>Closures Demo</h2>
    <p><strong>Closure Function:</strong></p>
    <pre id="closure-code" style="background:#f3f4f6;padding:10px;border-radius:6px;">
function outer(x) {
  return function inner(y) {
    return x + y;
  };
}
    </pre>
    <label>Enter x</label>
    <input id="closure-x" placeholder="Value for x"/>
    <label style="margin-top:8px;display:block;">Enter y</label>
    <input id="closure-y" placeholder="Value for y"/>
    <div style="margin-top:10px;">
      <button id="closure-run">Run</button>
    </div>
    <h3>Output</h3>
    <pre id="closure-output" style="min-height:120px;white-space:pre-wrap;"></pre>
  `
}

export function initModule() {
  const xInput = document.getElementById("closure-x")
  const yInput = document.getElementById("closure-y")
  const output = document.getElementById("closure-output")

  document.getElementById("closure-run").onclick = () => {
    const xStr = xInput.value.trim()
    const yStr = yInput.value.trim()
    const x = Number(xStr)
    const y = Number(yStr)

    if (xStr === "" || isNaN(x)) {
      output.textContent = "Enter a valid x"
      return
    }
    if (yStr === "" || isNaN(y)) {
      output.textContent = "Enter a valid y"
      return
    }

    function outer(x) {
      return function inner(y) {
        return x + y
      }
    }

    const innerFn = outer(x)
    const result = innerFn(y)

    output.textContent = 
      "outer(" + x + ")\n→ returns inner(y)\n\n" +
      "inner(" + y + ")\n→ " + result
  }
}
