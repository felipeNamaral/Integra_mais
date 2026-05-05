const express = require("express");
const { verificaSeEnviado } = require("../controllers/verificaSeEnviadoController");
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/verificaSeEnviado",authMiddleware, verificaSeEnviado);

module.exports = router;