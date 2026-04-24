const cadastrarUsuario = async (req, res) => {
  try {
    const {
      nome,
      email,
      dataNascimento,
      senha,
      confirmarSenha
    } = req.body

    if (!nome || !email || !dataNascimento || !senha || !confirmarSenha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Todos os campos do cadastro de usuário são obrigatórios.'
      })
    }

    if (senha !== confirmarSenha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'A confirmação de senha não confere.'
      })
    }

    return res.status(201).json({
      sucesso: true,
      mensagem: 'Cadastro de usuário recebido com sucesso.',
      dados: {
        nome,
        email,
        dataNascimento
      }
    })
  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao cadastrar usuário.',
      erro: error.message
    })
  }
}

const cadastrarEmpresa = async (req, res) => {
  try {
    const {
      nomeEmpresa,
      cnpj,
      emailCorporativo,
      endereco,
      senha,
      confirmarSenha
    } = req.body

    if (!nomeEmpresa || !cnpj || !emailCorporativo || !endereco || !senha || !confirmarSenha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Todos os campos do cadastro de empresa são obrigatórios.'
      })
    }

    if (senha !== confirmarSenha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'A confirmação de senha não confere.'
      })
    }

    return res.status(201).json({
      sucesso: true,
      mensagem: 'Cadastro de empresa recebido com sucesso.',
      dados: {
        nomeEmpresa,
        cnpj,
        emailCorporativo,
        endereco
      }
    })
  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao cadastrar empresa.',
      erro: error.message
    })
  }
}

module.exports = {
  cadastrarUsuario,
  cadastrarEmpresa
}