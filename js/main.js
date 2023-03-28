let input = document.getElementById("todotask");
let btn = document.getElementById("addtodo");
let tasks = document.querySelector(".todotasks");
// let checkbox = document.querySelector(".checkbox");
// let icon = document.querySelector(".icon");
let moon = document.querySelector(".moon");
let sun = document.querySelector(".sun")

let li = document.querySelectorAll("li")


let arrayTasks = []
///check if the data is in local storage
if (localStorage.getItem("tasks")) {
    arrayTasks=JSON.parse(localStorage.getItem("tasks"))
}
///call the function whos responsible for the local storage 
getdatafromLocalStorage()
btn.addEventListener("click", function () {
    if (input.value !== "") {
        addtasktoArray(input.value);
        input.value = ""
    }
});
//click on task element
tasks.addEventListener("click", function (e) {
    //delete button
    if (e.target.classList.contains("cross")) {
        //Remove task from the page
        e.target.parentElement.parentElement.remove();
        //Remove task from the local storage
        deletewith(e.target.parentElement.parentElement.getAttribute("id"))
    }
    //check button
    if (e.target.classList.contains('check')) {
        if (e.target.checked) {
            let taskcss = e.target.parentElement.nextElementSibling;
            taskcss.style.textDecoration = "line-through"
            taskcss.style.color = " var(--input-field)";
        } else {
            let taskcss = e.target.parentElement.nextElementSibling;
            taskcss.style.textDecoration = "none";
            taskcss.style.color = "var(--text)";
            }
        //update the status
        updateStatustask(e.target.parentElement.parentElement.getAttribute("id"))
    }
})
function addtasktoArray(tasktext) {
    let task = {
        id: Date.now(),
        name: tasktext,
        completed: false,
        
    };
    arrayTasks.push(task)
    addelementtopagefrom(arrayTasks)
    addtaskstoLocalStorage(arrayTasks);
}
function addelementtopagefrom(arrayTasks) {
    tasks.innerHTML = ""
    arrayTasks.forEach((task) => {
        let divc = document.createElement("div");
        let divt=document.createElement("div")
        divc.className = "task-container";
        divc.setAttribute("id", task.id)
        divt.className = "task";
        if (task.completed) {
            divt.className="task done"
        }
        divt.appendChild(document.createTextNode(task.name));
        let checkbox = document.createElement("div")
        checkbox.className = "checkbox";
        let inputcheckbox = document.createElement("input")
        inputcheckbox.type = "checkbox"
        inputcheckbox.className="check"
        checkbox.appendChild(inputcheckbox)
        let icon = document.createElement("div")
        icon.className = "icon";
        let img = document.createElement("img")
        img.setAttribute("src", "/images/icon-cross.svg");
        img.setAttribute("class","cross")
        icon.appendChild(img)
        divc.appendChild(checkbox)
        divc.appendChild(divt)
        divc.appendChild(icon)

        tasks.appendChild(divc)
    })
}
///add data to local storage
function addtaskstoLocalStorage(arrayTasks) {
    window.localStorage.setItem("tasks",JSON.stringify(arrayTasks))
}
function getdatafromLocalStorage() {
    let data = window.localStorage.getItem("tasks")
    if (data) {
        let tasks = JSON.parse(data)
        addelementtopagefrom(tasks)
    }
}
///delet from the local storage
function deletewith(taskid) {
    arrayTasks = arrayTasks.filter((task) => task.id != taskid)
    addtaskstoLocalStorage(arrayTasks)
    
}
///update the status
function updateStatustask(taskid) {
    for (let i = 0; i < arrayTasks.length; i++){
        if (arrayTasks[i].id == taskid) {
            arrayTasks[i].completed == false
            ? arrayTasks[i].completed = true
            : arrayTasks[i].completed = false;  
        }
    }
    addtaskstoLocalStorage(arrayTasks)
}


///darktheme
moon.addEventListener("click", function () {
    document.body.classList.add("DarkTheme");
    moon.style.display = "none";
    sun.style.display="block"
})
sun.addEventListener("click", function () {
    document.body.classList.remove("DarkTheme");
    moon.style.display = "block";
    sun.style.display = "none";
})