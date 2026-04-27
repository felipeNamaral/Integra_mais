const db = require('../config/db');



const getVagasFavoritadas = async (id) => {
  try {
    const [rows] = await db.promise().query(
      "SELECT ID_vaga FROM usuario_favorita_vaga WHERE ID_usuario = ?",
      [id]
    );
    return rows;
  } catch (error) {
    console.error("Erro ao obter vagas favoritadas:", error);
    throw error;
  }
};

module.exports = { getVagasFavoritadas };