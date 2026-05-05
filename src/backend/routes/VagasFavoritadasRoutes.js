const express = require("express");
const { getVagasFavoritadas} = require("../controllers/VagasFavoritadasController");
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/vagasFavoritadas",authMiddleware, getVagasFavoritadas);

module.exports = router;