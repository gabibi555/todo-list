'use strict'
const KEY_TODOS = 'todos';
var userTodo;
var gTodos;
var gTodosFilter = 'all';

function createTodos() {
    var todos = getFromStorage(KEY_TODOS);
    gTodos = (todos) ? todos : [createTodo('Learn HTML', 1), createTodo('Practice CSS', 1)]
}
function createTodo(txt, importantLvl) {
    return {
        id: makeId(),
        owner: 'gabi',
        txt: txt,
        isDone: false,
        importantLvl: importantLvl,
        created: Date.now()
    }
}
// && todo.owner === userTodo.owner
function getTodos(userTodo) {
    return gTodos.filter(function (todo) {
        return (gTodosFilter === 'all' ) ||
            (gTodosFilter === 'done' && todo.isDone) ||
            (gTodosFilter === 'active' && !todo.isDone)
    });
}


function addTodo(todoTxt, importantLvl) {
    gTodos.unshift(createTodo(todoTxt, importantLvl));
    saveToStorage(KEY_TODOS, gTodos);

}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    });
    todo.isDone = !todo.isDone;
    saveToStorage(KEY_TODOS, gTodos);
}

function setFilter(statusFilter) {
    console.log(statusFilter)
    gTodosFilter = statusFilter;
}

function deleteTodo(todoId) {
    var todoIdx = gTodos.findIndex(function (todo) {
        return todo.id === todoId;
    })
    gTodos.splice(todoIdx, 1);
    saveToStorage(KEY_TODOS, gTodos);
    renderTodos(userTodos)
}

function getTodoCount() {
    return gTodos.length;
}
function getActiveCount() {
    return gTodos.filter(function (todo) {
        return !todo.isDone
    }).length
}

function setSort(sortBy) {
    if (sortBy === 'importance') {
        gTodos.sort(function (a, b) {
            return b.importantLvl - a.importantLvl
        })
    }
    else if (sortBy === 'time') {
        gTodos.sort(function (a, b) {
            return b.created - a.created
        })
    }
    else if (sortBy === 'text') {
        gTodos.sort(function (a, b) {
            if (b.txt.toUpperCase() < a.txt.toUpperCase()) {
                return 1;
            }
            if (b.txt.toUpperCase() > a.txt.toUpperCase()) {
                return -1;
            }
        })
    }
}

