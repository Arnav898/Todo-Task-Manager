const Task = require('../models/Task');


exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: tasks
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        
        if (!title) {
            return res.status(400).json({
                success: false,
                error: 'Title is required'
            });
        }

        const task = new Task({
            title,
            description
        });

        const savedTask = await task.save();
        console.log('Task created successfully:', savedTask);
        
        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: savedTask
        });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}; 