const express = require("express");
const { getEmpresaPage } = require("../controllers/empresaPageController");
const authMiddleware = require('../middlewares/authMiddleware');
const permitirTipos = require('../middlewares/tipoUsuarioMiddleware');
const router = express.Router();

router.get("/empresa", authMiddleware, permitirTipos('empresa'), getEmpresaPage);

module.exports = router;
