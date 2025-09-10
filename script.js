const form = document.querySelector('#item-form');

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

  itemToAdd.value = '';
}

form.addEventListener('submit', addItem);
