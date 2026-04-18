const db = require("../config/db");

const getUsuario = async (id) => {
    const [rows] = await db.promise().query("SELECT * FROM usuario WHERE ID_usuario = ?", [id]);    
    return rows[0];
};

module.exports = { getUsuario };