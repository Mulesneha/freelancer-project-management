
const express = require("express");

const {
  createBid,
  getProjectBids,
  getFreelancerBids,
  updateBidStatus,
} = require("../controllers/bidController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createBid);

router.get(
  "/project/:projectId",
  authMiddleware,
  getProjectBids
);

router.get(
  "/my-bids",
  authMiddleware,
  getFreelancerBids
);

router.put(
  "/:id/status",
  authMiddleware,
  updateBidStatus
);

module.exports = router;
