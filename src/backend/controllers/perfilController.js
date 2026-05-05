const atualizarPerfilUsuario = async (req, res) => {
  try {
    const {
      nome,
      email,
      telefone,
      idade,
      nacionalidade,
      escolaridade,
      formacao,
      idiomas,
      descricao
    } = req.body

    if (!nome || !email) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Nome e email são obrigatórios para atualizar o perfil.'
      })
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Perfil de usuário atualizado com sucesso.',
      dados: {
        nome,
        email,
        telefone,
        idade,
        nacionalidade,
        escolaridade,
        formacao,
        idiomas,
        descricao
      }
    })
  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao atualizar perfil de usuário.',
      erro: error.message
    })
  }
}

const atualizarPerfilEmpresa = async (req, res) => {
  try {
    const {
      nomeEmpresa,
      email,
      telefone,
      descricao
    } = req.body

    if (!nomeEmpresa || !email) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Nome da empresa e email são obrigatórios.'
      })
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Perfil da empresa atualizado com sucesso.',
      dados: {
        nomeEmpresa,
        email,
        telefone,
        descricao
      }
    })
  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao atualizar perfil da empresa.',
      erro: error.message
    })
  }
}

module.exports = {
  atualizarPerfilUsuario,
  atualizarPerfilEmpresa
}