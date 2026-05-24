const express = require("express");
const router = express.Router();

const avatarController = require("../controllers/avatarController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/avatar", authMiddleware, avatarController.getAvatar);
router.post("/avatar", authMiddleware, avatarController.uploadAvatar);

module.exports = router;
