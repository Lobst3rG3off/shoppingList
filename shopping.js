const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

//make an array to hold state
const items = [];

function handleSubmit(e){
    e.preventDefault();
    const name = e.currentTarget.item.value;
    const item = {
        name,
        id: Date.now(),
        complete: false
    };
    //push the items into state
    items.push(item);
    console.log(`There are now ${items.length} in your state`)
    //clear the form 
    e.target.reset();
}


shoppingForm.addEventListener('submit', handleSubmit);



