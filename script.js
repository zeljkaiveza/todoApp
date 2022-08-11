const addLogo = document.querySelector(".addLogo")
const listItems = document.querySelector(".listItems")
const moduleFooter = document.querySelector(".moduleFooter")
const input = document.querySelector(".createNewInput")
const showAllBtn = document.querySelector("#showAllBtn")
const showActiveBtn = document.querySelector("#showActiveBtn")
const showCompletedBtn = document.querySelector("#showCompletedBtn")
const clearBtn = document.querySelector("#clearBtn")
const footerBtn = document.querySelectorAll(".footerBtn")
const message = document.querySelector(".message")
const body = document.querySelector("body")
const createNew = document.querySelector(".createNew")
const main = document.querySelector("main")
const header = document.querySelector("header")
const toggleTheme = document.querySelector(".switchThemeLogo")
let lastClickedFooterBtn;
let items = []
let currentTheme;
let itemTextHtml = []



function firstLoad(){
    if (localStorage.items == null){
        localStorage.setItem("items", JSON.stringify(items))
        renderedItems = items
    }else{
        items = JSON.parse(localStorage.getItem("items"))
        renderedItems = items
    }
    lastClickedFooterBtn = showAllBtn.id
    createItems()
    activeFooterButton()
}
function createItems(){
    shouldFooterBeVisible()
    if (items.length === 0 && lastClickedFooterBtn !== showAllBtn.id) firstLoad()
    listItems.innerHTML = ""
    renderedItems.forEach((e, i) => {
        let item = document.createElement("div")
        let doneBtn = document.createElement("button")
        doneBtn.addEventListener("click", ()=>{
            if(lastClickedFooterBtn === showAllBtn.id){
                e.active = !e.active
                e.completed = !e.completed
                localStorage.setItem("items", JSON.stringify(items))
                firstLoad()
            }else if(lastClickedFooterBtn === showActiveBtn.id){
                e.active = !e.active
                e.completed = !e.completed
                localStorage.setItem("items", JSON.stringify(items))
                setTimeout(showActiveItems, 100)
            }else if(lastClickedFooterBtn === showCompletedBtn.id){
                e.active = !e.active
                e.completed = !e.completed
                localStorage.setItem("items", JSON.stringify(items))
                setTimeout(showCompletedItems, 100)
            }
        })
        if(e.completed === true){
            doneBtn.classList.toggle("checkedDoneBtn")
        }
        let itemText = document.createElement("input")
        let deleteBtn = document.createElement("button")

        item.classList.add("item")
        doneBtn.classList.add("doneBtn")
        doneBtn.setAttribute("title", "Click to mark this item as completed")
        itemText.classList.add("itemText")
        itemText.value = e.text
        itemText.addEventListener("change", () =>{
                e.text = itemText.value
                console.log(items)
                localStorage.setItem("items", JSON.stringify(items))
                console.log(localStorage.items)
                createItems()
        })
        deleteBtn.classList.add("deleteBtn")
        deleteBtn.setAttribute("title", "Click to delete this item")
        deleteBtn.innerText = "X"
        deleteBtn.addEventListener("click", ()=>{
            if(lastClickedFooterBtn === showAllBtn.id){
                items.splice(i, 1)
                localStorage.setItem("items", JSON.stringify(items))
                setTimeout(firstLoad, 100)
            }else if(lastClickedFooterBtn === showActiveBtn.id){
                items.splice(i, 1)
                localStorage.setItem("items", JSON.stringify(items))
                setTimeout(showActiveItems, 100)
            }else if(lastClickedFooterBtn === showCompletedBtn.id){
                items.splice(i, 1)
                localStorage.setItem("items", JSON.stringify(items))
                setTimeout(showCompletedItems, 100)
            }
        })
        if(JSON.parse(localStorage.theme) === false){
            itemText.classList.add("darkItemText")
            if(e.completed) doneBtn.classList.add("darkCheckedDoneBtn")
            doneBtn.style.borderColor = "hsl(236, 33%, 92%)"
            deleteBtn.classList.add("darkDeleteBtn")
         }

        item.append(doneBtn)
        item.append(itemText)
        item.append(deleteBtn)
        listItems.append(item)
    });
}
function addNewItemToTheList(event){
    shouldFooterBeVisible()
    if(input.value !== ""){
        items.push({
            text: input.value,
            active: true,
            completed: false
        })
        localStorage.setItem("items", JSON.stringify(items))
        
        listItems.innerHTML = ""
        if(lastClickedFooterBtn === showAllBtn.id) firstLoad()
        else if(lastClickedFooterBtn === showActiveBtn.id) showActiveItems()
        else if(lastClickedFooterBtn === showCompletedBtn.id) showCompletedItems()
        input.value = ""
    }
}
function shouldFooterBeVisible(){
    if (items.length > 0){
        moduleFooter.style.visibility = "visible"
        if(renderedItems.length === 0 && lastClickedFooterBtn !== showAllBtn.id) moduleFooter.style.borderRadius = "5px 5px 5px 5px"
        else moduleFooter.style.borderRadius = "0px 0px 5px 5px"
    }else{
        moduleFooter.style.visibility = "hidden"
    }
}
function activeFooterButton(){
    footerBtn.forEach(e => {
        if(e.id === lastClickedFooterBtn) e.style.color = "#2A56A5"
        else e.style.color = "hwb(237 58% 35%)"
    })
}
function showActiveItems(){
    lastClickedFooterBtn = showActiveBtn.id
    activeFooterButton()
    if(items.some(e => e.active === true)){
        renderedItems = items.filter(e => e.active === true)
        createItems()
    }else{
        renderedItems = []
        createItems()
    }
}
function showCompletedItems(){
    lastClickedFooterBtn = showCompletedBtn.id
    activeFooterButton()
    if(items.some(e => e.completed === true)){
        renderedItems = items.filter(e => e.completed === true)
        createItems()
    }else{
        renderedItems = []
        createItems()
    }
}
function clearCompleted(){
    if(items.every(e => e.completed === false)){
        message.style.visibility = "visible"
        setTimeout(()=> message.style.visibility = "hidden", 1500)
    }else{
        items = JSON.parse(localStorage.items).filter(e => e.active === true)
        localStorage.setItem("items", JSON.stringify(items))
        renderedItems = items
        firstLoad()
    }
}
function changeTheme(){
    if(JSON.parse(localStorage.theme)){
        toggleTheme.setAttribute("src", "./Assets/icon-moon.svg")
    }else{
        toggleTheme.setAttribute("src", "./Assets/icon-sun.svg")
    }
    main.classList.toggle("darkMain")
    header.classList.toggle("darkHeader")
    moduleFooter.classList.toggle("darkModuleFooter")
    createNew.classList.toggle("darkCreateNew")
    listItems.classList.toggle("darkListItems")
    toggleTheme.classList.toggle("darkSwitchThemeLogo")
    body.classList.toggle("darkBody")
    input.classList.toggle("darkInput")
    addLogo.classList.toggle("addLogoDark")
    createItems()
}

window.addEventListener("load", firstLoad)
addLogo.addEventListener("click", addNewItemToTheList)
showAllBtn.addEventListener("click", firstLoad)
showActiveBtn.addEventListener("click", showActiveItems)
showCompletedBtn.addEventListener("click", showCompletedItems)
clearBtn.addEventListener("click", clearCompleted)
toggleTheme.addEventListener("click", ()=>{
    currentTheme = !JSON.parse(localStorage.theme)
    localStorage.setItem("theme", currentTheme)
    changeTheme()
})
input.addEventListener("keyup", (event) =>{
    if (event.keyCode === 13){
        addNewItemToTheList()
    }
})

if(localStorage.theme == null){
    localStorage.setItem("theme", true)
}else{
    if(JSON.parse(localStorage.theme) === false){
        changeTheme()
    }
}