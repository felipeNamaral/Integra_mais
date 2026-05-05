const db = require('../config/db');

const getVaga = async () => {
  try {
    const [rows] = await db.promise().query(
      `SELECT v.*, e.nome AS empresa
       FROM vaga v
       JOIN empresa e ON v.ID_empresa = e.ID_empresa`
    );

    return rows;
  } catch (error) {
    console.error("Erro ao obter vaga:", error);
    throw error;
  }
};

const getVagaFiltro = async (busca) => {
  try {
    const [rows] = await db.promise().query(
      `SELECT v.*, e.nome AS empresa
       FROM vaga v
       JOIN empresa e ON v.ID_empresa = e.ID_empresa
       WHERE v.titulo LIKE ?
          OR v.descricao LIKE ?
          OR e.nome LIKE ?
          OR v.cidade LIKE ?`,
      [`%${busca}%`, `%${busca}%`, `%${busca}%`, `%${busca}%`]
    );

    return rows;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { getVaga, getVagaFiltro };