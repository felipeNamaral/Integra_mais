const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const routesDir = path.resolve(__dirname, '../src/backend/routes');
const appPath = path.resolve(__dirname, '../src/app.js');

const rotasComPermissao = [
  ['VagasEnviadasRoutes.js', "router.get(\"/vagasEnviadas\", authMiddleware, permitirTipos('usuario')"],
  ['VagasFavoritadasRoutes.js', "router.get(\"/vagasFavoritadas\", authMiddleware, permitirTipos('usuario')"],
  ['buscaVagaEmpresaRoutes.js', "router.get(\"/Vagasempresa\", authMiddleware, permitirTipos('empresa')"],
  ['empresaPageRoutes.js', "router.get(\"/empresa\", authMiddleware, permitirTipos('empresa')"],
  ['favoritarMarcarRoutes.js', "router.post(\"/favoritar\", authMiddleware, permitirTipos('usuario')"],
  ['favoritarMarcarRoutes.js', "router.delete(\"/favoritar\", authMiddleware, permitirTipos('usuario')"],
  ['favoritarMarcarRoutes.js', "router.post(\"/marcar\", authMiddleware, permitirTipos('usuario')"],
  ['favoritarMarcarRoutes.js', "router.delete(\"/marcar\", authMiddleware, permitirTipos('usuario')"],
  ['perfilRoutes.js', "router.put('/perfil/usuario', authMiddleware, permitirTipos('usuario')"],
  ['perfilRoutes.js', "router.put('/perfil/empresa', authMiddleware, permitirTipos('empresa')"],
  ['usuarioPageRoutes.js', "router.get(\"/usuario\", authMiddleware, permitirTipos('usuario')"],
  ['vagaRoutes.js', "router.post('/vaga', authMiddleware, permitirTipos('empresa')"],
  ['vagaRoutes.js', "router.put('/vaga', authMiddleware, permitirTipos('empresa')"],
  ['vagaRoutes.js', "router.delete('/vaga/:id', authMiddleware, permitirTipos('empresa')"],
  ['verificaSeEnviadoRoutes.js', "router.get(\"/verificaSeEnviado\", authMiddleware, permitirTipos('usuario')"],
  ['verificaSeFavoritaRoutes.js', "router.get(\"/verificaSeFavorita\", authMiddleware, permitirTipos('usuario')"]
];

test('rotas protegidas declaram autenticacao e tipo de usuario correto', () => {
  for (const [arquivo, trecho] of rotasComPermissao) {
    const conteudo = fs.readFileSync(path.join(routesDir, arquivo), 'utf8');
    assert.ok(
      conteudo.includes("require('../middlewares/tipoUsuarioMiddleware')"),
      `${arquivo} deve importar tipoUsuarioMiddleware`
    );
    assert.ok(conteudo.includes(trecho), `${arquivo} deve conter: ${trecho}`);
  }
});

test('app registra todos os arquivos de rota em /api', () => {
  const app = fs.readFileSync(appPath, 'utf8');
  const importsEsperados = [
    'authRoutes',
    'healthRoutes',
    'empresaPageRoutes',
    'ususarioPageRoutes',
    'vagasFavoritasRoutes',
    'vagasEnviadasRoutes',
    'buscaVagaRoutes',
    'getAllVagas',
    'getVagaById',
    'verificaSeVFavorita',
    'verificaSeEnviado',
    'cadastroRoutes',
    'perfilRoutes',
    'avatarRoutes',
    'vagaRoutes',
    'buscaVagaEmpresa',
    'favoritarMarcar'
  ];

  for (const nome of importsEsperados) {
    assert.match(app, new RegExp(`app\\.use\\('/api',\\s*${nome}\\)`), `${nome} deve estar montada em /api`);
  }
});
