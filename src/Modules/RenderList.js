// import _ from 'lodash';
import '@fortawesome/fontawesome-free/css/all.css';
import {
  storage, addList, changeColor, editList, deleteElement,
} from './addRemove.js';

function renderList() {
  const listItems = storage();
  const listHolder = document.querySelector('#toDoList');
  listHolder.innerHTML = `<li id="title">Today's To Do <i class="fa-solid fa-rotate"></i></li>
  <li><input id="addItem" type="text" placeholder="Add Your list..."><button id="addButton" type="Submit" ><i class="fas fa-arrow-left"></i></button></li>
  <button id="clearList">Clear All Completed</button>`;
  const clearButton = listHolder.querySelector('#clearList');
  listItems.forEach((item) => {
    const li = document.createElement('li');
    const checkBox = document.createElement('input');
    const label = document.createElement('label');
    const icon = document.createElement('i');

    icon.classList.add('fas', 'fa-ellipsis-v');
    li.classList.add('toDoItem');
    checkBox.type = 'checkbox';
    checkBox.id = item.index;
    li.id = item.index;
    label.for = item.index;
    label.textContent = item.description;

    li.appendChild(checkBox);
    li.appendChild(label);
    li.appendChild(icon);
    listHolder.insertBefore(li, clearButton);
  });
}

function updateList() {
  renderList();
  const listContainer = document.querySelector('#toDoList');
  const addInput = listContainer.querySelector('#addItem');
  const addForm = document.querySelector('#toDoContainer');
  addForm.addEventListener('submit', () => {
    const { value } = addInput;
    if (value !== '') {
      addList(value);
      renderList();
    }
  });

  const toDoItems = document.querySelectorAll('.toDoItem');
  toDoItems.forEach((item) => {
    const icon = item.querySelector('i');
    icon.addEventListener('click', () => {
      deleteElement(item);
      changeColor(item);
      editList(item);
    });
  });
}

export { updateList, renderList };