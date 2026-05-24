const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const dbPath = path.resolve(__dirname, '../src/backend/config/db.js');
const modelPath = path.resolve(__dirname, '../src/backend/models/vagaModel.js');

function carregarModelComDbMock(queryMock) {
  delete require.cache[modelPath];
  require.cache[dbPath] = {
    id: dbPath,
    filename: dbPath,
    loaded: true,
    exports: {
      promise() {
        return { query: queryMock };
      }
    }
  };

  return require(modelPath);
}

test('editarVaga atualiza somente vaga da empresa autenticada', async (t) => {
  let sqlRecebido;
  let paramsRecebidos;

  const model = carregarModelComDbMock(async (sql, params) => {
    sqlRecebido = sql;
    paramsRecebidos = params;
    return [{ affectedRows: 1 }];
  });

  t.after(() => {
    delete require.cache[modelPath];
    delete require.cache[dbPath];
  });

  const result = await model.editarVaga({
    idVaga: 7,
    idEmpresa: 22,
    titulo: 'Analista de dados',
    descricao: 'Vaga para analise de dados',
    salario: 3500,
    cargaHoraria: '40h',
    requisitos: 'SQL',
    tipoVaga: 'Presencial',
    status: 'Ativa',
    cidade: 'Sao Paulo'
  });

  assert.equal(result.affectedRows, 1);
  assert.match(sqlRecebido, /WHERE ID_vaga = \? AND ID_empresa = \?/);
  assert.deepEqual(paramsRecebidos.slice(-2), [7, 22]);
});

test('excluirVaga filtra por vaga e empresa', async (t) => {
  let sqlRecebido;
  let paramsRecebidos;

  const model = carregarModelComDbMock(async (sql, params) => {
    sqlRecebido = sql;
    paramsRecebidos = params;
    return [{ affectedRows: 1 }];
  });

  t.after(() => {
    delete require.cache[modelPath];
    delete require.cache[dbPath];
  });

  await model.excluirVaga(7, 22);

  assert.match(sqlRecebido, /WHERE ID_vaga = \? AND ID_empresa = \?/);
  assert.deepEqual(paramsRecebidos, [7, 22]);
});
