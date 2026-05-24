
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

exports.updateSenhaUsuario = (email, senha) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE usuario SET senha = ? WHERE email = ?',
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

