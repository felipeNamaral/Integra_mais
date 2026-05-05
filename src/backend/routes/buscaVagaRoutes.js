const express = require("express");
const { getVaga} = require("../controllers/buscaVagaController");

const router = express.Router();

router.get("/vaga", getVaga);

module.exports = router;