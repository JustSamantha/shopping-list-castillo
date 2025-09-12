import storageManager from './storageManager.js';

const form = document.querySelector('#item-form');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filterInput = document.querySelector('#filter-input');
let updatingItem;

/**
 * Creates and inserts HTML form an item into the DOM
 * @param {String} item Item to create the HTML with
 */
function addItemHTML(item) {
  const iElement = document.createElement('i');
  iElement.className = 'fa-solid fa-xmark';
  const buttonElement = document.createElement('button');
  buttonElement.className = 'remove-item btn-link text-red';
  const textNode = document.createTextNode(item);
  const liElement = document.createElement('li');

  buttonElement.appendChild(iElement);
  liElement.appendChild(textNode);
  liElement.appendChild(buttonElement);
  itemList.appendChild(liElement);
  liElement.addEventListener('click', removeUpdateItem);
}

function updateItem(itemToUpdate, newItem) {}

/**
 * Function to handle the click event of the add/update item button
 * @param {Event} e The event object
 */
function addUpdateItem(e) {
  e.preventDefault();
  const itemToAdd = document.querySelector('#item-input');

  if (itemToAdd.value === '') {
    alert('Please enter an item name');
    return;
  }

  if (updatingItem && !storageManager.getItem(itemToAdd.value)) {
    storageManager.updateItem(updatingItem, itemToAdd.value);
    const items = document.querySelectorAll('.items li');
    const submitBtn = document.querySelector('#submitBtn');

    items.forEach((item) => {
      item.style.color = 'black';
      if (item.childNodes[0].textContent === updatingItem) {
        item.childNodes[0].textContent = itemToAdd.value;
      }
    });
    submitBtn.style.backgroundColor = '#333';
    submitBtn.childNodes[1].textContent = ' Add Item';
    submitBtn.childNodes[0].classList.replace('fa-pencil', 'fa-plus');
    updatingItem = undefined;
  } else if (!storageManager.getItem(itemToAdd.value)) {
    storageManager.saveItem(itemToAdd.value);
    addItemHTML(itemToAdd.value);
  } else {
    alert('Duplicated item');
    return;
  }
  fadeIn();

  itemToAdd.value = '';
}

/**
 * Function to handle the click event of the list items
 * @param {Event} e The event object
 */
function removeUpdateItem(e) {
  if (e.target.nodeName === 'I') {
    const mainParent = e.target.parentElement.parentElement;
    const itemToRemove = mainParent.childNodes[0].textContent;
    storageManager.removeItem(itemToRemove);
    mainParent.remove();
  } else {
    const selectedItem = e.target.childNodes[0].textContent;
    const items = document.querySelectorAll('.items li');
    const itemInput = document.querySelector('#item-input');
    const submitBtn = document.querySelector('#submitBtn');

    itemInput.value = selectedItem;
    updatingItem = selectedItem;
    items.forEach((item) => (item.style.color = 'black'));
    e.target.style.color = 'grey';
    submitBtn.style.backgroundColor = 'green';
    submitBtn.childNodes[1].textContent = ' Update Item';
    submitBtn.childNodes[0].classList.replace('fa-plus', 'fa-pencil');
  }
  e.stopPropagation();
}

/**
 * Function to handle the click event of the remove all items button
 * @param {Event} e The event object
 */
function removeAllItems(e) {
  const listItems = document.querySelectorAll('#item-list li');
  listItems.forEach((e) => e.remove());
  localStorage.setItem('shoppingList', JSON.stringify([]));
}

/**
 * Function to handle the input event on the filter text box
 * @param {Event} e The event object
 */
function filterList(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll('#item-list li');
  if (filterValue === '') {
    listItems.forEach((e) => {
      e.classList.remove('hideDisplay');
    });
  } else {
    listItems.forEach((e) => {
      const itemText = e.childNodes[0].textContent.toLowerCase();
      if (!itemText.includes(filterValue)) {
        e.classList.add('hideDisplay');
      } else {
        e.classList.remove('hideDisplay');
      }
    });
  }
}

/**
 * Fades in the UI, if there are no items it should be hidden.
 */
function fadeIn() {
  itemList.classList.replace('hideOpacity', 'showOpacity');
  clearBtn.classList.replace('hideOpacity', 'showOpacity');
  filterInput.classList.replace('hideOpacity', 'showOpacity');
}

/**
 * Checks the local storage and creates the items.
 */
function initPage() {
  const storageList = JSON.parse(localStorage.getItem('shoppingList'));
  if (storageList !== null && storageList.length > 0) {
    storageList.forEach((item) => {
      addItemHTML(item);
    });
    fadeIn();
  }
}

form.addEventListener('submit', addUpdateItem);
itemList.addEventListener('click', removeUpdateItem);
clearBtn.addEventListener('click', removeAllItems);
filterInput.addEventListener('input', filterList);
initPage();
