import { fetchJSON } from "../functions/api.js";
import { createNewElement } from "../functions/dom.js";
// import { configCheckboxes } from "../functions/functions.js";

// HTMLElement type Checkbox
class Checkbox {
    constructor(checkbox) {
        this.checkbox = checkbox;
    }

    get isChecked() {
        return this.checkbox.checked;
    }

    allowStateChange() {
        this.checkbox.onchange = (e) => {
            e.preventDefault();
            if (this.isChecked) {
                e.currentTarget.parentElement.classList.add('is-completed');
            } else {
                e.currentTarget.parentElement.classList.remove('is-completed');
            }
        }
    }
}

/**
 * Full list of done/to do tasks
 * 
 * @typedef {object} TodoList
 * 
 * @method displayTodolist - Display data on todolist mode
 * @property {Promise<string>} todos - All task to do / done
 */
class TodoList {
    constructor(todos) {
        this.todos = todos;
    }

    displayTodolist() {
        const todos = this.todos;

        // BLOCK
        // Create Tasks
        // Display data on UI Elements
        // Here Todolist
        for (const todo of todos) {

            let taskID = Date.now();
            const taskElement = createNewElement('li', {class: "todo list-group-item d-flex align-items-center" });
            const checkboxElement = createNewElement('input', { class: "form-check-input", type: "checkbox", id: `todo-${taskID}`, checked: todo.completed ? '': null});


            const descriptionElement = createNewElement('label', { class: "ms-2 form-check-label", for: `todo-${taskID}` }, todo.title);
            const trashElement = createNewElement('label', { class: "ms-auto btn btn-danger btn-sm" }, `<i class="bi-trash">
         </i>`)

            // Allow to delete a task
            trashElement.addEventListener('click', (e) => {
                e.preventDefault();
                e.currentTarget.parentNode.remove();
            })

            // Configure checkboxes
            const checkbox = new Checkbox(checkboxElement);
            // checkbox.displayChecked();
            checkbox.allowStateChange();

            // console.log(checkbox["checkbox"])

            // Add each component to the taskElement
            taskElement.append(checkbox.checkbox)
            taskElement.append(descriptionElement)
            taskElement.append(trashElement)

            // Append task to TodoList
            document.querySelector('.list-group')
                    .appendChild(taskElement);
        }
    }

    addTask() {
        // const formAddTasks = new FormAddTasks(document.getElementById('newTask'));
        document.getElementById('formAddTasks').reset();
    }
}

// Form to allow user add new task in todolist
// We can access to user data from input text
// This form can be submitted
class FormAddTasks {
    constructor(inputForm) {
        this.inputForm = inputForm;   
    }

    get inputData() {
        return this.inputForm.value;
    }

    // submitData() {

    // }
}

const data = await fetchJSON('https://jsonplaceholder.typicode.com/todos?_limit=5');

const myTodolist = new TodoList(data);
myTodolist.displayTodolist();

document.getElementById('formAddTasks').addEventListener('submit', (e) => {
    e.preventDefault();
    myTodolist.addTask();

})




/*
<!-- Main structure of a task -->
<li class="todo list-group-item d-flex align-items-center">
    <input class="form-check-input" type="checkbox" id="todo-2">
    <label class="ms-2 form-check-label" for="todo-2">Tâche à faire 1</label>
    <label class="ms-auto btn btn-danger btn-sm trash"><i class="bi-trash"></i></label>
</li>
*/