export function getModuleHTML() {
  return `
    <h2>Algorithms Module</h2>
    <label>Input</label>
    <input id="algo-input" placeholder='e.g. "1,2,3" or [1,2,3] or hello'/>
    <label style="margin-top:10px;display:block;">Select Problem</label>
    <select id="algo-select">
      <option value="reverseString">Reverse String</option>
      <option value="isPalindrome">Check Palindrome</option>
      <option value="sumArray">Sum Array</option>
      <option value="maxInArray">Max in Array</option>
      <option value="uniqueElements">Unique Elements</option>
      <option value="factorial">Factorial</option>
    </select>
    <div style="margin-top:12px;">
      <button id="run-algo">Run</button>
    </div>
    <h3>Output</h3>
    <pre id="algo-output" style="min-height:120px;white-space:pre-wrap;"></pre>
  `
}

export function initModule() {
  const runBtn = document.getElementById("run-algo")
  const output = document.getElementById("algo-output")

  function parseArray(input) {
    let arr = input.trim()
    if (!arr) return []
    if (arr.startsWith("[") && arr.endsWith("]")) arr = arr.slice(1,-1)
    return arr.split(",").map(s => Number(s.trim())).filter(n => !isNaN(n))
  }

  function reverseString(str) {
    return typeof str !== "string" ? "Invalid input" : str.split("").reverse().join("")
  }

  function isPalindrome(str) {
    if (typeof str !== "string" || !str.trim()) return "Enter a valid string"
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, "")
    if (!clean) return "String has no alphanumeric characters"
    return clean === clean.split("").reverse().join("") ? "Palindrome" : "Not a palindrome"
  }

  function factorial(n) {
    const num = Number(n)
    if (isNaN(num)) return "Not a number"
    if (!Number.isInteger(num)) return "Must be an integer"
    if (num < 0) return "Cannot factorial negative"
    if (num > 170) return "Too large (Infinity risk)"
    let res = 1
    for (let i = 1; i <= num; i++) res *= i
    return res
  }

  function sumArray(input) {
    const nums = parseArray(input)
    return nums.reduce((a,b)=>a+b,0)
  }

  function maxInArray(input) {
    const nums = parseArray(input)
    return nums.length ? Math.max(...nums) : "Array is empty"
  }

  function uniqueElements(input) {
    const nums = parseArray(input)
    return [...new Set(nums)].join(", ")
  }

  runBtn.onclick = () => {
    const input = document.getElementById("algo-input").value.trim()
    const problem = document.getElementById("algo-select").value
    let result

    switch(problem) {
      case "reverseString": result = reverseString(input); break
      case "isPalindrome": result = isPalindrome(input); break
      case "factorial": result = factorial(input); break
      case "sumArray": result = sumArray(input); break
      case "maxInArray": result = maxInArray(input); break
      case "uniqueElements": result = uniqueElements(input); break
      default: result = "Unknown algorithm"
    }

    output.textContent = typeof result === "object" ? JSON.stringify(result,null,2) : String(result)
  }
}
