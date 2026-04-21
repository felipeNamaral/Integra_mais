const express = require("express");
const { getVagasEnviadas} = require("../controllers/VagasEnviadasController");

const router = express.Router();

router.get("/vagasEnviadas", getVagasEnviadas);

module.exports = router;