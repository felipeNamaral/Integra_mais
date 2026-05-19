const test = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../src/backend/middlewares/authMiddleware');

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

test('authMiddleware rejeita requisicao sem token', () => {
  const req = { headers: {} };
  const res = criarRes();
  let nextChamado = false;

  authMiddleware(req, res, () => {
    nextChamado = true;
  });

  assert.equal(nextChamado, false);
  assert.equal(res.statusCode, 401);
  assert.deepEqual(res.body, { message: 'Sem token' });
});

test('authMiddleware rejeita token invalido', () => {
  const verifyOriginal = jwt.verify;
  jwt.verify = () => {
    throw new Error('token invalido');
  };

  try {
    const req = { headers: { authorization: 'Bearer token-ruim' } };
    const res = criarRes();
    let nextChamado = false;

    authMiddleware(req, res, () => {
      nextChamado = true;
    });

    assert.equal(nextChamado, false);
    assert.equal(res.statusCode, 401);
    assert.deepEqual(res.body, { message: 'Token inválido' });
  } finally {
    jwt.verify = verifyOriginal;
  }
});

test('authMiddleware popula req.user quando token e valido', () => {
  const verifyOriginal = jwt.verify;
  const usuario = { id: 10, tipo: 'usuario', email: 'u@teste.com' };
  jwt.verify = () => usuario;

  try {
    const req = { headers: { authorization: 'Bearer token-bom' } };
    const res = criarRes();
    let nextChamado = false;

    authMiddleware(req, res, () => {
      nextChamado = true;
    });

    assert.equal(nextChamado, true);
    assert.equal(req.user, usuario);
    assert.equal(res.statusCode, null);
  } finally {
    jwt.verify = verifyOriginal;
  }
});
