const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', authController.login);

router.get('/protected', authMiddleware, (req, res) => {
  res.json({
    id: req.user.id,
    nome: req.user.nome,
    email: req.user.email
  });
});


module.exports = router;