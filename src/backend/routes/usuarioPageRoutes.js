const express = require("express");
const { getUsuarioPage } = require("../controllers/ususarioPageController");

const router = express.Router();

router.get("/usuario", getUsuarioPage);

module.exports = router;