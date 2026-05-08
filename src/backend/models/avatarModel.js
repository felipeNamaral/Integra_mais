const db = require("../config/db");

const getAvatarUsuario = async (id) => {
    const [rows] = await db.promise().query(
        "SELECT avatar FROM usuario WHERE ID_usuario = ?",
        [id]
    );

    return rows[0];
};

const getAvatarEmpresa = async (id) => {
    const [rows] = await db.promise().query(
        "SELECT avatar, cnpj FROM empresa WHERE ID_empresa = ?",
        [id]
    );

    return rows[0];
};

const atualizarAvatarUsuario = async (id, avatar) => {
    const [result] = await db.promise().query(
        "UPDATE usuario SET avatar = ? WHERE ID_usuario = ?",
        [avatar, id]
    );

    return result;
};

const atualizarAvatarEmpresa = async (id, avatar) => {
    const [result] = await db.promise().query(
        "UPDATE empresa SET avatar = ? WHERE ID_empresa = ?",
        [avatar, id]
    );

    return result;
};

module.exports = {
    getAvatarUsuario,
    getAvatarEmpresa,
    atualizarAvatarUsuario,
    atualizarAvatarEmpresa
};
