document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const totalCount = document.getElementById('total-count');
    const completedCount = document.getElementById('completed-count');

    // Load saved tasks array from localStorage, or start fresh with empty array
    let tasks = JSON.parse(localStorage.getItem('my-tasks')) || [];

    // Updates dashboard counter metrics values
    function updateStats() {
        totalCount.textContent = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        completedCount.textContent = completed;
    }

    // Handles local database engine memory persistence syncs
    function saveTasks() {
        localStorage.setItem('my-tasks', JSON.stringify(tasks));
        updateStats();
    }

    // Clear old elements from the DOM and map refreshed layout records arrays
    function renderTasks() {
        taskList.innerHTML = ''; 

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;

            li.innerHTML = `
                <span class="task-text" onclick="toggleTask(${index})">${task.text}</span>
                <button class="delete-btn" onclick="deleteTask(${index})">❌</button>
            `;

            taskList.appendChild(li);
        });

        updateStats();
    }

    // Handles pushing objects into tracking arrays safely on submission
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            tasks.push({
                text: taskText,
                completed: false
            });

            taskInput.value = ''; 
            saveTasks();
            renderTasks();
        }
    });

    // Inverts individual state status tags dynamically
    window.toggleTask = function(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    // Splices target keys directly from structural database arrays
    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    // Initial lifecycle state mount rendering trigger execution
    renderTasks();
});
