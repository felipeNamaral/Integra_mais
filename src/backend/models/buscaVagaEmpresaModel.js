const db = require('../config/db');



const getVaga = async (idEmpresa) => {
  try {
    const [rows] = await db.promise().query(
      `SELECT v.*, e.nome AS empresa
       FROM vaga v
       JOIN empresa e ON v.ID_empresa = e.ID_empresa
       WHERE v.ID_empresa = ?`,
      [idEmpresa]
    );

    return rows;
  } catch (error) {
    console.error("Erro ao obter vagas:", error);
    throw error;
  }
};

module.exports = { getVaga };