const db = require("../config/db");

const getEmpresa = async (id) => {
    const [rows] = await db.query("SELECT * FROM empresa WHERE id = ?", [id]);    
    return rows[0];
};

module.exports = { getEmpresa };