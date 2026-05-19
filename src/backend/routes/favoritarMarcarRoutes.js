const express = require('express')
const router = express.Router()

const favoritarMarcar = require('../controllers/favoritarMarcarController')
const authMiddleware = require('../middlewares/authMiddleware');
const permitirTipos = require('../middlewares/tipoUsuarioMiddleware');



router.post("/favoritar", authMiddleware, permitirTipos('usuario'), favoritarMarcar.favoritar);
router.delete("/favoritar", authMiddleware, permitirTipos('usuario'), favoritarMarcar.desfavoritar);

router.post("/marcar", authMiddleware, permitirTipos('usuario'), favoritarMarcar.marcar);
router.delete("/marcar", authMiddleware, permitirTipos('usuario'), favoritarMarcar.desmarcar);


module.exports = router
