const express = require('express')
const router = express.Router()

const vagaController = require('../controllers/vagaController')
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/vaga', authMiddleware, vagaController.cadastrarVaga);
router.put('/vaga', authMiddleware, vagaController.editarVaga);
router.delete('/vaga/:id', authMiddleware, vagaController.excluirVaga);

module.exports = router