const express = require('express');
const router = express.Router();
const { createTask, getAllTasks } = require('../controllers/taskController');

router.route('/').get(getAllTasks).post(createTask);

module.exports = router;