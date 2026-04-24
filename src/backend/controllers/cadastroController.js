const cadastroModel = require('../models/cadastroModel');
const bcrypt = require('bcrypt');


const cadastrarUsuario = async (req, res) => {
  try {
    const {
      nome,
      email,
      dataNascimento,
      senha,
      confirmarSenha
    } = req.body;

    
    if (!nome || !email || !dataNascimento || !senha || !confirmarSenha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Todos os campos do cadastro de usuário são obrigatórios.'
      });
    }

    if (senha !== confirmarSenha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'A confirmação de senha não confere.'
      });
    }

    
    const existe = await cadastroModel.verificaExistencia(email);

    if (existe.length > 0) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Email já cadastrado.'
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    await cadastroModel.criarUsuario(nome, email, dataNascimento, senhaHash);

    return res.status(201).json({
      sucesso: true,
      mensagem: 'Usuário cadastrado com sucesso.'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao cadastrar usuário.',
      erro: error.message
    });
  }
};

const cadastrarEmpresa = async (req, res) => {
  try {
    const {
      nomeEmpresa,
      cnpj,
      emailCorporativo,
      endereco,
      senha,
      confirmarSenha
    } = req.body;

    
    if (!nomeEmpresa || !cnpj || !emailCorporativo || !endereco || !senha || !confirmarSenha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Todos os campos do cadastro de empresa são obrigatórios.'
      });
    }

    if (senha !== confirmarSenha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'A confirmação de senha não confere.'
      });
    }

    
    const existe = await cadastroModel.verificaExistencia(emailCorporativo);

    if (existe.length > 0) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Email já cadastrado.'
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    await cadastroModel.criarEmpresa(
      nomeEmpresa,
      cnpj,
      emailCorporativo,
      endereco,
      senhaHash
    );

    return res.status(201).json({
      sucesso: true,
      mensagem: 'Empresa cadastrada com sucesso.'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao cadastrar empresa.',
      erro: error.message
    });
  }
};

module.exports = {
  cadastrarUsuario,
  cadastrarEmpresa
};