function loadTodos(){

    const todos = JSON.parse(localStorage.getItem("todos")) || {"todoList": []};
    return todos;
}

function refreshTodos(todos){
    localStorage.setItem("todos", JSON.stringify(todos));

}
function addTodoLocalStorage(todoText) {

    const todos = loadTodos();
    const len = todos.todoList.length;
    const newTodo = {
        text: todoText,
        isCompleted: false,
        id: len,
    }
    todos.todoList.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos))
    return newTodo
}
function getTodoButtons(){
    const wrapper = document.createElement("div");
    wrapper.classList.add("todoButtons");


    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");


    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete"
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", executeDeleteBtn);

    const completedBtn = document.createElement("button");
    completedBtn.textContent = "Completed"
    completedBtn.classList.add("completeBtn");
    completedBtn.addEventListener("click", executeCompleteBtn)

    wrapper.appendChild(editBtn);
    wrapper.appendChild(deleteBtn);
    wrapper.appendChild(completedBtn);

    return wrapper;
}
function appendTodoInHtml(todo){

    const todoList = document.getElementById("todoList");

    const todoItem = document.createElement("li");
    todoItem.setAttribute("data-id", todo.id)
    todoItem.classList.add("todoItem");
    if(todo.isCompleted ){
        todoItem.classList.add("completed");
    }

    const textDiv = document.createElement("div");
    textDiv.textContent = todo.text
    

    todoItem.appendChild(textDiv);

    const buttons = getTodoButtons()
    todoItem.appendChild(buttons)

    todoList.appendChild(todoItem)
}

function executeFilterAction(event){
    const todoList = document.getElementById("todoList");
    const element = event.target;
    const value =  element.getAttribute("data-filter");
    todoList.innerHTML = ''
    const todos = loadTodos();
    
    if(value == "all"){
        todos.todoList.forEach(element => {
            appendTodoInHtml(element)
        });
    }else if (value == "pending"){
        todos.todoList.forEach(element => {
            if(element.isCompleted != true)
            appendTodoInHtml(element)
        });
    }else{
        todos.todoList.forEach(element => {
            if(element.isCompleted == true)
            appendTodoInHtml(element)
        });
    }
}

function executeCompleteBtn(event){
    const marktodo = event.target.parentElement.parentElement;
    
    const todoId = marktodo.getAttribute("data-id");

    const todos = loadTodos();
    

    todos.todoList.forEach(todo => {
        if(todo.id == todoId){
            todo.isCompleted = !todo.isCompleted;
            if(todo.isCompleted){
                marktodo.classList.add("completed")
            }else{
                marktodo.classList.remove("completed")
            }
        }
    })
    refreshTodos(todos)
 
    
}

function executeDeleteBtn(event){
    const marktodo = event.target.parentElement.parentElement;
    
    const todoId = marktodo.getAttribute("data-id");

    const todos = loadTodos();

    todos.todoList = todos.todoList.filter(todo => todo.id != todoId);
    refreshTodos(todos)
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = ''
    todos.todoList.forEach(element => {
        appendTodoInHtml(element)
    });


}

document.addEventListener("DOMContentLoaded",() => {
    

    const todoInput = document.getElementById("todoInput");
    const submitButton = document.getElementById("addTodo");

    const filterBtns = document.getElementsByClassName("filterBtn");

    for(btn of filterBtns)
    {
        btn.addEventListener("click", executeFilterAction);
    }

    

    todoInput.addEventListener("change", (event) => {
        // This callback method is fired everytime there is a change in input tag.
        event.target.value = event.target.value.trim();
    })

    submitButton.addEventListener("click", (event) => {

        const todoText = todoInput.value;

        if(todoText == ''){
            alert("Please write something for the todo")
        }else{
            const newTodo = addTodoLocalStorage(todoText);
            appendTodoInHtml(newTodo);
            todoInput.value = '';
        }
    });

    const todos = loadTodos();
    todos.todoList.forEach(element => {
        appendTodoInHtml(element)
    });

    

    
})
console.log("JS LOADED")