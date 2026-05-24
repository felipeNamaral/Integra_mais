const recuperarSenha = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Email e obrigatorio para recuperar a senha.'
      })
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Solicitacao de recuperacao de senha enviada com sucesso.'
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
