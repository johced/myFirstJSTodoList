class Todo {
	constructor(name, id, complete, checked) {
		this.name = name;
		this.id = id;
		this.complete = complete;
		this.checked = checked;
	}
}

let toDoList = [];

window.onload = function () {
	preSets();
	document.getElementById('addBtn').addEventListener('click', createTodo);
	document.getElementById('myInput').addEventListener('keypress', e => e.keyCode === 13 && createTodo());
	renderHTML();
};

function preSets() {
	let toDo = new Todo('Example 1', 1, false, false);
	let toDo2 = new Todo('Example 2', 2, false, false);
	let toDo3 = new Todo('Example 3', 3, false, false);

	toDoList.push(toDo);
	toDoList.push(toDo2);
	toDoList.push(toDo3);
}

function createTodo() {
	let newTodo = document.getElementById('myInput').value;

	if (newTodo === '') {
		alert('You must write something');
	} else {
		let toDo = new Todo(newTodo, new Date().getTime(), false, false);
		toDoList.push(toDo);

		renderHTML();
		document.getElementById('myInput').value = '';
	}
}

function renderHTML() {
	let ulElement = document.getElementById('toDoList');
	ulElement.innerHTML = '';

	for (let i = 0; i < toDoList.length; i++) {
		if (toDoList[i].complete == false) {
			let liElement = document.createElement('li');
			liElement.className = 'todoLi';

			let checkElement = document.createElement('input');
			checkElement.id = 'checkBtn';
			checkElement.type = 'checkbox';
			checkElement.checked = toDoList[i].checked;
			checkElement.addEventListener('click', () => {
				checkToggle(toDoList[i]);
			});

			let deleteButton = document.createElement('button');
			deleteButton.id = 'deleteBtn';
			deleteButton.innerHTML = '<i class="fas fa-times"></i>';
			deleteButton.addEventListener('click', () => {
				deleteToDo(toDoList[i]);
			});

			let sortButton = document.createElement('button');
			sortButton.id = 'sortBtn';
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
			spanDelete.appendChild(deleteButton);
		}
	}
}

function deleteToDo(toDo) {
	toDo.complete = !toDo.complete;
	if (toDo.complete == true) {
		let test = toDoList.indexOf(toDo);
		toDoList.splice(test, 1);
		toDoList.push(toDo);
		renderHTML();
	}
}

function resetDelete() {
	for (let i = toDoList.length - 1; i >= 0; i--) {
		if (toDoList[i].complete == false) {
			alert('You have nothing in trash');
			break;
		} else {
			let crap = toDoList[i];
			if (toDoList[i].complete == true) {
				let move = toDoList.indexOf(crap);
				toDoList.splice(move, 1);
				toDoList.unshift(crap);
				crap.complete = !crap.complete;
				renderHTML();
				break;
			}
		}
	}
}

function toiletDelete() {
	let warning = confirm('Are you sure you want to delete Everything?');
	if (warning == true) {
		for (let i = 0; toDoList.length; i++) {
			toDoList.splice(i);
		}
		renderHTML();
	} else {
		alert("Thank God you didn't press ok!");
	}
}

function checkToggle(toggleMe) {
	toggleMe.checked = !toggleMe.checked;
}

function sortTodo(toDo) {
	for (let i = 0; i < toDoList.length; i++) {
		if (toDoList[i] == toDo) {
			toDoList.splice(i, 1);
			toDoList.splice(0, 0, toDo);
		}
	}
	renderHTML();
}