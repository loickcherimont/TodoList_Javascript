import { fetchJSON } from "../functions/api.js";
import { createNewElement } from "../functions/dom.js";

/**
 * A thing to do or done by user
 * 
 * @typedef  {object} Todo
 * @property {number} id
 * @property {string} description - Task description
 * @property {boolean} state - Task done or not
 * 
 */
class Todo {
    constructor(id, description, state) {
        this.id = id;
        this.description = description;
        this.state = state;
    }

    delete() {
        // remove the task from todolist
    }
}

// HTMLElement > All components from TODO (Checkbox, description, trash, id)
// class TodoComponent {
//     appendTo(htmlTag) {
//         this.append(htmlTag)
//     }
// }


/**
 * Full list of done/to do tasks
 * 
 * @typedef {object} TodoList
 * 
 * @method display - Display data on todolist mode
 * @property {Promise<string>} todos - All task to do / done
 */
class TodoList {
    constructor(todos) {
        this.todos = todos;
    }

    display() {
        const todos = this.todos;
        // Display data on todolist mode
        for(const todo of todos) {
            let taskID = Date.now();
            const taskElement = createNewElement('li', {class:  "todo list-group-item d-flex align-items-center"});
            const checkboxElement = createNewElement('input',   {class: "form-check-input", type: "checkbox", id: `todo-${taskID}`});
            const descriptionElement = createNewElement('label',    {class: "ms-2 form-check-label", for: `todo-${taskID}`}, todo.title);
            const trashElement = createNewElement('label',  {class: "ms-auto btn btn-danger btn-sm"}, `<i class="bi-trash">
         </i>`)
            
            // trashElement.addEventListener('click', () => {
            //     console.log(this.parentNode)
            // })

            // Configure
            // configCheckboxes(checkboxElement, taskElement)

            taskElement.append(checkboxElement)
            taskElement.append(descriptionElement)
            taskElement.append(trashElement)

            console.log(taskElement)

            document.querySelector('.list-group').appendChild(taskElement)
        }
    }

    // Another method
}

const data = await fetchJSON('https://jsonplaceholder.typicode.com/todos?_limit=5');

const myTodolist = new TodoList(data);
myTodolist.display()




/*
<!-- Main structure of a task -->
<li class="todo list-group-item d-flex align-items-center">
    <input class="form-check-input" type="checkbox" id="todo-2">
    <label class="ms-2 form-check-label" for="todo-2">Tâche à faire 1</label>
    <label class="ms-auto btn btn-danger btn-sm trash"><i class="bi-trash"></i></label>
</li>
*/

/*

 * Customise an HTML Element
 * @param {string} tagName 
 * @param {object} attributes
 * @param {string} innerContent
 * @return {HTMLElement}
export function createNewElement(tagName, attributes={}, innerContent='') {
    const newElement = document.createElement(tagName)
    newElement.innerHTML = innerContent

    for(const [attribute, value] of Object.entries(attributes)) {
        if(value !== false) {
            newElement.setAttribute(attribute, value)
        }
    }

    return newElement
}
*/


