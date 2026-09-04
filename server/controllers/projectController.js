
const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      budget,
      skills,
      deadline,
    } = req.body;

    const project = await Project.create({
      title,
      description,
      budget,
      skills,
      deadline,
      client: req.user.id,
    });

    res.status(201).json(project);

  } catch (error) {
    console.error("Create project error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("client", "name email")
      .populate("freelancer", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(projects);

  } catch (error) {
    console.error("Get projects error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
};
