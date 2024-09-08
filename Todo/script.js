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
document.addEventListener("DOMContentLoaded",() => {


    const todoInput = document.getElementById("todoInput");
    const submitButton = document.getElementById("addTodo");

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
        }
    });

    loadTodos();
})
console.log("JS LOADED")