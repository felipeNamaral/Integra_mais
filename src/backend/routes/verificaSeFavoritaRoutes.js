const express = require("express");
const { verificaSeFavorita } = require("../controllers/verificaSeFavoritaController");
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/verificaSeFavorita",authMiddleware, verificaSeFavorita);

module.exports = router;