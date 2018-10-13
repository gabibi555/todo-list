'use strict'

// This is our controller it is responsible for rendering the view and action upon events
console.log('Todo');

function init() {
    createTodos();
    if (gTodos.length === 0) {
        var temp = document.querySelector('.finish')
        temp.style.display = 'block'
        temp.innerHTML = 'Nice! You Done All Your Todos!'
    }
    render();
    isAdmin()
}


function render(userTodos) {
    console.log('render:', userTodos)
    renderTodos(userTodos);
    renderStats();
}


function renderTodos(userTodos) {
    if (userTodos === undefined) {
        return
    } else {
        var todos = getTodos();
        var filteredTodos = todos.filter(function (todo) {

            return userTodos[0].owner === todo.owner
        })
    }
    var strHTML = '';

    filteredTodos.forEach(function (todo) {
        strHTML += `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onTodoClicked('${todo.id}')">
                   Task Name : ${todo.txt} | Time Created : ${getHumanDate(todo.created)} | Importance : ${todo.importantLvl}
                   <button class="btn-delete" onclick="onDeleteTodo('${todo.id}', event)">
                       &times;
                     </button>
               </li>`
    })
    document.querySelector('.todo-list').innerHTML = strHTML;
    console.log('those are user todo', filteredTodos)
    userTodo = filteredTodos
}




function renderStats() {
    document.querySelector('.todo-count').innerHTML = getTodoCount();
    document.querySelector('.active-count').innerHTML = getActiveCount();
}

function onTodoClicked(todoId) {
    toggleTodo(todoId);
    render();
}

function onSetFilter(statusFilter) {
    setFilter(statusFilter);
    render();
}

function onSortTodos(sortBy) {
    setSort(sortBy)
    render();
}

function onAddTodo() {
    var elNewTodoTxt = document.querySelector('#newTodoTxt');
    var newTodoTxt = elNewTodoTxt.value;
    if (gTodos.length === 0) {
        var temp = document.querySelector('.finish')
        temp.style.display = 'block'
        temp.innerHTML = 'Nice! You Done All Your Todos!'
    }
    if (newTodoTxt.length === 0) {
        document.querySelector('.add-todo-container').classList.add('animated', 'pulse');
        setTimeout(function () {
            document.querySelector('.add-todo-container').classList.remove('animated', 'pulse');
        }, 1000)

        return
    }

    var importantLvl = document.querySelector('#importance').value;

    addTodo(newTodoTxt, importantLvl);

    if (gTodos.length === 1) {
        var temp = document.querySelector('.finish')
        temp.style.display = 'none'
    }

    document.querySelector('h4').classList.add('animated', 'tada');
    setTimeout(function () {
        document.querySelector('h4').classList.remove('animated', 'tada');
    }, 1000)

    elNewTodoTxt.value = '';
    render()
}

function onDeleteTodo(todoId, ev) {
    // Stop the propegation of the click event so the LI onclick will not trigger
    if (confirm('are you sure you want to delete this Todo?')) {
        if (gTodos.length === 1) {
            var temp = document.querySelector('.finish')
            temp.style.display = 'block'
            temp.innerHTML = 'Nice! You Done All Your Todos!'
        }

        ev.stopPropagation();
        deleteTodo(todoId);
        render();
    }
    else { return ev.stopPropagation(); }
}

function goBackToLogIn() {
    window.location.href = "file:///C:/Users/%D7%90%D7%A8%D7%99%D7%94/Dropbox/CaSep18-ExcerciseSubmission/Gabi%20chami/Day18-MVC/ex2/index.html?";
}

function isAdmin() {
    var user = getFromStorage('gUsers')
    if (user.isAdmin) {
        var link = document.querySelector('.linkforadmin')
        link.style.display = 'block'
    }
    console.log('username', user.name)
    giveTodos(user.name)
}
function giveTodos(userName) {
    console.log(userName)
    // debugger
    var userTodos = getFromStorage(KEY_TODOS)
    var todos = []
    userTodos.forEach(function (todo) {
        if (todo.owner === userName) {
            todos.push(todo)

        }
    })

    // console.log(todos)
    render(todos)

} 