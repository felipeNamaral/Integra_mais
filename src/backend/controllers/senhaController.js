const User = require('../models/User')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { enviarEmailRecuperacaoSenha } = require('../services/emailService')

const mensagemRecuperacao = 'Se o email estiver cadastrado, voce recebera um link de recuperacao em breve.'

const montarUrlBase = (req) => {
  if (process.env.APP_URL) {
    return process.env.APP_URL.replace(/\/$/, '')
  }

  return `${req.protocol}://${req.get('host')}`
}

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
    const empresa = usuario ? null : await User.findByEmailEmpresa(email)
    const conta = usuario || empresa

    if (!conta) {
      return res.status(200).json({
        sucesso: false,
        mensagem: 'Email nao encontrado.'
      })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const link = `${montarUrlBase(req)}/pages/novaSenha.html?token=${token}`

    if (usuario) {
      await User.salvarResetTokenUsuario(email, token)
    } else {
      await User.salvarResetTokenEmpresa(email, token)
    }

    await enviarEmailRecuperacaoSenha(email, link)

    return res.status(200).json({
      sucesso: true,
      mensagem: mensagemRecuperacao
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

    const conta = await User.findByResetToken(token)

    if (!conta) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Token invalido ou expirado.'
      })
    }

    const senhaHash = await bcrypt.hash(novaSenha, 10)

    if (conta.tipo === 'empresa') {
      await User.updateSenhaEmpresa(conta.email, senhaHash)
    } else {
      await User.updateSenhaUsuario(conta.email, senhaHash)
    }

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
