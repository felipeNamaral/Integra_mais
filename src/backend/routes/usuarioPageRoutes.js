const express = require("express");
const { getUsuarioPage } = require("../controllers/ususarioPageController");
const authMiddleware = require('../middlewares/authMiddleware');
const permitirTipos = require('../middlewares/tipoUsuarioMiddleware');
const router = express.Router();

router.get("/usuario", authMiddleware, permitirTipos('usuario'), getUsuarioPage);

module.exports = router;
