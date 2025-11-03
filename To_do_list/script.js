// Select DOM elements
const input = document.getElementById("todo-input");
const button = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

// Try to load saved todos from localstorage (if any)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    // Save current todos array to localstorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Create a DOM node for a todo object and append it to the list
function createTodoNode(todo, index) {
    const li = document.createElement('li');
    li.className = "flex justify-between items-center bg-gray-300/10 text-gray-800 px-4 py-2 rounded-lg shadow-md w-[23vw] transition-all";

    // Checkbox to toggle completion
    const Checkbox = document.createElement('input');
    Checkbox.type = 'checkbox';
    Checkbox.checked = !!todo.completed;
    Checkbox.className = "form-checkbox h-5 w-5 text-indigo-600 mr-3 cursor-pointer";
    Checkbox.addEventListener("change", () => {
        todo.completed = Checkbox.checked;
        textSpan.classList.toggle('line-through', todo.completed);
        textSpan.classList.toggle('text-gray-400', todo.completed);
        saveTodos();
    });

    // Text of the todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.className = `flex-1 text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-white'}`;
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit Todo", todo.text);
        if (newText !== null) {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    });

    // Delete Todo Button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500 transition";
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    });

    li.appendChild(Checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);

    return li;
}

// Render the whole todo list from todos array
function render() {
    list.innerHTML = '';
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
    });
}

function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    todos.push({ text, completed: false });
    input.value = '';
    render();
    saveTodos();
}

button.addEventListener("click", addTodo);
input.addEventListener('keydown', (e) => {
    if (e.key === "Enter") addTodo();
});

render();
