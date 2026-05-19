const db = require("../config/db");

async function getUnidades(lat, lng) {
const [result] = await db.promise().query(
  `CALL buscar_unidades_proximas(?, ?, ?)`,
  [lat, lng, 7]
);

return result[0];
}





async function getUnidadesPorCidade(cidade) {
    const [rows] = await db.promise().query(`
    SELECT
      ID_Unidade,
      tipo,
      nome,
      latitude,
      longitude,
      nome_municipio,
      telefone,
      endereco
    FROM unidade_de_saude

    WHERE nome_municipio = ?

    limit 401
    ;

  `, [cidade]);

  return rows;

}


module.exports = {
  getUnidades,getUnidadesPorCidade
};