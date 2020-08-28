const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// make an array to hold state
let items = [];

function handleSubmit(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value;
  //   if empty don't submit
  if (!name) return;
  const item = {
    name,
    id: Date.now(),
    complete: false,
  };
  // push the items into state
  items.push(item);
  console.log(`There are now ${items.length} in your state`);
  // clear the form
  e.target.reset();
  //   fire event that will tell anyone else who cares that the items have been updated
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
  console.log('updated');
}

function displayItems() {
  const html = items
    .map(
      item => `<li class="shopping-item">
      <input 
      type="checkbox">
      <span class="itemName">${item.name}</span>
      <button 
      aria-label="Remove ${item.name}" 
      value="${item.id}"
      >&times;</button>
  </li>`
    )
    .join('');
  list.innerHTML = html;
}

function mirrorToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  console.info('restoring from local storage');
  // pull the items back
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if (lsItems.length) {
    items.push(...lsItems);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

function deleteItem(id) {
  console.log('delete item', id);
  items = items.filter(item => item.id !== id);
  console.log(items);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);
// event delegation, listening for a click on the list UL but then delegate the click over to the button if that was clicked.
list.addEventListener('click', function(e) {
  if (e.target.matches('button')) {
    deleteItem(parseInt(e.target.value));
  }
});
restoreFromLocalStorage();
