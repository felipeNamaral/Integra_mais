const User = require('../models/User')
const bcrypt = require('bcrypt')

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

    if (!usuario && !empresa) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Email nao cadastrado.'
      })
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Email encontrado. Informe a nova senha para continuar.'
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
    const { email, novaSenha, confirmarSenha } = req.body

    if (!email || !novaSenha || !confirmarSenha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Email, nova senha e confirmacao de senha sao obrigatorios.'
      })
    }

    if (novaSenha !== confirmarSenha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'A confirmacao de senha nao confere.'
      })
    }

    const usuario = await User.findByEmail(email)
    const empresa = usuario ? null : await User.findByEmailEmpresa(email)

    if (!usuario && !empresa) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Email nao cadastrado.'
      })
    }

    const senhaHash = await bcrypt.hash(novaSenha, 10)

    if (usuario) {
      await User.updateSenhaUsuario(email, senhaHash)
    } else {
      await User.updateSenhaEmpresa(email, senhaHash)
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
