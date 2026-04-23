const vaga = require("../models/getAllVagas");

const getVagaAll = async (req, res) => {
  try {
    const input = req.query.busca;

    if (!input) {
      const response = await vaga.getVaga();
      return res.json(response);
    }

    const response = await vaga.getVagaFiltro(input);
    return res.json(response);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar vagas" });
  }
};

module.exports = { getVagaAll };