export function getModuleHTML() {
  return `
    <h2>Prototype / OOP Playground</h2>
    <label>Name</label>
    <input id="oop-name" placeholder="Name"/>
    <label style="margin-top:8px;display:block;">Age</label>
    <input id="oop-age" placeholder="Age"/>
    <div style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;">
      <button id="oop-create">Create Person</button>
      <button id="oop-show">Show Object</button>
      <button id="oop-greet">Call greet()</button>
      <button id="oop-birthday">Call birthday()</button>
    </div>
    <h3 style="margin-top:18px;">Inheritance Demo</h3>
    <label>Student ID</label>
    <input id="oop-sid" placeholder="Student ID"/>
    <div style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;">
      <button id="oop-create-student">Create Student</button>
      <button id="oop-show-student">Show Student</button>
      <button id="oop-study">Call study()</button>
    </div>
    <h3>Prototype Chain</h3>
    <pre id="oop-proto" style="min-height:100px;white-space:pre-wrap;"></pre>
    <h3>Output</h3>
    <pre id="oop-output" style="min-height:140px;white-space:pre-wrap;"></pre>
  `
}

export function initModule() {
  const nameInput = document.getElementById("oop-name")
  const ageInput = document.getElementById("oop-age")
  const sidInput = document.getElementById("oop-sid")
  const output = document.getElementById("oop-output")
  const protoOut = document.getElementById("oop-proto")

  let personObj = null
  let studentObj = null

  function Person(name, age) {
    this.name = name
    this.age = age
  }
  Person.prototype.greet = function() {
    return "Hello, I am " + this.name
  }
  Person.prototype.birthday = function() {
    this.age++
    return this.name + " is now " + this.age
  }

  function Student(name, age, id) {
    Person.call(this, name, age)
    this.id = id
  }
  Student.prototype = Object.create(Person.prototype)
  Student.prototype.constructor = Student
  Student.prototype.study = function() {
    return this.name + " is studying."
  }

  function showProto(obj) {
    let chain = []
    let cur = obj
    while(cur) {
      chain.push(cur.constructor ? cur.constructor.name : "Object")
      cur = Object.getPrototypeOf(cur)
    }
    protoOut.textContent = chain.join(" → ")
  }

  document.getElementById("oop-create").onclick = () => {
    const n = nameInput.value.trim()
    const a = Number(ageInput.value.trim())
    if (!n || isNaN(a)) {
      output.textContent = "Enter valid name and age"
      return
    }
    personObj = new Person(n, a)
    output.textContent = "Person created."
    showProto(personObj)
  }

  document.getElementById("oop-show").onclick = () => {
    if (!personObj) {
      output.textContent = "Create Person first."
      return
    }
    output.textContent = JSON.stringify(personObj,null,2)
    showProto(personObj)
  }

  document.getElementById("oop-greet").onclick = () => {
    if (!personObj) {
      output.textContent = "Create Person first."
      return
    }
    output.textContent = personObj.greet()
    showProto(personObj)
  }

  document.getElementById("oop-birthday").onclick = () => {
    if (!personObj) {
      output.textContent = "Create Person first."
      return
    }
    output.textContent = personObj.birthday()
    showProto(personObj)
  }

  document.getElementById("oop-create-student").onclick = () => {
    const n = nameInput.value.trim()
    const a = Number(ageInput.value.trim())
    const id = sidInput.value.trim()
    if (!n || isNaN(a) || !id) {
      output.textContent = "Enter valid name, age, and student ID"
      return
    }
    studentObj = new Student(n, a, id)
    output.textContent = "Student created."
    showProto(studentObj)
  }

  document.getElementById("oop-show-student").onclick = () => {
    if (!studentObj) {
      output.textContent = "Create Student first."
      return
    }
    output.textContent = JSON.stringify(studentObj,null,2)
    showProto(studentObj)
  }

  document.getElementById("oop-study").onclick = () => {
    if (!studentObj) {
      output.textContent = "Create Student first."
      return
    }
    output.textContent = studentObj.study()
    showProto(studentObj)
  }
}
