const form = document.querySelector('#item-form');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filterInput = document.querySelector('#filter-input');

/**
 * Saves an item to the browser's local storage
 * @param {String} item Item to be saved to local storage
 */
function saveItemToStorage(item) {
  let shoppingListStorage = JSON.parse(localStorage.getItem('shoppingList'));
  if (shoppingListStorage === null) {
    shoppingListStorage = [];
  }
  fadeIn();
  shoppingListStorage.push(item);
  localStorage.setItem('shoppingList', JSON.stringify(shoppingListStorage));
}

/**
 * Removes an item from the browser's local storage
 * @param {String} item Item to be removed from local storage
 */
function removeItemFromStorage(item) {
  const shoppingListStorage = JSON.parse(localStorage.getItem('shoppingList'));
  const newShoppingList = [];
  shoppingListStorage.forEach((storedItem) => {
    if (storedItem !== item) {
      newShoppingList.push(storedItem);
    }
  });
  localStorage.setItem('shoppingList', JSON.stringify(newShoppingList));
}

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
  liElement.addEventListener('click', removeItem);
}

/**
 * Function to handle the click event of the add item button
 * @param {Event} e The event object
 */
function addItem(e) {
  e.preventDefault();
  const itemToAdd = document.querySelector('#item-input');
  const itemList = document.querySelector('#item-list');

  if (itemToAdd.value === '') {
    alert('Please enter an item name');
    return;
  }

  addItemHTML(itemToAdd.value);
  saveItemToStorage(itemToAdd.value);

  itemToAdd.value = '';
}

/**
 * Function to handle the click event of the remove item button
 * @param {Event} e The event object
 */
function removeItem(e) {
  if (e.target.nodeName === 'I') {
    const mainParent = e.target.parentElement.parentElement;
    const itemToRemove = mainParent.childNodes[0].textContent;
    removeItemFromStorage(itemToRemove);
    mainParent.remove();
  }
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

form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', removeAllItems);
filterInput.addEventListener('input', filterList);
initPage();
