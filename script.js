//------ Query Selectors -------
const addItems = document.querySelector('.add-items');
const itemList = document.querySelector('.todoList');
let items = JSON.parse(localStorage.getItem('items')) || [];
const uncheckAllBtn = document.querySelector('.uncheck-all');
const checkAllBtn = document.querySelector('.check-all');
const clearBtn = document.querySelector('.clear');
const checkbox = document.querySelectorAll('.wrapper input[type=checkbox]');


//------ Functions -------

function addItem(e){
  e.preventDefault();
  const text = this.querySelector('[name=item]').value;
  const item = {
    text,
    done: false
  }
  items.push(item);
  populateList(items, itemList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function populateList(task = [], taskList){
  taskList.innerHTML = task.map((task, i) => {
    return `
    <li>
    <div>
        <input type="checkbox" data-index=${i} id="item${i}" ${task.done ? 'checked' : ''} />
        <label for="item${i}" data-index=${i}" ></label>
    </div>
    <div>
      <div class=" ${task.done ? 'linethrough' : ''}">
          <label for="item${i}" data-index=${i}">${task.text}</label>
      </div>
    </div>
    </li>
          `;
  }).join('');
}


function toggleDone(e){
  if(!e.target.matches('input')) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemList);
}

function uncheckAll() {
  items.forEach(item => item.done = false);
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemList);
}

function checkAll() {
  items.forEach(item => item.done = true);
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemList);
}

function clear() {
  localStorage.clear();
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  items = [];
  itemList.innerHTML = `<li>Stop procrastinating...</li>`

  }

function shiftClick() {
  console.log('hmmm');
}

//------ Event Listeners -------
addItems.addEventListener('submit', addItem);
itemList.addEventListener('click', toggleDone);
uncheckAllBtn.addEventListener('click', uncheckAll);
checkAllBtn.addEventListener('click', checkAll);
clearBtn.addEventListener('click', clear);

checkbox.forEach(box => box.addEventListener('click', shiftClick));



//------ Function Calls -------
populateList(items, itemList);
