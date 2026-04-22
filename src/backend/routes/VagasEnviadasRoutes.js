const express = require("express");
const { getVagasEnviadas} = require("../controllers/VagasEnviadasController");
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/vagasEnviadas",authMiddleware, getVagasEnviadas);

module.exports = router;