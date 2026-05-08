const db = require("../config/db");

const atualizarUsuario = async (id, dados) => {
    const [result] = await db.promise().query(
        `UPDATE usuario
         SET nome = ?, email = ?, telefone = ?, nacionalidade = ?,
             escolaridade = ?, formacao = ?, idioma = ?, descricao = ?
         WHERE ID_usuario = ?`,
        [
            dados.nome,
            dados.email,
            dados.telefone,
            dados.nacionalidade,
            dados.escolaridade,
            dados.formacao,
            dados.idiomas,
            dados.descricao,
            id
        ]
    );

    return result;
};

const atualizarEmpresa = async (id, dados) => {
    const [result] = await db.promise().query(
        `UPDATE empresa
         SET nome = ?, email = ?, telefone = ?, endereco = ?, cnpj = ?, descricao = ?
         WHERE ID_empresa = ?`,
        [
            dados.nomeEmpresa,
            dados.email,
            dados.telefone,
            dados.endereco,
            dados.cnpj,
            dados.descricao,
            id
        ]
    );

    return result;
};

module.exports = { atualizarUsuario, atualizarEmpresa };
