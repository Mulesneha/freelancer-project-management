
const express = require("express");

const {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getMyNotifications
);

router.put(
  "/read-all",
  authMiddleware,
  markAllAsRead
);

router.put(
  "/:id/read",
  authMiddleware,
  markAsRead
);

router.delete(
  "/:id",
  authMiddleware,
  deleteNotification
);

module.exports = router;