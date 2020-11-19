class Todo {
	constructor(name, id, complete, checked) {
		this.name = name;
		this.id = id;
		this.complete = complete;
		this.checked = checked;
	}
}
// Get from localStorage
let toDoListAsTextFromLS = localStorage.getItem('toDoList');
let toDoListFromLS = JSON.parse(toDoListAsTextFromLS);

let toDoList = [];

window.onload = function () {
	document.getElementById('addBtn').addEventListener('click', createTodo);
	document.getElementById('myInput').addEventListener('keypress', e => e.keyCode === 13 && createTodo());

	bringBackObjectsFromLS();
	preSets();
	renderHTML();
};

function preSets() {
	if (toDoList.length === 0) {
		let toDo = new Todo('Example 1', 1, false, false);
		let toDo2 = new Todo('Example 2', 2, false, false);
		let toDo3 = new Todo('Example 3', 3, false, false);

		toDoList.push(toDo);
		toDoList.push(toDo2);
		toDoList.push(toDo3);
	}
}

function createTodo() {
	let newTodo = document.getElementById('myInput').value;

	if (newTodo === '') {
		alert('You must write something');
	} else {
		let toDo = new Todo(newTodo, new Date().getTime(), false, false);
		toDoList.push(toDo);

		// Saving to localStorage
		let toDoListAsText = JSON.stringify(toDoList);
		localStorage.setItem('toDoList', toDoListAsText);

		renderHTML();
		document.getElementById('myInput').value = '';
	}
}

function bringBackObjectsFromLS() {
	for (let i = 0; i < toDoListFromLS.length; i++) {
		let todo = new Todo(toDoListFromLS[i].name, toDoListFromLS[i].id, toDoListFromLS[i].complete, toDoListFromLS[i].checked);
		toDoList.push(todo);
		renderHTML();
	}
}

function renderHTML() {
	let ulElement = document.getElementById('todoUlList');
	ulElement.innerHTML = '';

	for (let i = 0; i < toDoList.length; i++) {
		if (toDoList[i].complete == false) {
			let liElement = document.createElement('li');
			liElement.className = 'todoLi';

			let checkElement = document.createElement('input');
			checkElement.type = 'checkbox';
			checkElement.checked = toDoList[i].checked;
			checkElement.addEventListener('click', () => {
				checkToggle(toDoList[i]);
			});

			let removeButton = document.createElement('button');
			removeButton.className = 'removeBtn';
			removeButton.setAttribute('aria-label', 'remove todo');
			removeButton.innerHTML = '<i class="fas fa-times"></i>';
			removeButton.addEventListener('click', () => {
				removeToDo(toDoList[i]);
			});

			let sortButton = document.createElement('button');
			sortButton.className = 'sortBtn';
			sortButton.setAttribute('aria-label', 'move todo to the top');
			sortButton.innerHTML = '<i class="fas fa-sort-amount-up"></i>';
			sortButton.addEventListener('click', () => {
				sortTodo(toDoList[i]);
			});

			let spanElement = document.createElement('span');
			spanElement.id = 'spanTodo';
			let spanDelete = document.createElement('span');
			spanDelete.id = 'spanDelete';
			let spanMove = document.createElement('span');
			spanMove.id = 'spanMove';

			let text = document.createTextNode(toDoList[i].name + ' ');

			ulElement.appendChild(liElement);
			liElement.appendChild(checkElement);

			liElement.appendChild(spanElement);
			spanElement.appendChild(text);

			liElement.appendChild(spanMove);
			spanMove.appendChild(sortButton);

			liElement.appendChild(spanDelete);
			spanDelete.appendChild(removeButton);
		}
	}
}

function removeToDo(toDo) {
	toDo.complete = !toDo.complete;
	if (toDo.complete == true) {
		let test = toDoList.indexOf(toDo);
		toDoList.splice(test, 1);
		toDoList.push(toDo);
		renderHTML();
		// Test
		let toDoListAsText = JSON.stringify(toDoList);
		localStorage.setItem('toDoList', toDoListAsText);
	}
}

function bringBackRemovedTodo() {
	for (let i = toDoList.length - 1; i >= 0; i--) {
		if (toDoList[i].complete == false) {
			alert('You have nothing in trash');
			break;
		} else {
			let toDo = toDoList[i];
			if (toDoList[i].complete == true) {
				let move = toDoList.indexOf(toDo);
				toDoList.splice(move, 1);
				toDoList.unshift(toDo);
				toDo.complete = !toDo.complete;
				renderHTML();
				// Saving to localStorage
				let toDoListAsText = JSON.stringify(toDoList);
				localStorage.setItem('toDoList', toDoListAsText);
				break;
			}
		}
	}
}

function deleteToDo() {
	let warning = confirm('Are you sure you want to delete Everything?');
	if (warning == true) {
		for (let i = 0; i < toDoList.length; i++) {
			toDoList.splice(i);
			// Saving to localStorage
			let toDoListAsText = JSON.stringify(toDoList);
			localStorage.setItem('toDoList', toDoListAsText);
		}
		renderHTML();
	} else {
		alert("Thank God you didn't press ok!");
	}
}

function checkToggle(toggleMe) {
	toggleMe.checked = !toggleMe.checked;
	// Saving to localStorage
	let toDoListAsText = JSON.stringify(toDoList);
	localStorage.setItem('toDoList', toDoListAsText);
}

function sortTodo(toDo) {
	for (let i = 0; i < toDoList.length; i++) {
		if (toDoList[i] == toDo) {
			toDoList.splice(i, 1);
			toDoList.splice(0, 0, toDo);
			// Saving to localStorage
			let toDoListAsText = JSON.stringify(toDoList);
			localStorage.setItem('toDoList', toDoListAsText);
		}
	}
	renderHTML();
}
