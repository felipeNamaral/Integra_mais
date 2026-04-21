const express = require('express')
const router = express.Router()

const perfilController = require('../controllers/perfilController')

// edição de perfil do usuário
router.put('/perfil/usuario', perfilController.atualizarPerfilUsuario)

// edição de perfil da empresa
router.put('/perfil/empresa', perfilController.atualizarPerfilEmpresa)

module.exports = router