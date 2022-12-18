import { fetchJSON } from "./functions/api.js";
import { createNewElement } from "./functions/dom.js";
import { configCheckboxes, displayToUser, filterTasks } from "./functions/functions.js";


/**
 * @todo Fix display of current todolist
 * @todo Fix filter problem
 */
try {
    const todos = await fetchJSON('https://jsonplaceholder.typicode.com/todos?_limit=5')

    // Select todolist place
    const todoList = document.querySelector('.list-group')

    // Default todolist 
    displayToUser(todos, todoList)

    const addTaskButton = document.querySelector('#addTaskButton')
    const newTask = document.querySelector('#newTask')
    
    addTaskButton.onclick = (e) => {

        e.preventDefault()

        if(!newTask.value) {
            alert('Please enter a task!')
            return
        }

        let taskID = Date.now()

         const taskElement = createNewElement('li', {class:  "todo list-group-item d-flex align-items-center"})

         const checkboxElement = createNewElement('input',   {class: "form-check-input", type: "checkbox", id:    `todo-${taskID}`})

         const descriptionElement = createNewElement('label',    {class: "ms-2 form-check-label", for: `todo-${taskID}`}, newTask.value)

         const trashElement = createNewElement('label',  {class: "ms-auto btn btn-danger btn-sm"}, `<i class="bi-trash">
         </i>`)

        // Allow user delete task
      trashElement.addEventListener('click', () => {
        taskElement.remove()
      })

      configCheckboxes(checkboxElement, taskElement) 

      
        taskElement.append(checkboxElement)
        taskElement.append(descriptionElement)
        taskElement.append(trashElement)

      
         todoList.append(taskElement)

         // Reset form
         newTask.value = null   
    }


    filterTasks(
        document.querySelectorAll('.btn-group .btn'),
        document.querySelectorAll('li.todo')
    )
    
} catch(e) {
    
    // Display user error message 
    // If data cannot be downloaded
    const alertElement = createNewElement('div', {class: 'alert alert-danger m-2', role: 'alert'}, 'Server connection failed : Not possible to download elements!')
    document.body.prepend(alertElement)

    console.error(e)
}