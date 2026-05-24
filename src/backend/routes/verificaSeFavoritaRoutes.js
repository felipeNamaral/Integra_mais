const express = require("express");
const { verificaSeFavorita } = require("../controllers/verificaSeFavoritaController");
const authMiddleware = require('../middlewares/authMiddleware');
const permitirTipos = require('../middlewares/tipoUsuarioMiddleware');
const router = express.Router();

router.get("/verificaSeFavorita", authMiddleware, permitirTipos('usuario'), verificaSeFavorita);

module.exports = router;
