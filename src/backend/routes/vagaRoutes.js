const express = require('express')
const router = express.Router()

const vagaController = require('../controllers/vagaController')
const authMiddleware = require('../middlewares/authMiddleware');
const permitirTipos = require('../middlewares/tipoUsuarioMiddleware');


router.post('/vaga', authMiddleware, permitirTipos('empresa'), vagaController.cadastrarVaga);
router.put('/vaga', authMiddleware, permitirTipos('empresa'), vagaController.editarVaga);
router.delete('/vaga/:id', authMiddleware, permitirTipos('empresa'), vagaController.excluirVaga);

module.exports = router
