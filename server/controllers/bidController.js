
const Bid = require("../models/Bid");
const Project = require("../models/Project");

const createBid = async (req, res) => {
  try {
    const { projectId, bidAmount, proposal } = req.body;

    if (!projectId || !bidAmount || !proposal) {
      return res.status(400).json({
        message: "Project, bid amount and proposal are required",
      });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.status !== "Open") {
      return res.status(400).json({
        message: "This project is no longer open",
      });
    }

    const existingBid = await Bid.findOne({
      project: projectId,
      freelancer: req.user.id,
    });

    if (existingBid) {
      return res.status(400).json({
        message: "You have already applied for this project",
      });
    }

    const bid = await Bid.create({
      project: projectId,
      freelancer: req.user.id,
      bidAmount,
      proposal,
    });

    res.status(201).json({
      message: "Bid submitted successfully",
      bid,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProjectBids = async (req, res) => {
  try {
    const bids = await Bid.find({
      project: req.params.projectId,
    })
      .populate("freelancer", "name email")
      .populate("project", "title budget");

    res.json(bids);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getFreelancerBids = async (req, res) => {
  try {
    const bids = await Bid.find({
      freelancer: req.user.id,
    })
      .populate("project", "title budget status deadline")
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateBidStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid bid status",
      });
    }

    const bid = await Bid.findById(req.params.id);

    if (!bid) {
      return res.status(404).json({
        message: "Bid not found",
      });
    }

    bid.status = status;
    await bid.save();

    if (status === "Accepted") {
      await Project.findByIdAndUpdate(bid.project, {
        status: "In Progress",
        freelancer: {
          name: "Assigned",
        },
      });
    }

    res.json({
      message: `Bid ${status.toLowerCase()} successfully`,
      bid,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBid,
  getProjectBids,
  getFreelancerBids,
  updateBidStatus,
};
