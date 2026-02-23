var items = [
  {text: "Simple todo , Add more ", done: false},

];

function render() {
  var list = document.getElementById('todoList');
  list.innerHTML = '';

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var li = document.createElement('li');
    li.className = 'todo-item' + (item.done ? ' done' : '');

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'item-' + i;
    checkbox.checked = item.done;
    checkbox.setAttribute('data-index', i);
    checkbox.onchange = function() {
      var idx = parseInt(this.getAttribute('data-index'));
      items[idx].done = this.checked;
      render();
    };

    var label = document.createElement('label');
    label.htmlFor = 'item-' + i;
    label.textContent = item.text;

    var actions = document.createElement('div');
    actions.className = 'actions';

    if (item.done) {
      var undoneBtn = document.createElement('span');
      undoneBtn.className = 'undone';
      undoneBtn.textContent = 'Undone';
      undoneBtn.setAttribute('data-index', i);
      undoneBtn.onclick = function() {
        var idx = parseInt(this.getAttribute('data-index'));
        items[idx].done = false;
        render();
      };
      actions.appendChild(undoneBtn);
    }

    var deleteBtn = document.createElement('span');
    deleteBtn.className = 'delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('data-index', i);
    deleteBtn.onclick = function() {
      var idx = parseInt(this.getAttribute('data-index'));
      items.splice(idx, 1);
      render();
    };
    actions.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(actions);
    list.appendChild(li);
  }
}

function additems() {
  var input = document.getElementById('newItemInput');
  var text = input.value.trim();
  if (!text) return;
  items.push({ text: text, done: false });
  input.value = '';
  render();
}

document.getElementById('newItemInput').onkeydown = function(e) {
  if (e.key === 'Enter') additems();
};

render();
