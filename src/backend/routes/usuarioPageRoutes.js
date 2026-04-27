const express = require("express");
const { getUsuarioPage } = require("../controllers/ususarioPageController");
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/usuario",authMiddleware, getUsuarioPage);

module.exports = router;