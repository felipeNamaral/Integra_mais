const vagasFavoritadas = require("../models/VagasFavoritadasModel");



const getVagasFavoritadas = async (req, res) => {
  try {
    const id = req.user.id;
    const result = await vagasFavoritadas.getVagasFavoritadas(id);  
    res.json(result);
    } catch (error) {   
    console.error("Erro ao obter vagas favoritadas:", error);
    res.status(500).json({ error: "Erro ao obter vagas favoritadas" });
  } 


};

module.exports = {
  getVagasFavoritadas,
};