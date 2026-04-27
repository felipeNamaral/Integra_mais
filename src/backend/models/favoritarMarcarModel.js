
const db = require("../config/db");

const favoritar = async (idUsuario, idVaga) => {
  await db.promise().query(
    `INSERT INTO usuario_favorita_vaga (ID_usuario, ID_vaga)
     VALUES (?, ?)`,
    [idUsuario, idVaga]
  );
};

const desfavoritar = async (idUsuario, idVaga) => {
  await db.promise().query(
    `DELETE FROM usuario_favorita_vaga 
     WHERE ID_usuario = ? AND ID_vaga = ?`,
    [idUsuario, idVaga]
  );
};

const marcar = async (idUsuario, idVaga) => {
  await db.promise().query(
    `INSERT INTO usuario_marca_vaga (ID_usuario, ID_vaga)
     VALUES (?, ?)`,
    [idUsuario, idVaga]
  );
};

const desmarcar = async (idUsuario, idVaga) => {
  await db.promise().query(
    `DELETE FROM usuario_marca_vaga 
     WHERE ID_usuario = ? AND ID_vaga = ?`,
    [idUsuario, idVaga]
  );
};


module.exports = { favoritar,desfavoritar,marcar,desmarcar };