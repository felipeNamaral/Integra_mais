const express = require("express");
const { getVagasEnviadas} = require("../controllers/VagasEnviadasController");
const authMiddleware = require('../middlewares/authMiddleware');
const permitirTipos = require('../middlewares/tipoUsuarioMiddleware');
const router = express.Router();

router.get("/vagasEnviadas", authMiddleware, permitirTipos('usuario'), getVagasEnviadas);

module.exports = router;
