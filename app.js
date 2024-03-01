// app.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Temporary storage for users (replace this with a database in a real project)
let users = [];

// Route to get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Route to create a new user
app.post('/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).json(user);
});

// Route to get a specific user by ID
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (!user) {
    res.status(404).send('User not found');
  } else {
    res.json(user);
  }
});

// Route to delete a specific user by ID
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.sendStatus(204);
});

// Route to handle DELETE requests to /users
app.delete('/users', (req, res) => {
    // Clear the users array to delete all users
    users = [];
    res.send('All users deleted successfully.');
  });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
