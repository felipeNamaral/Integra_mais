const healthModel = require("../models/healthModel");

const getUnidades = async (req, res) => {
  try {
    const { lat, lng, cidade } = req.query;

    if( !cidade){
    const unidades = await healthModel.getUnidades(lat, lng);
    
    res.json(unidades);
    
    } else {
      const unidades = await healthModel.getUnidadesPorCidade(cidade);
      res.json(unidades);
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar unidades" });
    
  }
};

const getUnidadesFavoritas = async (req, res) => {
  try {
    const idUsuario = req.user.id;
    const unidades = await healthModel.getUnidadesFavoritas(idUsuario);

    res.json(unidades);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar unidades favoritas" });
  }
};

const verificaSeUnidadeFavorita = async (req, res) => {
  try {
    const idUsuario = req.user.id;
    const idUnidade = req.query.ID_Unidade;

    const favoritada = await healthModel.verificaSeUnidadeFavorita(idUsuario, idUnidade);

    res.json({ favoritada });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao verificar unidade favorita" });
  }
};

const favoritarUnidade = async (req, res) => {
  try {
    const idUsuario = req.user.id;
    const { idUnidade } = req.body;

    await healthModel.favoritarUnidade(idUsuario, idUnidade);

    res.json({ favoritada: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao favoritar unidade" });
  }
};

const desfavoritarUnidade = async (req, res) => {
  try {
    const idUsuario = req.user.id;
    const { idUnidade } = req.body;

    await healthModel.desfavoritarUnidade(idUsuario, idUnidade);

    res.json({ favoritada: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao remover unidade dos favoritos" });
  }
};

module.exports = {
  getUnidades,
  getUnidadesFavoritas,
  verificaSeUnidadeFavorita,
  favoritarUnidade,
  desfavoritarUnidade
};
