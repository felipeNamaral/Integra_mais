const db = require("../config/db");


const criarUsuario = async (nome, email, dataNascimento, senha) => {
    const [result] = await db.promise().query(
        `INSERT INTO usuario 
        (nome, email, data_nascimento, senha)
        VALUES (?, ?, ?, ?)`,
        [nome, email, dataNascimento, senha]
    );

    return result;
};


const criarEmpresa = async (nomeEmpresa, cnpj, emailCorporativo, endereco, senha) => {
    const [result] = await db.promise().query(
        `INSERT INTO empresa 
        (nome_empresa, cnpj, email, endereco, senha)
        VALUES (?, ?, ?, ?, ?)`,
        [nomeEmpresa, cnpj, emailCorporativo, endereco, senha]
    );

    return result;
};

const verificaExistencia = async (email) => {
    const [result] = await db.promise().query(
        `
        SELECT email FROM usuario WHERE email = ?
        UNION
        SELECT email FROM empresa WHERE email = ?
        `,
        [email, email]
    );

    return result;
};


module.exports = {
    criarUsuario,
    criarEmpresa,
    verificaExistencia
};



