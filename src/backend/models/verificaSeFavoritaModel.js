const db = require('../config/db');

const verficaSeFavorita = async (id, ID_vaga) => {
    try {
        const [rows] = await db.promise().query(
            `SELECT 1 FROM usuario_favorita_vaga 
            WHERE ID_usuario = ? AND ID_vaga = ? 
            LIMIT 1`,
            [id, ID_vaga]
        );

        return rows.length > 0;


        return rows;
    } catch (error) {
        console.error("Erro ao obter vagas favoritadas:", error);
        throw error;
    }
};

module.exports = { verficaSeFavorita };