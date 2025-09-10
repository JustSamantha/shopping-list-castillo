const form = document.querySelector('#item-form');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filterInput = document.querySelector('#filter-input');

function addItem(e) {
  e.preventDefault();
  const itemToAdd = document.querySelector('#item-input');
  const itemList = document.querySelector('#item-list');

  if (itemToAdd === '') {
    alert('Please enter an item name');
    return;
  }

  const iElement = document.createElement('i');
  iElement.className = 'fa-solid fa-xmark';
  const buttonElement = document.createElement('button');
  buttonElement.className = 'remove-item btn-link text-red';
  const textNode = document.createTextNode(itemToAdd.value);
  const liElement = document.createElement('li');

  buttonElement.appendChild(iElement);
  liElement.appendChild(textNode);
  liElement.appendChild(buttonElement);
  itemList.appendChild(liElement);
  liElement.addEventListener('click', removeItem);

  itemToAdd.value = '';
}

function removeItem(e) {
  if (e.target.nodeName === 'I') {
    e.target.parentElement.parentElement.remove();
  }
}

function removeAllItems(e) {
  const listItems = document.querySelectorAll('#item-list li');
  listItems.forEach((e) => e.remove());
}

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
      }
    });
  }
}

form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', removeAllItems);
filterInput.addEventListener('input', filterList);

// Fade in the elements if present
// @todo get elements from localstorage
itemList.classList.replace('hideOpacity', 'showOpacity');
clearBtn.classList.replace('hideOpacity', 'showOpacity');
filterInput.classList.replace('hideOpacity', 'showOpacity');
