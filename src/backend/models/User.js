
const connection = require('../config/db');


exports.findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM usuario WHERE email = ?',
      [email],
      (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      }
    );
  });
};

exports.findByEmailEmpresa = (email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM empresa WHERE email = ?',
      [email],
      (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      }
    );
  });
};

exports.findByResetToken = (token) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT email, 'usuario' AS tipo FROM usuario WHERE reset_token = ? AND reset_token_expira > NOW()
       UNION ALL
       SELECT email, 'empresa' AS tipo FROM empresa WHERE reset_token = ? AND reset_token_expira > NOW()`,
      [token, token],
      (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      }
    );
  });
};

exports.salvarResetTokenUsuario = (email, token) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE usuario SET reset_token = ?, reset_token_expira = DATE_ADD(SYSDATE(), INTERVAL 15 MINUTE) WHERE email = ?',
      [token, email],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

exports.salvarResetTokenEmpresa = (email, token) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE empresa SET reset_token = ?, reset_token_expira = DATE_ADD(SYSDATE(), INTERVAL 15 MINUTE) WHERE email = ?',
      [token, email],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

exports.updateSenhaUsuario = (email, senha) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE usuario SET senha = ?, reset_token = NULL, reset_token_expira = NULL WHERE email = ?',
      [senha, email],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

exports.updateSenhaEmpresa = (email, senha) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE empresa SET senha = ?, reset_token = NULL, reset_token_expira = NULL WHERE email = ?',
      [senha, email],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

