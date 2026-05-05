const db = require("../config/db");

async function getUnidades(lat, lng) {
  const [rows] = await db.promise().query(`
    SELECT
      ID_Unidade,
      tipo,
      nome,
      latitude,
      longitude,
      nome_municipio,
      telefone,

      (6371 *
        ACOS(
          COS(RADIANS(?)) *
          COS(RADIANS(latitude)) *
          COS(RADIANS(longitude) - RADIANS(?)) +
          SIN(RADIANS(?)) *
          SIN(RADIANS(latitude))
        )
      ) AS distancia

    FROM unidade_de_saude

    HAVING distancia <= 7
    ORDER BY distancia ASC
    LIMIT 100;
  `, [lat, lng, lat]);

  return rows;
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
      telefone
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