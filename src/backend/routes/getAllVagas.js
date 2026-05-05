const express = require("express");
const { getVagaAll} = require("../controllers/getAllVagas");

const router = express.Router();

router.get("/vagaAll", getVagaAll);

module.exports = router;