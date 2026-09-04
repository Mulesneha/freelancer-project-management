
const express = require("express");

const {
  createBid,
  getProjectBids,
  getFreelancerBids,
  updateBidStatus,
} = require("../controllers/bidController");

const router = express.Router();

router.post("/", createBid);

router.get("/project/:projectId", getProjectBids);

router.get("/freelancer", getFreelancerBids);

router.put("/:id/status", updateBidStatus);

module.exports = router;
