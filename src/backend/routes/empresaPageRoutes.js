const express = require("express");
const { getEmpresaPage } = require("../controllers/empresaPageController");

const router = express.Router();

router.get("/empresa", getEmpresaPage);

module.exports = router;