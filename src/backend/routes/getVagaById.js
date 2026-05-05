const express = require("express");
const { getVagaById } = require("../controllers/getVagaById");

const router = express.Router();

router.get("/vagaById", getVagaById);

module.exports = router;