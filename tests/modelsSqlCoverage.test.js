const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const dbPath = path.resolve(__dirname, '../src/backend/config/db.js');

function carregarModel(relativePath, queryMock, callbackQueryMock) {
  const modelPath = path.resolve(__dirname, '..', relativePath);
  delete require.cache[modelPath];
  require.cache[dbPath] = {
    id: dbPath,
    filename: dbPath,
    loaded: true,
    exports: {
      query: callbackQueryMock,
      promise() {
        return { query: queryMock };
      }
    }
  };

  return {
    model: require(modelPath),
    limpar() {
      delete require.cache[modelPath];
      delete require.cache[dbPath];
    }
  };
}

test('models de cadastro e perfil usam SQL e parametros corretos', async (t) => {
  const chamadas = [];
  const { model: cadastro, limpar: limparCadastro } = carregarModel(
    'src/backend/models/cadastroModel.js',
    async (sql, params) => {
      chamadas.push([sql, params]);
      return [[{ ok: true }]];
    }
  );

  t.after(limparCadastro);

  await cadastro.criarUsuario('Ana', 'ana@teste.com', '2000-01-01', 'hash');
  await cadastro.criarEmpresa('Empresa', '123', 'empresa@teste.com', 'Rua A', 'hash');
  await cadastro.verificaExistencia('ana@teste.com');

  assert.match(chamadas[0][0], /INSERT INTO usuario/);
  assert.deepEqual(chamadas[0][1], ['Ana', 'ana@teste.com', '2000-01-01', 'hash']);
  assert.match(chamadas[1][0], /INSERT INTO empresa/);
  assert.deepEqual(chamadas[1][1], ['Empresa', '123', 'empresa@teste.com', 'Rua A', 'hash']);
  assert.match(chamadas[2][0], /UNION/);
  assert.deepEqual(chamadas[2][1], ['ana@teste.com', 'ana@teste.com']);

  const chamadasPerfil = [];
  const { model: perfil, limpar: limparPerfil } = carregarModel(
    'src/backend/models/perfilModel.js',
    async (sql, params) => {
      chamadasPerfil.push([sql, params]);
      return [{ affectedRows: 1 }];
    }
  );
  t.after(limparPerfil);

  await perfil.atualizarUsuario(1, {
    nome: 'Ana',
    email: 'ana@teste.com',
    telefone: '11',
    nacionalidade: 'BR',
    escolaridade: 'Superior',
    formacao: 'ADS',
    idiomas: 'PT',
    descricao: 'Bio'
  });
  await perfil.atualizarEmpresa(2, {
    nomeEmpresa: 'Empresa',
    email: 'empresa@teste.com',
    telefone: '22',
    endereco: 'Rua A',
    cnpj: '123',
    descricao: 'Desc'
  });

  assert.match(chamadasPerfil[0][0], /UPDATE usuario/);
  assert.deepEqual(chamadasPerfil[0][1].slice(-1), [1]);
  assert.match(chamadasPerfil[1][0], /UPDATE empresa/);
  assert.deepEqual(chamadasPerfil[1][1].slice(-1), [2]);
});

test('models de avatar, favorito e envio usam tabelas esperadas', async (t) => {
  const chamadas = [];
  const { model: avatar, limpar: limparAvatar } = carregarModel(
    'src/backend/models/avatarModel.js',
    async (sql, params) => {
      chamadas.push([sql, params]);
      return [[{ avatar: '/x.png', cnpj: '123' }]];
    }
  );
  t.after(limparAvatar);

  await avatar.getAvatarUsuario(1);
  await avatar.getAvatarEmpresa(2);
  await avatar.atualizarAvatarUsuario(1, '/u.png');
  await avatar.atualizarAvatarEmpresa(2, '/e.png');

  assert.match(chamadas[0][0], /FROM usuario WHERE ID_usuario = \?/);
  assert.deepEqual(chamadas[0][1], [1]);
  assert.match(chamadas[1][0], /FROM empresa WHERE ID_empresa = \?/);
  assert.deepEqual(chamadas[1][1], [2]);
  assert.deepEqual(chamadas[2][1], ['/u.png', 1]);
  assert.deepEqual(chamadas[3][1], ['/e.png', 2]);

  const chamadasFavorito = [];
  const { model: favorito, limpar: limparFavorito } = carregarModel(
    'src/backend/models/favoritarMarcarModel.js',
    async (sql, params) => {
      chamadasFavorito.push([sql, params]);
      return [{ affectedRows: 1 }];
    }
  );
  t.after(limparFavorito);

  await favorito.favoritar(1, 2);
  await favorito.desfavoritar(1, 2);
  await favorito.marcar(1, 2);
  await favorito.desmarcar(1, 2);

  assert.match(chamadasFavorito[0][0], /INSERT INTO usuario_favorita_vaga/);
  assert.match(chamadasFavorito[1][0], /DELETE FROM usuario_favorita_vaga/);
  assert.match(chamadasFavorito[2][0], /INSERT INTO usuario_marca_vaga/);
  assert.match(chamadasFavorito[3][0], /DELETE FROM usuario_marca_vaga/);
  assert.ok(chamadasFavorito.every(([, params]) => params[0] === 1 && params[1] === 2));
});

test('models de vagas e paginas consultam as tabelas corretas', async (t) => {
  const casos = [
    ['src/backend/models/getAllVagas.js', async (model) => {
      await model.getVaga();
      await model.getVagaFiltro('dev');
    }, [/FROM vaga v/, /WHERE v\.titulo LIKE \?/]],
    ['src/backend/models/getVagaById.js', async (model) => {
      await model.getVagaById(3);
    }, [/WHERE v\.ID_vaga = \?/]],
    ['src/backend/models/buscaVagaEmpresaModel.js', async (model) => {
      await model.getVaga(4);
    }, [/WHERE v\.ID_empresa = \?/]],
    ['src/backend/models/buscaVagaModel.js', async (model) => {
      await model.getVaga(['1', '2']);
      await model.getVagaById(2);
    }, [/WHERE ID_vaga IN/, /WHERE v\.ID_vaga = \?/]],
    ['src/backend/models/empresaPageModel.js', async (model) => {
      await model.getEmpresa(5);
    }, [/FROM empresa WHERE ID_empresa = \?/]],
    ['src/backend/models/ususarioPageModel.js', async (model) => {
      await model.getUsuario(6);
    }, [/FROM usuario/]],
    ['src/backend/models/healthModel.js', async (model) => {
      await model.getUnidades('-23', '-46');
      await model.getUnidadesPorCidade('Sao Paulo');
    }, [/CALL buscar_unidades_proximas/, /FROM unidade_de_saude/]]
  ];

  for (const [arquivo, executar, regexSqls] of casos) {
    const chamadas = [];
    const { model, limpar } = carregarModel(arquivo, async (sql, params) => {
      chamadas.push([sql, params]);
      return [[{ id: 1 }]];
    });
    t.after(limpar);

    await executar(model);

    regexSqls.forEach((regex, index) => {
      assert.match(chamadas[index][0], regex, `${arquivo} query ${index} deve bater`);
    });
  }
});

test('models de status e listas de vagas retornam booleanos/listas esperados', async (t) => {
  const casos = [
    ['src/backend/models/VagasFavoritadasModel.js', 'getVagasFavoritadas', [1], /usuario_favorita_vaga/, [{ ID_vaga: 2 }]],
    ['src/backend/models/VagasEnviadasModel.js', 'getVagasEnviadas', [1], /usuario_marca_vaga/, [{ ID_vaga: 2 }]],
    ['src/backend/models/verificaSeFavoritaModel.js', 'verficaSeFavorita', [1, 2], /usuario_favorita_vaga/, true],
    ['src/backend/models/verificaSeEnviadoModel.js', 'verificaSeEnviado', [1, 2], /usuario_marca_vaga/, true]
  ];

  for (const [arquivo, metodo, args, regex, esperado] of casos) {
    let sqlRecebido;
    const { model, limpar } = carregarModel(arquivo, async (sql) => {
      sqlRecebido = sql;
      return [[{ ID_vaga: 2 }]];
    });
    t.after(limpar);

    const result = await model[metodo](...args);

    assert.match(sqlRecebido, regex);
    assert.deepEqual(result, esperado);
  }
});

test('User model busca usuario e empresa por email', async (t) => {
  const chamadas = [];
  const { model: User, limpar } = carregarModel(
    'src/backend/models/User.js',
    async () => {
      throw new Error('promise nao deve ser usado aqui');
    },
    (sql, params, callback) => {
      chamadas.push([sql, params]);
      callback(null, [{ email: params[0] }]);
    }
  );
  t.after(limpar);

  assert.deepEqual(await User.findByEmail('u@teste.com'), { email: 'u@teste.com' });
  assert.deepEqual(await User.findByEmailEmpresa('e@teste.com'), { email: 'e@teste.com' });
  assert.match(chamadas[0][0], /FROM usuario WHERE email = \?/);
  assert.match(chamadas[1][0], /FROM empresa WHERE email = \?/);
});
