const express = require('express');
const router = express.Router();
const { createTask, getTasks } = require('../controllers/taskController');
const validateTask = require('../middleware/validateTask');


router.get('/', getTasks);

router.post('/', validateTask, createTask);

module.exports = router; 