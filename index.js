const express = require('express');
const fs = require('fs'); 

const app = express();
const port = 8080;

// todos 
let todos = [
  { id: 1, title: 'Buy milk', completed: false },
  { id: 2, title: 'Finish project', completed: true },
  { id: 3, title: 'Walk the dog', completed: false },
];


// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const newTodo = req.body; // 
  if (!newTodo.title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  // Find the highest ID 
  newTodo.id = Math.max(...todos.map(todo => todo.id)) + 1;
  newTodo.completed = false; 
  todos.push(newTodo);

  
  res.json(newTodo);
});

// Update even-numbered todos with status: false to completed (true)
app.put('/todos/complete-even', (req, res) => {
  for (let todo of todos) {
    if (todo.id % 2 === 0 && !todo.completed) { 
      todo.completed = true;
    }
  }
  res.json({ message: 'Even-numbered todos marked as completed' });
});

// Delete all todos with completed status: true
app.delete('/todos/completed', (req, res) => {
  todos = todos.filter(todo => !todo.completed); 
  res.json({ message: 'Completed todos deleted' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
