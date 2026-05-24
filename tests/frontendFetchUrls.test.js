const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const scriptsDir = path.resolve(__dirname, '../src/frontend/scripts');

test('scripts do frontend usam rotas relativas para a API local', () => {
  const arquivos = fs
    .readdirSync(scriptsDir)
    .filter((arquivo) => arquivo.endsWith('.js'));

  const comLocalhost = arquivos.filter((arquivo) => {
    const conteudo = fs.readFileSync(path.join(scriptsDir, arquivo), 'utf8');
    return /fetch\(\s*[`'"]http:\/\/localhost:3000\/api/.test(conteudo);
  });

  assert.deepEqual(comLocalhost, []);
});
