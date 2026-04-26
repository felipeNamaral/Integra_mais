const db = require("../config/db");

const editarVaga = async ({
  idVaga,
  titulo,
  descricao,
  salario,
  cargaHoraria,
  requisitos,
  tipoVaga,
  status,
  cidade
}) => {
  const [result] = await db.promise().query(
    `UPDATE vaga 
     SET titulo = ?, 
         descricao = ?, 
         salario = ?, 
         carga_horaria = ?, 
         requisitos = ?, 
         tipo_vaga = ?, 
         status = ?,
         cidade = ?
     WHERE ID_vaga = ?`,
    [
      titulo,
      descricao,
      salario,
      cargaHoraria,
      requisitos,
      tipoVaga,
      status,
      cidade,
      idVaga
    ]
  );

  return result;
};


const cadastrarVaga = async ({
  idEmpresa,
  titulo,
  descricao,
  salario,
  cargaHoraria,
  requisitos,
  tipoVaga,
  status,
  cidade
}) => {
  const [result] = await db.promise().query(
    `INSERT INTO vaga 
    (ID_empresa, titulo, descricao, salario, carga_horaria, requisitos, tipo_vaga, status, cidade)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      idEmpresa,
      titulo,
      descricao,
      salario,
      cargaHoraria,
      requisitos,
      tipoVaga,
      status,
      cidade
    ]
  );

  return result;
};




const excluirVaga = async (idVaga, idEmpresa) => {
  const [result] = await db.promise().query(
    `DELETE FROM vaga 
     WHERE ID_vaga = ? AND ID_empresa = ?`,
    [idVaga, idEmpresa]
  );

  return result;
};


module.exports = { editarVaga,cadastrarVaga,excluirVaga };