const vagaModel = require('../models/vagaModel');



const cadastrarVaga = async (req, res) => {
  try {
    const {
      titulo,
      descricao,
      salario,
      cargaHoraria,
      requisitos,
      tipoVaga,
      status,
      cidade
    } = req.body;

    const idEmpresa = req.user.id; 

    if (!titulo || !descricao) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Título e descrição são obrigatórios"
      });
    }

    await vagaModel.cadastrarVaga({
      idEmpresa,
      titulo,
      descricao,
      salario,
      cargaHoraria,
      requisitos,
      tipoVaga,
      status,
      cidade
    });

    return res.status(201).json({
      sucesso: true,
      mensagem: "Vaga criada com sucesso"
    });

  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao cadastrar vaga",
      erro: error.message
    });
  }
};

const editarVaga = async (req, res) => {
  try {
    const {
      idVaga,
      titulo,
      descricao,
      salario,
      cargaHoraria,
      requisitos,
      tipoVaga,
      status,
      cidade
    } = req.body;


    if (!idVaga || !titulo || !descricao) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'ID da vaga, título e descrição são obrigatórios.'
      });
    }


    const result = await vagaModel.editarVaga({
      idVaga,
      titulo,
      descricao,
      salario,
      cargaHoraria,
      requisitos,
      tipoVaga,
      status,
      cidade
    });


    if (result.affectedRows === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Vaga não encontrada.'
      });
    }


    return res.status(200).json({
      sucesso: true,
      mensagem: 'Vaga atualizada com sucesso.'
    });

  } catch (error) {
    console.error('Erro ao editar vaga:', error);

    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao editar vaga.',
      erro: error.message
    });
  }
};

const excluirVaga = async (req, res) => {
  try {
    const idVaga = req.params.id;
    const idEmpresa = req.user.id; 

    if (!idVaga) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "ID da vaga é obrigatório"
      });
    }

    const result = await vagaModel.excluirVaga(idVaga, idEmpresa);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Vaga não encontrada ou não pertence à empresa"
      });
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: "Vaga excluída com sucesso"
    });

  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao excluir vaga",
      erro: error.message
    });
  }
};






module.exports = {
  cadastrarVaga,
  editarVaga,
  excluirVaga
}