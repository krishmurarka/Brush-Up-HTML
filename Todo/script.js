function loadTodos(){

    const todos = JSON.parse(localStorage.getItem("todos")) || {"todoList": []};
    console.log(todos);
    return todos;
}
function addTodoLocalStorage(todoText) {

    const todos = loadTodos();
    todos.todoList.push(todoText);

    localStorage.setItem("todos", JSON.stringify(todos))
}
function appendTodoInHtml(todoText){

    const todoList = document.getElementById("todoList");

    const todo = document.createElement("li");
    todo.textContent = todoText

    todoList.appendChild(todo)
}
document.addEventListener("DOMContentLoaded",() => {


    const todoInput = document.getElementById("todoInput");
    const submitButton = document.getElementById("addTodo");
    const todoList = document.getElementById("todoList");

    todoInput.addEventListener("change", (event) => {
        // This callback method is fired everytime there is a change in input tag.
        event.target.value = event.target.value.trim();
    })

    submitButton.addEventListener("click", (event) => {

        const todoText = todoInput.value;

        if(todoText == ''){
            alert("Please write something for the todo")
        }else{
            addTodoLocalStorage(todoText);
            appendTodoInHtml(todoText);
            todoInput.value = '';
        }
    });

    const todos = loadTodos();

    todos.todoList.forEach(element => {
        const newTodoItem = document.createElement("li");
        newTodoItem.textContent = element;
        todoList.appendChild(newTodoItem);
        
    });
})
console.log("JS LOADED")