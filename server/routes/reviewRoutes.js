const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  createReview,
  getFreelancerReviews,
  getProjectReview,
} = require("../controllers/reviewController");

const router = express.Router();

router.post("/", protect, createReview);
router.get("/freelancer/:freelancerId", getFreelancerReviews);
router.get("/project/:projectId", getProjectReview);

module.exports = router;
