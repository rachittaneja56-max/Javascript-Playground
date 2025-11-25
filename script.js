const container = document.getElementById("module-container")
const sidebarItems = document.querySelectorAll("#sidebar li")

let currentModule = null

sidebarItems.forEach(item => {
  item.addEventListener("click", async () => {
    sidebarItems.forEach(i => i.classList.remove("active"))
    item.classList.add("active")
    const moduleName = item.dataset.module
    await loadModule(moduleName)
  })
})

async function loadModule(name) {
  container.innerHTML = "Loading..."
  try {
    const module = await import(`./modules/${name}.js`)
    container.innerHTML = module.getModuleHTML()
    module.initModule()
  } catch (err) {
    container.innerHTML = "Failed to load module."
    console.error(err)
  }
}
