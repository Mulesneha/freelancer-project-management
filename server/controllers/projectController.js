const Project = require("../models/Project");

const createProject = async (req, res) => {
    try {
        const { title, description, budget } = req.body;

        const project = await Project.create({
            title,
            description,
            budget,
            client: req.user.id
        });

        res.status(201).json(project);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate("client", "name email")
            .populate("freelancer", "name email");

        res.json(projects);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createProject,
    getProjects
};