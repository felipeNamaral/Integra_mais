
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


