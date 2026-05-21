const express = require("express");
const healthController = require("../controllers/healthController");
const authMiddleware = require("../middlewares/authMiddleware");
const permitirTipos = require("../middlewares/tipoUsuarioMiddleware");

const router = express.Router();

router.get("/unidades", healthController.getUnidades);
router.get("/unidades/favoritas", authMiddleware, permitirTipos("usuario"), healthController.getUnidadesFavoritas);
router.get("/unidades/favorita", authMiddleware, permitirTipos("usuario"), healthController.verificaSeUnidadeFavorita);
router.post("/unidades/favorita", authMiddleware, permitirTipos("usuario"), healthController.favoritarUnidade);
router.delete("/unidades/favorita", authMiddleware, permitirTipos("usuario"), healthController.desfavoritarUnidade);

module.exports = router;
