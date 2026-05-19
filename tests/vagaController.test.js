const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const dbPath = path.resolve(__dirname, '../src/backend/config/db.js');

require.cache[dbPath] = {
  id: dbPath,
  filename: dbPath,
  loaded: true,
  exports: {
    promise() {
      return {
        query() {
          throw new Error('O banco nao deve ser chamado neste teste.');
        }
      };
    }
  }
};

const vagaModel = require('../src/backend/models/vagaModel');
const vagaController = require('../src/backend/controllers/vagaController');

function criarRes() {
  return {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    }
  };
}

test('editarVaga envia id da empresa autenticada para o model', async (t) => {
  const editarOriginal = vagaModel.editarVaga;
  let payloadRecebido;

  t.after(() => {
    vagaModel.editarVaga = editarOriginal;
  });

  vagaModel.editarVaga = async (payload) => {
    payloadRecebido = payload;
    return { affectedRows: 1 };
  };

  const req = {
    user: { id: 22, tipo: 'empresa' },
    body: {
      idVaga: 7,
      titulo: 'Analista de dados',
      descricao: 'Vaga para analise de dados',
      salario: 3500,
      cargaHoraria: '40h',
      requisitos: 'SQL',
      tipoVaga: 'Presencial',
      status: 'Ativa',
      cidade: 'Sao Paulo'
    }
  };
  const res = criarRes();

  await vagaController.editarVaga(req, res);

  assert.equal(payloadRecebido.idEmpresa, 22);
  assert.equal(payloadRecebido.idVaga, 7);
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, {
    sucesso: true,
    mensagem: 'Vaga atualizada com sucesso.'
  });
});

test('editarVaga retorna 404 quando a vaga nao pertence a empresa', async (t) => {
  const editarOriginal = vagaModel.editarVaga;

  t.after(() => {
    vagaModel.editarVaga = editarOriginal;
  });

  vagaModel.editarVaga = async () => ({ affectedRows: 0 });

  const req = {
    user: { id: 22, tipo: 'empresa' },
    body: {
      idVaga: 7,
      titulo: 'Analista de dados',
      descricao: 'Vaga para analise de dados'
    }
  };
  const res = criarRes();

  await vagaController.editarVaga(req, res);

  assert.equal(res.statusCode, 404);
  assert.deepEqual(res.body, {
    sucesso: false,
    mensagem: 'Vaga não encontrada ou não pertence à empresa.'
  });
});

test('editarVaga valida campos obrigatorios antes de chamar o model', async (t) => {
  const editarOriginal = vagaModel.editarVaga;
  let modelChamado = false;

  t.after(() => {
    vagaModel.editarVaga = editarOriginal;
  });

  vagaModel.editarVaga = async () => {
    modelChamado = true;
    return { affectedRows: 1 };
  };

  const req = {
    user: { id: 22, tipo: 'empresa' },
    body: { idVaga: 7, titulo: 'Sem descricao' }
  };
  const res = criarRes();

  await vagaController.editarVaga(req, res);

  assert.equal(modelChamado, false);
  assert.equal(res.statusCode, 400);
});
