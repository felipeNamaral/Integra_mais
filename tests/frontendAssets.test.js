const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const frontendDir = path.resolve(__dirname, '../src/frontend');
const scriptsDir = path.join(frontendDir, 'scripts');
const pagesDir = path.join(frontendDir, 'pages');

function listarArquivos(dir, extensao) {
  return fs.readdirSync(dir).filter((arquivo) => arquivo.endsWith(extensao));
}

test('todos os scripts do frontend possuem sintaxe JavaScript valida', () => {
  for (const arquivo of listarArquivos(scriptsDir, '.js')) {
    const conteudo = fs.readFileSync(path.join(scriptsDir, arquivo), 'utf8');
    if (/^\s*import\s/m.test(conteudo) || /^\s*export\s/m.test(conteudo)) {
      const importsRelativos = [...conteudo.matchAll(/from\s+["']([^"']+)["']/g)]
        .map((match) => match[1])
        .filter((referencia) => referencia.startsWith('.'));

      for (const referencia of importsRelativos) {
        const destino = path.resolve(scriptsDir, path.dirname(arquivo), referencia);
        assert.ok(fs.existsSync(destino), `${arquivo} importa arquivo existente: ${referencia}`);
      }
      continue;
    }

    assert.doesNotThrow(() => new vm.Script(conteudo), `${arquivo} deve ter sintaxe valida`);
  }
});

test('frontend nao referencia API absoluta em localhost', () => {
  const arquivos = listarArquivos(scriptsDir, '.js');
  const ocorrencias = [];

  for (const arquivo of arquivos) {
    const conteudo = fs.readFileSync(path.join(scriptsDir, arquivo), 'utf8');
    if (conteudo.includes('http://localhost:3000/api')) {
      ocorrencias.push(arquivo);
    }
  }

  assert.deepEqual(ocorrencias, []);
});

test('paginas HTML referenciam scripts e estilos existentes', () => {
  const faltantes = [];

  for (const arquivo of listarArquivos(pagesDir, '.html')) {
    const conteudo = fs.readFileSync(path.join(pagesDir, arquivo), 'utf8');
    const referencias = [...conteudo.matchAll(/(?:src|href)=["']([^"']+)["']/g)]
      .map((match) => match[1])
      .filter((referencia) => referencia.startsWith('../') || referencia.startsWith('/'));

    for (const referencia of referencias) {
      const relativo = referencia.startsWith('/')
        ? referencia.slice(1)
        : path.join('pages', referencia);
      const destino = path.resolve(frontendDir, relativo);

      if (!destino.startsWith(frontendDir) || !fs.existsSync(destino)) {
        faltantes.push(`${arquivo} -> ${referencia}`);
      }
    }
  }

  assert.deepEqual(faltantes, []);
});
