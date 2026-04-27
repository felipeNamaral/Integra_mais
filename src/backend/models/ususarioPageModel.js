const db = require("../config/db");

const getUsuario = async (id) => {
    const [rows] = await db.promise().query(
        `
        SELECT *
        ,TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) 
          - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(data_nascimento, '%m%d')) 
        AS idade 
        FROM usuario 
        WHERE ID_usuario = ?`
        , [id]);    
    return rows[0];
};

module.exports = { getUsuario };