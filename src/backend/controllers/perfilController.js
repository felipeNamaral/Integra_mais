const perfilModel = require('../models/perfilModel')

const atualizarPerfilUsuario = async (req, res) => {
  try {
    const {
      nome,
      email,
      telefone,
      nacionalidade,
      escolaridade,
      formacao,
      idiomas,
      descricao
    } = req.body

    if (!nome || !email) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Nome e email sao obrigatorios para atualizar o perfil.'
      })
    }

    await perfilModel.atualizarUsuario(req.user.id, {
      nome,
      email,
      telefone,
      nacionalidade,
      escolaridade,
      formacao,
      idiomas,
      descricao
    })

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Perfil de usuario atualizado com sucesso.',
      dados: {
        nome,
        email,
        telefone,
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
      mensagem: 'Erro ao atualizar perfil de usuario.',
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
      endereco,
      cnpj,
      descricao
    } = req.body

    if (!nomeEmpresa || !email) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Nome da empresa e email sao obrigatorios.'
      })
    }

    await perfilModel.atualizarEmpresa(req.user.id, {
      nomeEmpresa,
      email,
      telefone,
      endereco,
      cnpj,
      descricao
    })

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Perfil da empresa atualizado com sucesso.',
      dados: {
        nomeEmpresa,
        email,
        telefone,
        endereco,
        cnpj,
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
