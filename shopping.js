const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// make an array to hold state
const items = [];

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
  displayItems();
}

function displayItems() {
  const html = items
    .map(
      item => `<li class="shopping-item">
      <input type="checkbox">
      <span class="itemName">${item.name}</span>
      <button aria-label="Remove ${item.name}">&times;</button>
  </li>`
    )
    .join('');
  console.log(html);
  list.innerHTML = html;
}

shoppingForm.addEventListener('submit', handleSubmit);
