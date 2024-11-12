document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');

    const openColumn = document.getElementById('openColumn');
    const bidColumn = document.getElementById('bidColumn');
    const inProgressColumn = document.getElementById('inProgressColumn');
    const doneColumn = document.getElementById('doneColumn');

    const openTasks = document.getElementById('openTasks');
    const bidTasks = document.getElementById('bidTasks');
    const inProgressTasks = document.getElementById('inProgressTasks');
    const doneTasks = document.getElementById('doneTasks');

    // Carregar tarefas do localStorage
    loadTasks();

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const task = { text: taskText, status: 'open' };
            addTaskToColumn(task);
            saveTaskToLocalStorage(task);
            taskInput.value = '';
        }
    });

    function addTaskToColumn(task) {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task-card');
        taskElement.draggable = true;
        taskElement.innerHTML = `
            <span>${task.text}</span>
            <button class="deleteBtn">Excluir</button>
        `;
        taskElement.style.backgroundColor = getTaskBackgroundColor(task.status);

        // Botão de exclusão
        taskElement.querySelector('.deleteBtn').addEventListener('click', () => {
            taskElement.remove();
            deleteTaskFromLocalStorage(task.text);
        });

        taskElement.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', task.text);
        });

        // Adiciona a tarefa à coluna correta
        if (task.status === 'open') openTasks.appendChild(taskElement);
        if (task.status === 'bid') bidTasks.appendChild(taskElement);
        if (task.status === 'inProgress') inProgressTasks.appendChild(taskElement);
        if (task.status === 'done') doneTasks.appendChild(taskElement);
    }

    function getTaskBackgroundColor(status) {
        switch (status) {
            case 'open': return '#f0f8ff';
            case 'bid': return '#fff3cd';
            case 'inProgress': return '#cce5ff';
            case 'done': return '#d4edda';
        }
    }

    // Função para salvar tarefas no localStorage
    function saveTaskToLocalStorage(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Função para carregar tarefas do localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToColumn(task);
        });
    }

    // Função para excluir tarefa do localStorage
    function deleteTaskFromLocalStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Permitir arrastar tarefas entre colunas
    [openColumn, bidColumn, inProgressColumn, doneColumn].forEach(column => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        column.addEventListener('drop', (e) => {
            e.preventDefault();
            const taskText = e.dataTransfer.getData('text');
            const taskElement = Array.from(document.querySelectorAll('.task-card')).find(el => el.querySelector('span').textContent === taskText);
            const newStatus = column.id.replace('Column', '');
            if (taskElement) {
                taskElement.style.backgroundColor = getTaskBackgroundColor(newStatus);
                const task = { text: taskText, status: newStatus };
                updateTaskStatusInLocalStorage(task);
                column.querySelector('.task-list').appendChild(taskElement);
            }
        });
    });

    // Atualizar status da tarefa no localStorage
    function updateTaskStatusInLocalStorage(updatedTask) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => task.text === updatedTask.text ? updatedTask : task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});