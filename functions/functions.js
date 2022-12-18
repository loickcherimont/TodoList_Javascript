import { createNewElement } from "./dom"

/**
 * Display task in function of selected filter
 * @method filterTasks
 * @param {NodeList} allFilters 
 * @param {NodeList} allTodos 
 */
export function filterTasks(allFilters, allTodos) {
    allFilters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            e.preventDefault()
            const filterMode = e.currentTarget.getAttribute('data-filter')
            // Button loose active mode if user select another one
            e.currentTarget.parentElement.querySelector('.active').classList.remove('active')

            // Selected button get '.active'
            e.currentTarget.classList.add('active')
            console.log(filterMode)
            // Display tasks in function of the current filter
            if(filterMode === "done") {
                allTodos.forEach(task => {
                    task.classList.add('hide-todo')
                    task.classList.remove('hide-completed')
                })

            } else if(filterMode === "todo") {
                allTodos.forEach(task => {
                    task.classList.add('hide-completed')
                    task.classList.remove('hide-todo')
                })
            } else {
                allTodos.forEach(task => {
                    task.classList.remove('hide-todo')
                    task.classList.remove('hide-completed')
                })
            } 
        })
    })
}

/**
 * Indicate if task is done or not with '.is-completed'
 * 
 * @method configCheckboxes
 * @param {HTMLElement} checkboxElement 
 * @param {HTMLElement} taskElement 
 */
export function configCheckboxes(checkboxElement, taskElement) {

    if(checkboxElement.checked) {
        taskElement.classList.add('is-completed')
    }

    checkboxElement.onchange = (e) => {
        e.preventDefault()
        if(checkboxElement.checked) {
            e.currentTarget.parentElement.classList.add('is-completed')
        } else {
            e.currentTarget.parentElement.classList.remove('is-completed')
        }
    }
}

/**
 * Display to user TodoList (All tasks to do or done)
 * 
 * @method displayToUser
 * @param {Promise} todos - Data fetch from JSON online web server
 * @param {Element} todoList - Place to put the todoList
 */
export function displayToUser(todos, todoList) {
    for(const todo of todos) {

        const taskElement = createNewElement('li', {class:  "todo list-group-item d-flex align-items-center"})

        const checkboxElement = createNewElement('input',   {class: "form-check-input", type: "checkbox", id: `todo-${todo.id}`, checked: todo.completed})

        const descriptionElement = createNewElement('label',    {class: "ms-2 form-check-label", for: `todo-${todo.id}`}, `${todo.title} ${todo.id}`)

        const trashElement = createNewElement('label',  {class: "ms-auto btn btn-danger btn-sm"}, `<i class="bi-trash">
        </i>`)

     // Allow to delete a task
     trashElement.addEventListener('click', () => {
        taskElement.remove()
      })

      configCheckboxes(checkboxElement, taskElement)

        taskElement.append(checkboxElement)
        taskElement.append(descriptionElement)
        taskElement.append(trashElement)
        
        todoList.append(taskElement)
    }
}