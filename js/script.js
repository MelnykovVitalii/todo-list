const form = document.querySelector('#todoform');
const input = document.querySelector('#todoinput');
const todoList = document.querySelector('.todo-list');
const notification = document.querySelector('.notification');

let todoArray = getTodo('todos') == null ? [] : getTodo('todos');

function validator(value) {
  if (value.trim()) {
    return value.trim();
  }
  return false;
}

function getTodo(name) {
  return JSON.parse(localStorage.getItem(name));
}

function saveTodo(name, todoList) {
  localStorage.setItem(name, JSON.stringify(todoList));
}

function addTodo(value) {
  if (validator(value)) {
    const newTodo = {
      name: value,
      checked: false,
    };
    todoArray.unshift(newTodo);
    saveTodo('todos', todoArray);
    return (todoArray = getTodo('todos'));
  }
  return false;
}

function doneTodo(id) {
  id = Number(id);
  const updateList = todoArray.map((item, index) => {
    if (index === id) {
      return {
        name: item.name,
        checked: item.checked ? false : true,
      };
    }
    return item;
  });

  saveTodo('todos', updateList);
  return (todoArray = getTodo('todos'));
}

function deleteTodo(id) {
  id = Number(id);
  const updateList = todoArray.filter((item, index) => index !== id);
  saveTodo('todos', updateList);
  return (todoArray = getTodo('todos'));
}

todoList.addEventListener('click', (event) => {
  const target = event.target;
  const parent = target.closest('.todo-list__item');
  if (target && target.classList.contains('icon-check')) {
    doneTodo(parent.dataset.id);
    render();
  }

  if (target && target.classList.contains('icon-delete')) {
    deleteTodo(parent.dataset.id);
    parent.classList.add('hide');
    setTimeout(render, 500);
  }
  if (target && target.classList.contains('icon-edit')) {
    notification.classList.add('notification-show');
    setTimeout(() => {
      notification.classList.remove('notification-show');
    }, 2000);
  }
});

function render() {
  if (todoArray.length === 0) {
    todoList.innerHTML = `
    <div class="todo-list__empty">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path
        d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"
      />
    </svg>
  </div>`;
    return;
  }

  todoList.innerHTML = '';

  todoArray.forEach((item, index) => {
    todoList.innerHTML += `
    <div class="todo-list__item item" data-id = ${index}>
    <div class="item__check">
      <span class="icon-check ${item.checked ? 'checked' : ''}"></span>
    </div>
    <div class="item__name ${item.checked ? 'done' : ''}">${item.name}</div>
    <div class="item__icons"><span class="icon-edit"></span><span class="icon-delete"></span></div>
  </div>
    `;
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo(input.value);
  render();
  event.target.reset();
});

render();
