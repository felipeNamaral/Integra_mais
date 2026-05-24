const db = require('../config/db');


const getVagaById = async (id) => {
  const [rows] = await db.promise().query(
    `SELECT v.*, e.nome AS empresa, e.email AS empresa_email
     FROM vaga v
     JOIN empresa e ON v.ID_empresa = e.ID_empresa
     WHERE v.ID_vaga = ?`,
    [id]
  );

  return rows[0];
};

module.exports = { getVagaById };
