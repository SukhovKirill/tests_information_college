document.addEventListener('DOMContentLoaded', loadTasks);

const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Пожалуйста, введите задачу.');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
    taskInput.value = '';
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';
    const tasks = getTasks();
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add('completed');
        }

        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Не выполнено' : 'Выполнено';
        completeBtn.addEventListener('click', () => toggleTaskCompletion(task.id));

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Редактировать';
        editBtn.addEventListener('click', () => editTask(task.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(completeBtn);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function toggleTaskCompletion(taskId) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;
    saveTasks(tasks);
    renderTasks();
}

function editTask(taskId) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);
    const newText = prompt('Редактировать задачу:', task.text);
    if (newText !== null) {
        task.text = newText.trim();
        saveTasks(tasks);
        renderTasks();
    }
}

function deleteTask(taskId) {
    const tasks = getTasks().filter(task => task.id !== taskId);
    saveTasks(tasks);
    renderTasks();
}

function getTasks() {
    const tasksJSON = localStorage.getItem('tasks');
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    renderTasks();
}

