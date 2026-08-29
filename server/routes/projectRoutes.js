const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Create a new project
router.post("/", async (req, res) => {
  try {
    const { title, description, budget, skills, deadline } = req.body;

    if (!title || !description || !budget || !skills || !deadline) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const project = await Project.create({
      title,
      description,
      budget,
      skills,
      deadline,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("Create project error:", error.message);

    res.status(500).json({
      message: "Server error while creating project",
    });
  }
});

module.exports = router;