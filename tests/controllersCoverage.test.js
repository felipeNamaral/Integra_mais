const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function criarRes() {
  return {
    statusCode: 200,
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

function mockModule(relativePath, exports) {
  const modulePath = path.resolve(__dirname, '..', relativePath);
  const original = require.cache[modulePath];
  require.cache[modulePath] = {
    id: modulePath,
    filename: modulePath,
    loaded: true,
    exports
  };
  return () => {
    if (original) {
      require.cache[modulePath] = original;
    } else {
      delete require.cache[modulePath];
    }
  };
}

function freshController(relativePath) {
  const modulePath = path.resolve(__dirname, '..', relativePath);
  delete require.cache[modulePath];
  return require(modulePath);
}

test('authController autentica usuario e empresa e rejeita credenciais invalidas', async (t) => {
  const restoreUser = mockModule('src/backend/models/User.js', {
    findByEmail: async (email) => email === 'usuario@teste.com'
      ? { ID_usuario: 1, email, nome: 'Usuario', senha: 'hash' }
      : undefined,
    findByEmailEmpresa: async (email) => email === 'empresa@teste.com'
      ? { ID_empresa: 2, email, nome: 'Empresa', senha: 'hash' }
      : undefined
  });
  const compareOriginal = bcrypt.compare;
  const signOriginal = jwt.sign;

  t.after(() => {
    restoreUser();
    bcrypt.compare = compareOriginal;
    jwt.sign = signOriginal;
  });

  bcrypt.compare = async (senha) => senha === 'senha-correta';
  jwt.sign = (payload) => `token-${payload.tipo}-${payload.id}`;

  const { login } = freshController('src/backend/controllers/authController.js');

  const resUsuario = criarRes();
  await login({ body: { email: 'usuario@teste.com', password: 'senha-correta' } }, resUsuario);
  assert.deepEqual(resUsuario.body, { token: 'token-usuario-1', tipo: 'usuario' });

  const resEmpresa = criarRes();
  await login({ body: { email: 'empresa@teste.com', password: 'senha-correta' } }, resEmpresa);
  assert.deepEqual(resEmpresa.body, { token: 'token-empresa-2', tipo: 'empresa' });

  const resInvalido = criarRes();
  await login({ body: { email: 'nada@teste.com', password: 'senha-correta' } }, resInvalido);
  assert.equal(resInvalido.statusCode, 401);
});

test('cadastroController valida campos, duplicidade e cria usuario/empresa', async (t) => {
  const chamadas = [];
  const restoreCadastro = mockModule('src/backend/models/cadastroModel.js', {
    verificaExistencia: async (email) => email === 'duplicado@teste.com' ? [{ email }] : [],
    criarUsuario: async (...args) => chamadas.push(['usuario', ...args]),
    criarEmpresa: async (...args) => chamadas.push(['empresa', ...args])
  });
  const hashOriginal = bcrypt.hash;

  t.after(() => {
    restoreCadastro();
    bcrypt.hash = hashOriginal;
  });

  bcrypt.hash = async (senha) => `hash-${senha}`;
  const controller = freshController('src/backend/controllers/cadastroController.js');

  const resUsuario = criarRes();
  await controller.cadastrarUsuario({
    body: {
      nome: 'Ana',
      email: 'ana@teste.com',
      dataNascimento: '2000-01-01',
      senha: '123456',
      confirmarSenha: '123456'
    }
  }, resUsuario);
  assert.equal(resUsuario.statusCode, 201);
  assert.deepEqual(chamadas[0], ['usuario', 'Ana', 'ana@teste.com', '2000-01-01', 'hash-123456']);

  const resEmpresa = criarRes();
  await controller.cadastrarEmpresa({
    body: {
      nomeEmpresa: 'Integra',
      cnpj: '123',
      emailCorporativo: 'empresa@teste.com',
      endereco: 'Rua A',
      senha: 'abc',
      confirmarSenha: 'abc'
    }
  }, resEmpresa);
  assert.equal(resEmpresa.statusCode, 201);
  assert.deepEqual(chamadas[1], ['empresa', 'Integra', '123', 'empresa@teste.com', 'Rua A', 'hash-abc']);

  const resDuplicado = criarRes();
  await controller.cadastrarUsuario({
    body: {
      nome: 'Ana',
      email: 'duplicado@teste.com',
      dataNascimento: '2000-01-01',
      senha: '123456',
      confirmarSenha: '123456'
    }
  }, resDuplicado);
  assert.equal(resDuplicado.statusCode, 400);

  const resSenha = criarRes();
  await controller.cadastrarEmpresa({
    body: {
      nomeEmpresa: 'Integra',
      cnpj: '123',
      emailCorporativo: 'empresa@teste.com',
      endereco: 'Rua A',
      senha: 'abc',
      confirmarSenha: 'diferente'
    }
  }, resSenha);
  assert.equal(resSenha.statusCode, 400);
});

test('controllers de pagina e listagem consultam os models com os parametros esperados', async (t) => {
  const restauradores = [
    mockModule('src/backend/models/empresaPageModel.js', { getEmpresa: async (id) => ({ id, tipo: 'empresa' }) }),
    mockModule('src/backend/models/ususarioPageModel.js', { getUsuario: async (id) => ({ id, tipo: 'usuario' }) }),
    mockModule('src/backend/models/buscaVagaEmpresaModel.js', { getVaga: async (id) => [{ idEmpresa: id }] }),
    mockModule('src/backend/models/VagasFavoritadasModel.js', { getVagasFavoritadas: async (id) => [{ id }] }),
    mockModule('src/backend/models/VagasEnviadasModel.js', { getVagasEnviadas: async (id) => [{ id }] }),
    mockModule('src/backend/models/verificaSeFavoritaModel.js', { verficaSeFavorita: async (id, vaga) => `${id}-${vaga}` }),
    mockModule('src/backend/models/verificaSeEnviadoModel.js', { verificaSeEnviado: async (id, vaga) => `${id}-${vaga}` }),
    mockModule('src/backend/models/getVagaById.js', { getVagaById: async (id) => ({ id }) }),
    mockModule('src/backend/models/buscaVagaModel.js', { getVaga: async (ids) => ids })
  ];

  t.after(() => restauradores.forEach((restore) => restore()));

  const casos = [
    ['src/backend/controllers/empresaPageController.js', 'getEmpresaPage', { user: { id: 5 } }, { id: 5, tipo: 'empresa' }],
    ['src/backend/controllers/ususarioPageController.js', 'getUsuarioPage', { user: { id: 6 } }, { id: 6, tipo: 'usuario' }],
    ['src/backend/controllers/buscaVagaEmpresaController.js', 'buscaVagaEmpresa', { user: { id: 7 } }, [{ idEmpresa: 7 }]],
    ['src/backend/controllers/VagasFavoritadasController.js', 'getVagasFavoritadas', { user: { id: 8 } }, [{ id: 8 }]],
    ['src/backend/controllers/VagasEnviadasController.js', 'getVagasEnviadas', { user: { id: 9 } }, [{ id: 9 }]],
    ['src/backend/controllers/verificaSeFavoritaController.js', 'verificaSeFavorita', { user: { id: 10 }, query: { ID_vaga: 11 } }, { favoritada: '10-11' }],
    ['src/backend/controllers/verificaSeEnviadoController.js', 'verificaSeEnviado', { user: { id: 12 }, query: { ID_vaga: 13 } }, { Enviado: '12-13' }],
    ['src/backend/controllers/getVagaById.js', 'getVagaById', { query: { id: 14 } }, { id: 14 }],
    ['src/backend/controllers/buscaVagaController.js', 'getVaga', { query: { id: '1,2,3' } }, ['1', '2', '3']]
  ];

  for (const [arquivo, metodo, req, esperado] of casos) {
    const res = criarRes();
    await freshController(arquivo)[metodo](req, res);
    assert.deepEqual(res.body, esperado, `${metodo} deve responder dados do model`);
  }
});

test('getAllVagas e healthController alternam consultas conforme query string', async (t) => {
  const chamadas = [];
  const restauradores = [
    mockModule('src/backend/models/getAllVagas.js', {
      getVaga: async () => {
        chamadas.push('todas');
        return ['todas'];
      },
      getVagaFiltro: async (busca) => {
        chamadas.push(`filtro:${busca}`);
        return ['filtradas'];
      }
    }),
    mockModule('src/backend/models/healthModel.js', {
      getUnidades: async (lat, lng) => {
        chamadas.push(`geo:${lat}:${lng}`);
        return ['geo'];
      },
      getUnidadesPorCidade: async (cidade) => {
        chamadas.push(`cidade:${cidade}`);
        return ['cidade'];
      }
    })
  ];

  t.after(() => restauradores.forEach((restore) => restore()));

  const vagas = freshController('src/backend/controllers/getAllVagas.js');
  const health = freshController('src/backend/controllers/healthController.js');

  const resTodas = criarRes();
  await vagas.getVagaAll({ query: {} }, resTodas);
  assert.deepEqual(resTodas.body, ['todas']);

  const resFiltro = criarRes();
  await vagas.getVagaAll({ query: { busca: 'dev' } }, resFiltro);
  assert.deepEqual(resFiltro.body, ['filtradas']);

  const resGeo = criarRes();
  await health.getUnidades({ query: { lat: '-23', lng: '-46' } }, resGeo);
  assert.deepEqual(resGeo.body, ['geo']);

  const resCidade = criarRes();
  await health.getUnidades({ query: { cidade: 'Sao Paulo' } }, resCidade);
  assert.deepEqual(resCidade.body, ['cidade']);

  assert.deepEqual(chamadas, ['todas', 'filtro:dev', 'geo:-23:-46', 'cidade:Sao Paulo']);
});

test('favoritarMarcarController chama operacoes corretas para favoritos e envios', async (t) => {
  const chamadas = [];
  const restore = mockModule('src/backend/models/favoritarMarcarModel.js', {
    favoritar: async (...args) => chamadas.push(['favoritar', ...args]),
    desfavoritar: async (...args) => chamadas.push(['desfavoritar', ...args]),
    marcar: async (...args) => chamadas.push(['marcar', ...args]),
    desmarcar: async (...args) => chamadas.push(['desmarcar', ...args])
  });

  t.after(restore);

  const controller = freshController('src/backend/controllers/favoritarMarcarController.js');
  const req = { user: { id: 3 }, body: { idVaga: 4 } };

  const resFavoritar = criarRes();
  await controller.favoritar(req, resFavoritar);
  assert.deepEqual(resFavoritar.body, { favoritada: true });

  const resDesfavoritar = criarRes();
  await controller.desfavoritar(req, resDesfavoritar);
  assert.deepEqual(resDesfavoritar.body, { favoritada: false });

  const resMarcar = criarRes();
  await controller.marcar(req, resMarcar);
  assert.deepEqual(resMarcar.body, { enviada: true });

  const resDesmarcar = criarRes();
  await controller.desmarcar(req, resDesmarcar);
  assert.deepEqual(resDesmarcar.body, { enviada: false });

  assert.deepEqual(chamadas, [
    ['favoritar', 3, 4],
    ['desfavoritar', 3, 4],
    ['marcar', 3, 4],
    ['desmarcar', 3, 4]
  ]);
});

test('perfilController valida obrigatorios e atualiza usuario e empresa', async (t) => {
  const chamadas = [];
  const restore = mockModule('src/backend/models/perfilModel.js', {
    atualizarUsuario: async (...args) => chamadas.push(['usuario', ...args]),
    atualizarEmpresa: async (...args) => chamadas.push(['empresa', ...args])
  });

  t.after(restore);

  const controller = freshController('src/backend/controllers/perfilController.js');

  const resUsuario = criarRes();
  await controller.atualizarPerfilUsuario({
    user: { id: 1 },
    body: { nome: 'Ana', email: 'ana@teste.com', telefone: '11' }
  }, resUsuario);
  assert.equal(resUsuario.statusCode, 200);
  assert.equal(chamadas[0][1], 1);

  const resEmpresa = criarRes();
  await controller.atualizarPerfilEmpresa({
    user: { id: 2 },
    body: { nomeEmpresa: 'Empresa', email: 'empresa@teste.com', cnpj: '123' }
  }, resEmpresa);
  assert.equal(resEmpresa.statusCode, 200);
  assert.equal(chamadas[1][1], 2);

  const resInvalido = criarRes();
  await controller.atualizarPerfilUsuario({ user: { id: 1 }, body: { nome: 'Sem email' } }, resInvalido);
  assert.equal(resInvalido.statusCode, 400);
});

test('avatarController busca avatar padrao e salva imagem por tipo de usuario', async (t) => {
  const chamadas = [];
  const restoreAvatar = mockModule('src/backend/models/avatarModel.js', {
    getAvatarUsuario: async () => ({}),
    getAvatarEmpresa: async () => ({ cnpj: '12.345.678/0001-99' }),
    atualizarAvatarUsuario: async (...args) => chamadas.push(['usuario', ...args]),
    atualizarAvatarEmpresa: async (...args) => chamadas.push(['empresa', ...args])
  });
  const fs = require('node:fs');
  const existsOriginal = fs.existsSync;
  const mkdirOriginal = fs.mkdirSync;
  const writeOriginal = fs.writeFileSync;

  t.after(() => {
    restoreAvatar();
    fs.existsSync = existsOriginal;
    fs.mkdirSync = mkdirOriginal;
    fs.writeFileSync = writeOriginal;
  });

  fs.existsSync = () => true;
  fs.mkdirSync = () => undefined;
  fs.writeFileSync = (...args) => chamadas.push(['write', ...args]);

  const controller = freshController('src/backend/controllers/avatarController.js');

  const resGet = criarRes();
  await controller.getAvatar({ user: { id: 1, tipo: 'usuario' } }, resGet);
  assert.deepEqual(resGet.body, { avatar: '/assets/img/user.png' });

  const imagem = `data:image/png;base64,${Buffer.from('img').toString('base64')}`;
  const resUsuario = criarRes();
  await controller.uploadAvatar({ user: { id: 1, tipo: 'usuario' }, body: { imagem } }, resUsuario);
  assert.deepEqual(resUsuario.body, { sucesso: true, avatar: '/uploads/avatarUsuario1.png' });

  const resEmpresa = criarRes();
  await controller.uploadAvatar({ user: { id: 2, tipo: 'empresa' }, body: { imagem } }, resEmpresa);
  assert.deepEqual(resEmpresa.body, { sucesso: true, avatar: '/uploads/avatar12345678000199.png' });

  const resInvalido = criarRes();
  await controller.uploadAvatar({ user: { id: 1, tipo: 'usuario' }, body: { imagem: 'texto' } }, resInvalido);
  assert.equal(resInvalido.statusCode, 400);
});
