const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

// CREATE PROJECT
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      budget,
      skills,
      deadline,
    } = req.body;

    // Validation
    if (!title || !description || !budget || !deadline) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const project = new Project({
      title,
      description,
      budget,
      skills: skills || [],
      deadline,
    });

    const savedProject = await project.save();

    res.status(201).json({
      message: "Project created successfully",
      project: savedProject,
    });

  } catch (error) {
    console.error("Create project error:", error);

    res.status(500).json({
      message: "Failed to create project",
      error: error.message,
    });
  }
});


// GET ALL PROJECTS
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({
      createdAt: -1,
    });

    res.status(200).json(projects);

  } catch (error) {
    console.error("Get projects error:", error);

    res.status(500).json({
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
});


module.exports = router;