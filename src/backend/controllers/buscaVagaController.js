const vaga = require("../models/buscaVagaModel");



const getVaga = async (req, res) => {
  try {

    const ids = req.query.id.split(',');
    
    const result = await vaga.getVaga(ids);  
    res.json(result);
    } catch (error) {   
    console.error("Erro ao obter vaga:", error);
    res.status(500).json({ error: "Erro ao obter vaga" });
  } 
};

module.exports = {
  getVaga,
};