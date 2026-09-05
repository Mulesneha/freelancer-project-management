
const Review = require("../models/Review");
const Project = require("../models/Project");

const createReview = async (req, res) => {
  try {
    const {
      projectId,
      freelancerId,
      rating,
      comment,
    } = req.body;

    if (!projectId || !freelancerId || !rating || !comment) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.status !== "Completed") {
      return res.status(400).json({
        message: "You can review only completed projects",
      });
    }

    const existingReview = await Review.findOne({
      project: projectId,
      client: req.user.id,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this project",
      });
    }

    const review = await Review.create({
      project: projectId,
      client: req.user.id,
      freelancer: freelancerId,
      rating,
      comment,
    });

    const populatedReview = await Review.findById(review._id)
      .populate("client", "name email")
      .populate("freelancer", "name email")
      .populate("project", "title");

    res.status(201).json({
      message: "Review submitted successfully",
      review: populatedReview,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getFreelancerReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      freelancer: req.params.freelancerId,
    })
      .populate("client", "name")
      .populate("project", "title")
      .sort({ createdAt: -1 });

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / totalReviews;

    res.status(200).json({
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProjectReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      project: req.params.projectId,
    })
      .populate("client", "name")
      .populate("freelancer", "name")
      .populate("project", "title");

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createReview,
  getFreelancerReviews,
  getProjectReview,
};
