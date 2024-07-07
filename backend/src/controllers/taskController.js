const { Task } = require('../models');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json({
      code: 0,
      info: 'Success',
      data: tasks
    });
  } catch (err) {
    res.status(500).json({
      code: 1,
      info: err.message,
      data: []
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json({
      code: 0,
      info: 'Task created successfully',
      data: [newTask]
    });
  } catch (err) {
    res.status(400).json({
      code: 1,
      info: err.message,
      data: []
    });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task == null) {
      return res.status(404).json({
        code: 1,
        info: 'Task not found',
        data: []
      });
    }
    res.json({
      code: 0,
      info: 'Success',
      data: [task]
    });
  } catch (err) {
    res.status(500).json({
      code: 1,
      info: err.message,
      data: []
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.update(req.body, {
      where: { task_id: req.params.id }
    });
    if (!updatedTask[0]) {
      return res.status(404).json({
        code: 1,
        info: 'Task not found',
        data: []
      });
    }
    res.json({
      code: 0,
      info: 'Task updated successfully',
      data: []
    });
  } catch (err) {
    res.status(400).json({
      code: 1,
      info: err.message,
      data: []
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.destroy({
      where: { task_id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({
        code: 1,
        info: 'Task not found',
        data: []
      });
    }
    res.json({
      code: 0,
      info: 'Task deleted successfully',
      data: []
    });
  } catch (err) {
    res.status(500).json({
      code: 1,
      info: err.message,
      data: []
    });
  }
};
