const IDIOMA_PADRAO = "pt-BR";
const IDIOMA_ESPANHOL = "es";
const CHAVE_IDIOMA = "integraIdioma";

const scriptAtual = document.currentScript;
const URL_TRADUCOES = new URL(
  "traducoes.json",
  scriptAtual ? scriptAtual.src : window.location.href
).href;

let traducoesCarregadas = null;

function carregarTraducoes() {
  if (!traducoesCarregadas) {
    traducoesCarregadas = fetch(URL_TRADUCOES).then((resposta) => {
      if (!resposta.ok) {
        throw new Error("Nao foi possivel carregar o arquivo de traducoes.");
      }

      return resposta.json();
    });
  }

  return traducoesCarregadas;
}

function obterNosDeTextoDiretos(elemento) {
  return Array.from(elemento.childNodes).filter((node) => {
    return node.nodeType === Node.TEXT_NODE && node.nodeValue.trim();
  });
}

function preservarEspacos(textoOriginal, textoTraduzido) {
  const inicio = textoOriginal.match(/^\s*/)?.[0] || "";
  const fim = textoOriginal.match(/\s*$/)?.[0] || "";

  return `${inicio}${textoTraduzido}${fim}`;
}

function aplicarTextosDiretos(elemento, textos) {
  const nodes = obterNosDeTextoDiretos(elemento);

  nodes.forEach((node, index) => {
    if (typeof textos[index] !== "string") {
      return;
    }

    node.nodeValue = preservarEspacos(node.nodeValue, textos[index]);
  });
}

function aplicarEntrada(elemento, entrada) {
  if (Array.isArray(entrada.text)) {
    aplicarTextosDiretos(elemento, entrada.text);
  }

  if (typeof entrada.placeholder === "string" && "placeholder" in elemento) {
    elemento.placeholder = entrada.placeholder;
  }
}

async function traduzirPagina(idioma) {
  const traducoes = await carregarTraducoes();
  const entradas = traducoes[idioma] || traducoes[IDIOMA_PADRAO] || {};

  document.documentElement.lang = idioma === IDIOMA_ESPANHOL ? "es" : "pt-BR";

  Object.entries(entradas).forEach(([id, entrada]) => {
    const elemento = document.getElementById(id);

    if (!elemento) {
      return;
    }

    aplicarEntrada(elemento, entrada);
  });

  document.querySelectorAll(".trocar-idioma, .idioma-fixo").forEach((botao) => {
    botao.setAttribute(
      "aria-label",
      idioma === IDIOMA_PADRAO
        ? "Trocar idioma para espanhol"
        : "Cambiar idioma a portugues"
    );

    botao.title =
      idioma === IDIOMA_PADRAO
        ? "Trocar idioma para espanhol"
        : "Cambiar idioma a portugues";
  });
}

async function configurarTrocaDeIdioma() {
  const idiomaSalvo = localStorage.getItem(CHAVE_IDIOMA) || IDIOMA_PADRAO;

  await traduzirPagina(idiomaSalvo);

  document.querySelectorAll(".trocar-idioma, .idioma-fixo").forEach((botao) => {
    if (botao.dataset.idiomaConfigurado === "true") {
      return;
    }

    botao.dataset.idiomaConfigurado = "true";

    botao.addEventListener("click", async () => {
      const idiomaAtual = localStorage.getItem(CHAVE_IDIOMA) || IDIOMA_PADRAO;
      const proximoIdioma =
        idiomaAtual === IDIOMA_PADRAO ? IDIOMA_ESPANHOL : IDIOMA_PADRAO;

      localStorage.setItem(CHAVE_IDIOMA, proximoIdioma);
      await traduzirPagina(proximoIdioma);
    });
  });
}

document.addEventListener("DOMContentLoaded", configurarTrocaDeIdioma);
document.addEventListener("swup:contentReplaced", configurarTrocaDeIdioma);
document.addEventListener("swup:page:view", configurarTrocaDeIdioma);

if (document.body) {
  new MutationObserver(() => {
    configurarTrocaDeIdioma();
  }).observe(document.body, {
    childList: true,
    subtree: true
  });
}
