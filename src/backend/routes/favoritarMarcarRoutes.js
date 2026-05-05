const express = require('express')
const router = express.Router()

const favoritarMarcar = require('../controllers/favoritarMarcarController')
const authMiddleware = require('../middlewares/authMiddleware');



router.post("/favoritar", authMiddleware, favoritarMarcar.favoritar);
router.delete("/favoritar", authMiddleware, favoritarMarcar.desfavoritar);

router.post("/marcar", authMiddleware, favoritarMarcar.marcar);
router.delete("/marcar", authMiddleware, favoritarMarcar.desmarcar);


module.exports = router