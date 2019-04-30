var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

/*var todos = [
    'Fazer Café',
    'Estudar JS',
    'Acessar comunidade Rocketseat'
];*/
var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderTodo(){
    listElement.innerHTML = '';
    for (const i of todos) {
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(i);

        var linkElement = document.createElement('a');
        linkElement.href = '#'

        var pos = todos.indexOf(i);
        linkElement.setAttribute('onclick', 'deleteTodo('+pos+')')

        var linkText = document.createTextNode(' - Excluir');
        linkElement.appendChild(linkText);

        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement);
    }
}

function addTodo(){
    var todoText = inputElement.value;
    todos.push(todoText);
    inputElement.value = '';
    renderTodo();
    saveToStorage();
}

renderTodo();
buttonElement.onclick = addTodo;

function deleteTodo(pos){
    todos.splice(pos,1);
    renderTodo();
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('list_todos', JSON.stringify(todos));
}