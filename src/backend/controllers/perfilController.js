const perfilModel = require('../models/perfilModel')

const limitarTexto = (valor, limite) => String(valor || '').trim().slice(0, limite)
const limitarNumeros = (valor, limite) => String(valor || '').replace(/\D/g, '').slice(0, limite)

const atualizarPerfilUsuario = async (req, res) => {
  try {
    const {
      nome,
      email,
      telefone,
      dataNascimento,
      nacionalidade,
      escolaridade,
      formacao,
      idiomas,
      descricao
    } = req.body

    const dadosUsuario = {
      nome: limitarTexto(nome, 100),
      email: limitarTexto(email, 100),
      telefone: limitarNumeros(telefone, 15),
      dataNascimento: dataNascimento || null,
      nacionalidade: limitarTexto(nacionalidade, 50),
      escolaridade: limitarTexto(escolaridade, 50),
      formacao: limitarTexto(formacao, 100),
      idiomas: limitarTexto(idiomas, 50),
      descricao: limitarTexto(descricao, 500)
    }

    if (!dadosUsuario.nome || !dadosUsuario.email) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Nome e email sao obrigatorios para atualizar o perfil.'
      })
    }

    await perfilModel.atualizarUsuario(req.user.id, dadosUsuario)

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Perfil de usuario atualizado com sucesso.',
      dados: {
        ...dadosUsuario
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

    const dadosEmpresa = {
      nomeEmpresa: limitarTexto(nomeEmpresa, 100),
      email: limitarTexto(email, 100),
      telefone: limitarNumeros(telefone, 15),
      endereco: limitarTexto(endereco, 150),
      cnpj: limitarTexto(cnpj, 14),
      descricao: limitarTexto(descricao, 500)
    }

    if (!dadosEmpresa.nomeEmpresa || !dadosEmpresa.email) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Nome da empresa e email sao obrigatorios.'
      })
    }

    await perfilModel.atualizarEmpresa(req.user.id, dadosEmpresa)

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Perfil da empresa atualizado com sucesso.',
      dados: {
        ...dadosEmpresa
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
