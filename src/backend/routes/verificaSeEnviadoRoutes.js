const express = require("express");
const { verificaSeEnviado } = require("../controllers/verificaSeEnviadoController");
const authMiddleware = require('../middlewares/authMiddleware');
const permitirTipos = require('../middlewares/tipoUsuarioMiddleware');
const router = express.Router();

router.get("/verificaSeEnviado", authMiddleware, permitirTipos('usuario'), verificaSeEnviado);

module.exports = router;
