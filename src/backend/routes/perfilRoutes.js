const express = require('express')
const router = express.Router()

const perfilController = require('../controllers/perfilController')
const authMiddleware = require('../middlewares/authMiddleware');
// edição de perfil do usuário
router.put('/perfil/usuario',authMiddleware, perfilController.atualizarPerfilUsuario)

// edição de perfil da empresa
router.put('/perfil/empresa',authMiddleware, perfilController.atualizarPerfilEmpresa)

module.exports = router