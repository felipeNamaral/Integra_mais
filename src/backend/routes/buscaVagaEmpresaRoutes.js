const express = require("express");
const { buscaVagaEmpresa } = require("../controllers/buscaVagaEmpresaController");
const authMiddleware = require('../middlewares/authMiddleware');
const permitirTipos = require('../middlewares/tipoUsuarioMiddleware');
const router = express.Router();

router.get("/Vagasempresa", authMiddleware, permitirTipos('empresa'), buscaVagaEmpresa);

module.exports = router;
