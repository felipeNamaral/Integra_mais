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

async function getUnidadesFavoritas(idUsuario) {
  const [rows] = await db.promise().query(`
    SELECT
      u.ID_Unidade,
      u.tipo,
      u.nome,
      u.latitude,
      u.longitude,
      u.nome_municipio,
      u.telefone,
      u.endereco
    FROM usuario_favorita_unidade f
    INNER JOIN unidade_de_saude u ON u.ID_Unidade = f.ID_Unidade
    WHERE f.ID_usuario = ?
    ORDER BY u.nome
  `, [idUsuario]);

  return rows;
}

async function verificaSeUnidadeFavorita(idUsuario, idUnidade) {
  const [rows] = await db.promise().query(
    `SELECT 1 FROM usuario_favorita_unidade
     WHERE ID_usuario = ? AND ID_Unidade = ?
     LIMIT 1`,
    [idUsuario, idUnidade]
  );

  return rows.length > 0;
}

async function favoritarUnidade(idUsuario, idUnidade) {
  await db.promise().query(
    `INSERT IGNORE INTO usuario_favorita_unidade (ID_usuario, ID_Unidade)
     VALUES (?, ?)`,
    [idUsuario, idUnidade]
  );
}

async function desfavoritarUnidade(idUsuario, idUnidade) {
  await db.promise().query(
    `DELETE FROM usuario_favorita_unidade
     WHERE ID_usuario = ? AND ID_Unidade = ?`,
    [idUsuario, idUnidade]
  );
}


module.exports = {
  getUnidades,
  getUnidadesPorCidade,
  getUnidadesFavoritas,
  verificaSeUnidadeFavorita,
  favoritarUnidade,
  desfavoritarUnidade
};
