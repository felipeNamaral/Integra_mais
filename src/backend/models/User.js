
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
      'SELECT * FROM usuario WHERE reset_token = ? AND reset_token_expira > NOW()',
      [token],
      (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      }
    );
  });
};

exports.salvarResetTokenUsuario = (email, token, expira) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE usuario SET reset_token = ?, reset_token_expira = ? WHERE email = ?',
      [token, expira, email],
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
      'UPDATE empresa SET senha = ? WHERE email = ?',
      [senha, email],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

