const express = require('express')
const router = express.Router()

const senhaController = require('../controllers/senhaController')

router.post('/recuperar-senha', senhaController.recuperarSenha)
router.put('/redefinir-senha', senhaController.redefinirSenha)

module.exports = router
