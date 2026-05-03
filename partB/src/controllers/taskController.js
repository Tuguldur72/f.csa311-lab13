const Task = require('../models/Task');

// 1. Ажил үүсгэх (Create)
exports.createTask = async (req, res) => {
  try {
    // Зөвхөн шаардлагатай талбаруудыг л хүлээж авах (Security improvement)
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, error: 'Гарчиг заавал байх ёстой' });
    }

    const newTask = await Task.create({ title, description, priority, dueDate });
    res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// 2. Бүх ажлыг харах (Read All)
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Серверийн алдаа' });
  }
};

// 3. Нэг ажил харах (Read One)
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, error: 'Ажил олдсонгүй' });
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// 4. Ажил засах (Update)
exports.updateTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, priority, status, dueDate },
      { new: true, runValidators: true }
    );
    
    if (!task) return res.status(404).json({ success: false, error: 'Ажил олдсонгүй' });
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// 5. Ажил устгах (Delete)
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ success: false, error: 'Ажил олдсонгүй' });
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};