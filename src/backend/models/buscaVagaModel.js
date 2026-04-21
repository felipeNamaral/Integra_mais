const db = require('../config/db');



const getVaga = async (ids) => {
  try {

    const placeholders = ids.map(() => '?').join(',');
    const [rows] = await db.promise().query(
      `SELECT v.*, e.nome AS empresa
          FROM vaga v
          JOIN empresa e ON v.ID_empresa = e.ID_empresa
           WHERE ID_vaga IN  (${placeholders})`,  
      ids
    );
    return rows;
  } catch (error) {
    console.error("Erro ao obter vaga:", error);
    throw error;
  }
};

module.exports = { getVaga };