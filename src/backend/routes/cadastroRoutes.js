const express = require('express')
const router = express.Router()

const cadastroController = require('../controllers/cadastroController')

router.post('/cadastro/usuario', cadastroController.cadastrarUsuario)
router.post('/cadastro/empresa', cadastroController.cadastrarEmpresa)

module.exports = router