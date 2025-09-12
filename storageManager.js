/**
 * Saves an item to the browser's local storage
 * @param {String} item Item to be saved to local storage
 */
function saveItem(item) {
  let shoppingListStorage = JSON.parse(localStorage.getItem('shoppingList'));
  if (shoppingListStorage === null) {
    shoppingListStorage = [];
  }
  shoppingListStorage.push(item);
  localStorage.setItem('shoppingList', JSON.stringify(shoppingListStorage));
}

/**
 * Gets the provided item from storage if found
 * @param {String} item The item to search for
 * @returns The item if found otherwise undefined
 */
function getItem(item) {
  let shoppingListStorage = JSON.parse(localStorage.getItem('shoppingList'));
  if (shoppingListStorage === null) {
    shoppingListStorage = [];
  }
  return shoppingListStorage.find((foundItem) => foundItem === item);
}

/**
 * Removes an item from the browser's local storage
 * @param {String} item Item to be removed from local storage
 */
function removeItem(item) {
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
 * Updates an item in local storage
 * @param {String} itemToUpdate Item to update
 * @param {String} newItem The item to replace with
 */
function updateItem(itemToUpdate, newItem) {
  const shoppingListStorage = JSON.parse(localStorage.getItem('shoppingList'));
  let indexFound;
  const foundItem = shoppingListStorage.find((foundItem, index) => {
    indexFound = index;
    return foundItem === itemToUpdate;
  });

  if (foundItem) {
    shoppingListStorage[indexFound] = newItem;
    localStorage.setItem('shoppingList', JSON.stringify(shoppingListStorage));
  }
}

export default { saveItem, getItem, removeItem, updateItem };
