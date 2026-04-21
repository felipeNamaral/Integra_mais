const vagasEnviadas = require("../models/VagasEnviadasModel");



const getVagasEnviadas = async (req, res) => {
  try {

    const {id} = req.query;
    const result = await vagasEnviadas.getVagasEnviadas(id);  
    res.json(result);
    } catch (error) {   
    console.error("Erro ao obter vagas enviadas:", error);
    res.status(500).json({ error: "Erro ao obter vagas enviadas" });
  } 
};

module.exports = {
  getVagasEnviadas,
};