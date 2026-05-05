const express = require("express");
const { getEmpresaPage } = require("../controllers/empresaPageController");
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/empresa",authMiddleware, getEmpresaPage);

module.exports = router;