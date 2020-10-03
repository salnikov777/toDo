let addMessage = document.querySelector('.message'),
  addButton = document.querySelector('.add'),
  todo = document.querySelector('.todo');

let todoList = [];

if (localStorage.getItem('todo')) {
  todoList = JSON.parse(localStorage.getItem('todo'));
  displayMessages();
}


addButton.addEventListener('click', function () {
  if(!addMessage.value.trim()) return;
  let newTodo = {
    todo: addMessage.value,
    checked: false,
    important: false
  };

  todoList.push(newTodo);
  displayMessages();
  localStorage.setItem('todo', JSON.stringify(todoList));
  addMessage.value = '';
});

function displayMessages() {
  if( !todoList.length){
    todo.innerHTML = '';
    return;
  }
  let displayMessage = ''
  todoList.forEach((item, idx) => {
    displayMessage += `
    <li>
      <input id="item_${idx}" type="checkbox" ${item.checked ? 'checked' : null}>
      <label class="${item.important ? 'important' : null}" for="item_${idx}">${item.todo}</label>
    </li>
    
    `;
  });
  todo.innerHTML = displayMessage;
}

todo.addEventListener('change', function (event) {
  let idInput = event.target.getAttribute('id');
  let forLabel = todo.querySelector(`[for="${idInput}"]`);
  let valueLabel = forLabel.innerHTML;
  todoList.forEach(function (item) {
    if (item.todo === valueLabel) {
      item.checked = !item.checked;
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  });

});

todo.addEventListener('contextmenu', function (event) {
  event.preventDefault();
  todoList.forEach(function (item, i) {
    if (item.todo === event.target.innerHTML) {

      if (event.ctrlKey || event.metaKey) {
        todoList.splice(i, 1);
      } else {
        item.important = !item.important;
      }

      displayMessages();
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  })

})