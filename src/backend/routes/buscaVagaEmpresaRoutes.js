const express = require("express");
const { buscaVagaEmpresa } = require("../controllers/buscaVagaEmpresaController");
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/Vagasempresa",authMiddleware,buscaVagaEmpresa);

module.exports = router;