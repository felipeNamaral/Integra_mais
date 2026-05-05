const vagaModel = require("../models/getVagaById");

const getVagaById = async (req, res) => {
  try {
    const id = req.query.id;

    const vaga = await vagaModel.getVagaById(id);

    return res.json(vaga);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar vaga" });
  }
};

module.exports = { getVagaById };