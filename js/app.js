document.getElementById('addTodoButton').addEventListener('click', () => {
    const input = document.getElementById('todoInput');
    const task = input.value.trim();
  
    if (task) {
        const list = document.getElementById('todoList');
  
        // Crear el contenedor del elemento
        const li = document.createElement('li');
        li.className = 'todo-item';
  
        // Crear el div para el texto
        const textDiv = document.createElement('div');
        textDiv.className = 'todo-text';
        textDiv.textContent = task;
  
        // Crear el div para los botones
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'todo-buttons';
  
        // Botón para completar
        const completeButton = document.createElement('button');
        completeButton.className = 'verde';
        completeButton.textContent = '✔';
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTodos(); // Actualizar la lista en localStorage
        });
  
        // Botón para eliminar
        const deleteButton = document.createElement('button');
        deleteButton.className = 'rojo';
        deleteButton.textContent = '✖';
        deleteButton.addEventListener('click', () => {
            list.removeChild(li);
            saveTodos(); // Actualizar la lista en localStorage
        });
  
        // Agregar los botones al div de botones
        buttonsDiv.appendChild(completeButton);
        buttonsDiv.appendChild(deleteButton);
  
        // Agregar los divs al elemento de lista
        li.appendChild(textDiv);
        li.appendChild(buttonsDiv);
  
        // Agregar el elemento de lista a la lista
        list.appendChild(li);
  
        // Limpiar el input
        input.value = '';
  
        saveTodos(); // Guardar la lista en localStorage
    }
  });
  
  // Función para guardar los elementos en localStorage
  function saveTodos() {
    const list = document.getElementById('todoList');
    const todos = [];
  
    list.querySelectorAll('li').forEach(li => {
        const text = li.querySelector('.todo-text').textContent;
        const completed = li.classList.contains('completed');
        todos.push({ text, completed });
    });
  
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  
  // Función para cargar los elementos desde localStorage
  function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const list = document.getElementById('todoList');
  
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (todo.completed) li.classList.add('completed');
  
        const textDiv = document.createElement('div');
        textDiv.className = 'todo-text';
        textDiv.textContent = todo.text;
  
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'todo-buttons';
  
        const completeButton = document.createElement('button');
        completeButton.className = 'verde';
        completeButton.textContent = '✔';
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTodos();
        });
  
        const deleteButton = document.createElement('button');
        deleteButton.className = 'rojo';
        deleteButton.textContent = '✖';
        deleteButton.addEventListener('click', () => {
            list.removeChild(li);
            saveTodos();
        });
  
        buttonsDiv.appendChild(completeButton);
        buttonsDiv.appendChild(deleteButton);
  
        li.appendChild(textDiv);
        li.appendChild(buttonsDiv);
  
        list.appendChild(li);
    });
  }
  
  // Cargar la lista al iniciar
  loadTodos();
  