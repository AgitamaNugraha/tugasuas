const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a task by ID
router.get('/:id', getTask, (req, res) => {
  res.json(res.task);
});

// Create a new task
router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a task
router.patch('/:id', getTask, async (req, res) => {
  if (req.body.title != null) {
    res.task.title = req.body.title;
  }
  if (req.body.completed != null) {
    res.task.completed = req.body.completed;
  }
  try {
    const updatedTask = await res.task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
router.delete('/:id', getTask, async (req, res) => {
  try {
    await res.task.remove();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTask(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.task = task;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
