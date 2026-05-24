const test = require('node:test');
const assert = require('node:assert/strict');

const permitirTipos = require('../src/backend/middlewares/tipoUsuarioMiddleware');

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

test('permite usuario quando o tipo esta autorizado', () => {
  const req = { user: { id: 1, tipo: 'usuario' } };
  const res = criarRes();
  let nextChamado = false;

  permitirTipos('usuario')(req, res, () => {
    nextChamado = true;
  });

  assert.equal(nextChamado, true);
  assert.equal(res.statusCode, null);
});

test('bloqueia usuario quando o tipo nao esta autorizado', () => {
  const req = { user: { id: 1, tipo: 'empresa' } };
  const res = criarRes();
  let nextChamado = false;

  permitirTipos('usuario')(req, res, () => {
    nextChamado = true;
  });

  assert.equal(nextChamado, false);
  assert.equal(res.statusCode, 403);
  assert.deepEqual(res.body, {
    sucesso: false,
    mensagem: 'Acesso negado para este tipo de usuario'
  });
});

test('bloqueia requisicao sem usuario autenticado', () => {
  const req = {};
  const res = criarRes();
  let nextChamado = false;

  permitirTipos('empresa')(req, res, () => {
    nextChamado = true;
  });

  assert.equal(nextChamado, false);
  assert.equal(res.statusCode, 403);
});
