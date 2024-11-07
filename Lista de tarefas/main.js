document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const taskCount = document.getElementById("taskCount");

    function updateTaskCount() {
        const totalTasks = taskList.children.length;
        taskCount.textContent = `Total de tarefas: ${totalTasks}`;
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Por favor, adicione uma descrição para a tarefa.");
            return;
        }

        const taskItem = document.createElement("li");
        taskItem.textContent = taskText;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.addEventListener("click", () => {
            taskList.removeChild(taskItem);
            updateTaskCount();
        });

        taskItem.appendChild(removeBtn);
        taskList.appendChild(taskItem);

        taskInput.value = "";
        updateTaskCount();
    }

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });
});