const express = require('express')
const router = express.Router()

const vagaController = require('../controllers/vagaController')

router.post('/vaga', vagaController.cadastrarVaga)
router.put('/vaga', vagaController.editarVaga)

module.exports = router