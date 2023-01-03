// All 'TODO:' are for the upkeep 

// GLOBAL
// WARNING: Prevent global variables in JS
// TODO : Replace global variables with local ones
const todos = await fetchDataFrom('https://jsonplaceholder.typicode.com/todos?_limit=5');
const formAddTask = document.querySelector('form');
const filterAll = document.querySelector('[data-filter=all');
const filterDone = document.querySelector('[data-filter=done');
const filterToDo = document.querySelector('[data-filter=todo');

// MAIN
// TODO : Move main script into a file app.js
displayTodolist(todos)

formAddTask.addEventListener('submit', addNewTodo);


filterAll.addEventListener('click', displayAll);
filterDone.addEventListener('click', displayDone);
filterToDo.addEventListener('click', displayToDo);

// FUNCTIONS
// Move functions in a functions.js file
// Return an object standing for todos in json
async function fetchDataFrom(URL) {
    const response = await fetch(URL);
    return response.json();
}



// II) Display data on UI -- USE GRAFIKART'S TEMPLATE
// > Use elements from DOM
// > Display initial un/checked boxes 
// > Allow user to delete tasks

// Take a task (alias todo) like parameter
// Returns a list item that stands for a task
function displayTodolist(todos) {

    for (const todo of todos) {
        // Create todo components
        // TodoItem model : Checkbox, Title, Trash

        // TODO : Prevent repetitive part
        // use functions
        const checkbox = document.createElement('input');
        checkbox.setAttribute('class', 'form-check-input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', `todo-${todo.id}`);
        if (todo.completed) {
            checkbox.setAttribute('checked', '');
        }

        const title = document.createElement('label');
        title.setAttribute('class', 'ms-2 form-check-label');
        title.setAttribute('for', `todo-${todo.id}`);
        title.innerText = todo.title;

        const trash = document.createElement('label');
        trash.setAttribute('class', 'ms-auto btn btn-danger btn-sm');
        trash.innerHTML = "<i class='bi-trash'></i>";
        trash.addEventListener('click', (e) => {
            e.preventDefault();
            e.currentTarget.parentNode.remove();
        })

        const todoItem = document.createElement('li');
        todoItem.setAttribute('class', 'todo list-group-item d-flex align-items-center');

        // Indicate done task for initial data
        if (todo.completed) {
            todoItem.classList.add('is-completed');
        }
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                todoItem.classList.add('is-completed');
            } else {
                todoItem.classList.remove('is-completed');
            }
        })

        // Append components to TodoItem
        todoItem.appendChild(checkbox);
        todoItem.appendChild(title);
        todoItem.appendChild(trash);

        // Add TodoItem to HTML
        document.querySelector('.list-group')
            .prepend(todoItem);
    }
}

// III) Allow user add tasks
// User use form to create new task
function addNewTodo(e) {
    e.preventDefault();

    // Create new task following model from initial todos
    let todoID = Date.now();

    // TODO : Prevent repetitive part
        // use functions
    const checkbox = document.createElement('input');
    checkbox.setAttribute('class', 'form-check-input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', `todo-${todoID}`);

    const title = document.createElement('label');
    title.setAttribute('class', 'ms-2 form-check-label');
    title.setAttribute('for', `todo-${todoID}`);
    // Complete TodoItem title using user entry
    title.innerText = this.title.value;

    const trash = document.createElement('label');
    trash.setAttribute('class', 'ms-auto btn btn-danger btn-sm');
    trash.innerHTML = "<i class='bi-trash'></i>";
    trash.addEventListener('click', (e) => {
        e.preventDefault();
        e.currentTarget.parentNode.remove();
    })

    const todoItem = document.createElement('li');
    todoItem.setAttribute('class', 'todo list-group-item d-flex align-items-center');

    // Indicate done task for new todo
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            todoItem.classList.add('is-completed');
        } else {
            todoItem.classList.remove('is-completed');
        }
    })

    // Append components to TodoItem
    todoItem.appendChild(checkbox);
    todoItem.appendChild(title);
    todoItem.appendChild(trash);

    // Prevent default display of new task
    if (filterDone.classList.contains('active')) {
        todoItem.classList.add('d-none');
    }

    // Add TodoItem to HTML
    document.querySelector('.list-group')
        .prepend(todoItem);

    // Reset Form after TodoItem created and added
    this.reset();
}

// IV) Filter tasks by states : TODO, DONE, ALL -- Use CSS
// Display corresponding tasks

// TODO : Prevent repetitive part
        // use functions
function displayAll(e) {
    e.preventDefault();
    e.currentTarget.parentNode.querySelector('.active').classList.remove('active')
    e.currentTarget.classList.add('active');

    document.querySelectorAll('.list-group .todo').forEach(todo => {
        todo.classList.remove('d-none');
    });
}

function displayDone(e) {
    e.preventDefault();
    e.currentTarget.parentNode.querySelector('.active').classList.remove('active')
    e.currentTarget.classList.add('active');

    document.querySelectorAll('.list-group .todo:not(.is-completed)').forEach(todo => {
        todo.classList.add('d-none');
    });
    document.querySelectorAll('.list-group .todo.is-completed').forEach(todo => {
        todo.classList.remove('d-none');
    });
}

// Hide all TodoItems with checked checkbox
// CSS : When checked, add to corresponding todo
// .is-completed class
function displayToDo(e) {
    e.preventDefault();
    e.currentTarget.parentNode.querySelector('.active').classList.remove('active')
    e.currentTarget.classList.add('active');

    document.querySelectorAll('.list-group .todo.is-completed').forEach(todo => {
        todo.classList.add('d-none');
    });
    document.querySelectorAll('.list-group .todo:not(.is-completed)').forEach(todo => {
        todo.classList.remove('d-none');
    });


}

