const express = require("express");
const { getUnidades } = require("../controllers/healthController");

const router = express.Router();

router.get("/unidades", getUnidades);

module.exports = router;