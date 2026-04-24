const cadastrarVaga = async (req, res) => {
  try {
    const {
      idEmpresa,
      titulo,
      descricao,
      salario,
      cargaHoraria,
      requisitos,
      tipoVaga,
      status
    } = req.body

    if (
      !idEmpresa ||
      !titulo ||
      !descricao ||
      !salario ||
      !cargaHoraria ||
      !requisitos ||
      !tipoVaga ||
      !status
    ) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Todos os campos da vaga são obrigatórios.'
      })
    }

    return res.status(201).json({
      sucesso: true,
      mensagem: 'Cadastro de vaga recebido com sucesso.',
      dados: {
        idEmpresa,
        titulo,
        descricao,
        salario,
        cargaHoraria,
        requisitos,
        tipoVaga,
        status
      }
    })
  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao cadastrar vaga.',
      erro: error.message
    })
  }
}

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
      status
    } = req.body

    if (!idVaga || !titulo || !descricao) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'ID da vaga, título e descrição são obrigatórios.'
      })
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Vaga atualizada com sucesso.',
      dados: {
        idVaga,
        titulo,
        descricao,
        salario,
        cargaHoraria,
        requisitos,
        tipoVaga,
        status
      }
    })
  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao editar vaga.',
      erro: error.message
    })
  }
}

module.exports = {
  cadastrarVaga,
  editarVaga
}