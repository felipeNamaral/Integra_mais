const bd = require("../models/verificaSeEnviadoModel");



const verificaSeEnviado = async (req, res) => {
  try {
    const id = req.user.id;
    const ID_vaga = req.query.ID_vaga;
    const result = await bd.verificaSeEnviado(id,ID_vaga);  
    res.json({ Enviado: result });


    } catch (error) {   
    console.error("Erro ao obter vagas favoritadas:", error);
    res.status(500).json({ error: "Erro ao obter vagas favoritadas" });
  } 


};

module.exports = {
  verificaSeEnviado,
};