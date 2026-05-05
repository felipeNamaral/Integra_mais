const db = require('../config/db');



const getVagasEnviadas = async (id) => {
  try {
    const [rows] = await db.promise().query(
      "SELECT ID_vaga FROM usuario_marca_vaga WHERE id_usuario = ?",
      [id]
    );
    return rows;
  } catch (error) {
    console.error("Erro ao obter vagas enviadas:", error);
    throw error;
  }
};

module.exports = { getVagasEnviadas };