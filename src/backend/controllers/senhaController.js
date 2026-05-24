const User = require('../models/User')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const recuperarSenha = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Email e obrigatorio para recuperar a senha.'
      })
    }

    const usuario = await User.findByEmail(email)

    if (!usuario) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Email nao cadastrado.'
      })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expira = new Date(Date.now() + 60 * 60 * 1000)

    await User.salvarResetTokenUsuario(email, token, expira)

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Solicitacao de recuperacao de senha enviada com sucesso.',
      token,
      link: `/pages/novaSenha.html?token=${token}`
    })
  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao recuperar senha.',
      erro: error.message
    })
  }
}

const redefinirSenha = async (req, res) => {
  try {
    const { token, novaSenha, confirmarSenha } = req.body

    if (!token || !novaSenha || !confirmarSenha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Token, nova senha e confirmacao de senha sao obrigatorios.'
      })
    }

    if (novaSenha !== confirmarSenha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'A confirmacao de senha nao confere.'
      })
    }

    const usuario = await User.findByResetToken(token)

    if (!usuario) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Token invalido ou expirado.'
      })
    }

    const senhaHash = await bcrypt.hash(novaSenha, 10)
    await User.updateSenhaUsuario(usuario.email, senhaHash)

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Senha redefinida com sucesso.'
    })
  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao redefinir senha.',
      erro: error.message
    })
  }
}

module.exports = {
  recuperarSenha,
  redefinirSenha
}
