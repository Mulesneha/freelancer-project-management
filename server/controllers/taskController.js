const Task = require("../models/Task");

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, project, assignedTo } = req.body;

        const task = await Task.create({
            title,
            description,
            project,
            assignedTo
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate("project", "title")
            .populate("assignedTo", "name email");

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update task status
const updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTaskStatus,
    deleteTask
};