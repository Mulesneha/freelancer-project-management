const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    createTask,
    getTasks,
    updateTaskStatus,
    deleteTask
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTaskStatus);
router.delete("/:id", protect, deleteTask);

module.exports = router;