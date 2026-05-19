const express = require("express");
const { getVagasFavoritadas} = require("../controllers/VagasFavoritadasController");
const authMiddleware = require('../middlewares/authMiddleware');
const permitirTipos = require('../middlewares/tipoUsuarioMiddleware');
const router = express.Router();

router.get("/vagasFavoritadas", authMiddleware, permitirTipos('usuario'), getVagasFavoritadas);

module.exports = router;
