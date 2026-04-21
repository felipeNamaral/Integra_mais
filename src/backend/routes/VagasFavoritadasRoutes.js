const express = require("express");
const { getVagasFavoritadas} = require("../controllers/VagasFavoritadasController");

const router = express.Router();

router.get("/vagasFavoritadas", getVagasFavoritadas);

module.exports = router;