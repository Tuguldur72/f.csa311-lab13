const Task = require('../models/Task');

// Шинэ ажил үүсгэх
exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Бүх ажлыг харах
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
exports.getAllTasks = getAllTasks;