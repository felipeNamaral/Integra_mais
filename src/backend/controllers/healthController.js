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


module.exports = { getUnidades};