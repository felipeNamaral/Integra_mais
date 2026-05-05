const db = require("../config/db");

const getEmpresa = async (id) => {
    const [rows] = await db.promise().query("SELECT * FROM empresa WHERE ID_empresa = ?", [id]);    
    return rows[0];
};

module.exports = { getEmpresa };