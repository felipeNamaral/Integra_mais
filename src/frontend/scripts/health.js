const token = localStorage.getItem("token");
const nome = document.getElementById("nome");
const avatarPadrao = "/assets/img/user.png";


async function carregar() {
  const response = await fetch('/api/protected', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  nome.textContent = `${data.nome}`;
  await carregarAvatar();
}
carregar();
async function carregarAvatar() {
  try {
    const response = await fetch('/api/avatar', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();
    const avatar = data.avatar || avatarPadrao;
    const imagensAvatar = document.querySelectorAll('img[src="/assets/img/user.png"], img#avatar');

    imagensAvatar.forEach((imagem) => {
      imagem.src = avatar;
      imagem.onerror = () => {
        imagem.src = avatarPadrao;
      };
    });
  } catch (error) {
    console.error('Erro ao carregar avatar:', error);
  }
}







function idiomaAtual() {
  return localStorage.getItem("integraIdioma") || "pt-BR";
}

function textoSaude(chave, valores = {}) {
  const textos = {
    atribuicaoMapa: {
      "pt-BR": "© OpenStreetMap",
      es: "© OpenStreetMap"
    },
    voceEstaAqui: {
      "pt-BR": "Você está aqui",
      es: "Estás aquí"
    },
    semTelefone: {
      "pt-BR": "Sem telefone",
      es: "Sin teléfono"
    },
    unidadesEncontradas: {
      "pt-BR": `${valores.total} unidades encontradas`,
      es: `${valores.total} unidades encontradas`
    },
    comoChegar: {
      "pt-BR": "Como Chegar",
      es: "Cómo llegar"
    },
    favoritado: {
      "pt-BR": "Favoritado",
      es: "Favorito"
    },
    favoritar: {
      "pt-BR": "Favoritar",
      es: "Agregar a favoritos"
    },
    naoInformado: {
      "pt-BR": "Não informado",
      es: "No informado"
    },
    loginFavoritar: {
      "pt-BR": "Faça login para favoritar unidades.",
      es: "Inicia sesión para favoritar unidades."
    },
    cidadeNaoEncontrada: {
      "pt-BR": "Cidade não encontrada",
      es: "Ciudad no encontrada"
    },
    erroBuscarUnidades: {
      "pt-BR": "Erro ao buscar unidades",
      es: "Error al buscar unidades"
    },
    erroCarregarUnidades: {
      "pt-BR": `Erro ao carregar unidades: ${valores.mensagem || ""}`,
      es: `Error al cargar unidades: ${valores.mensagem || ""}`
    },
    erroAtualizarFavorito: {
      "pt-BR": "Erro ao atualizar favorito",
      es: "Error al actualizar favorito"
    }
  };

  return textos[chave][idiomaAtual()] || textos[chave]["pt-BR"];
}

const headers = document.querySelectorAll(".accordion-header");

headers.forEach(header => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;

    document.querySelectorAll(".accordion-content").forEach(c => {
      if (c !== content) {
        c.style.maxHeight = null;
        c.classList.remove("open");
      }
    });

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      content.classList.remove("open");
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.add("open");
    }
  });
});

const defaultLat = -23.5505;
const defaultLng = -46.6333;

const icons = {
  hospital: new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  upa: new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  ubs: new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
};

let map;
let markersLayer;
let unidades = [];
let unidadesGlobais = [];
let unidadesFavoritas = [];
let idsUnidadesFavoritas = new Set();

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      criarMapa(latitude, longitude);
      buscarUnidades(latitude, longitude);
    },
    () => {
      criarMapa(defaultLat, defaultLng);
      buscarUnidades(defaultLat, defaultLng);
    }
  );
} else {
  criarMapa(defaultLat, defaultLng);
  buscarUnidades(defaultLat, defaultLng);
}

function criarMapa(lat, lng) {
  map = L.map("map").setView([lat, lng], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: textoSaude("atribuicaoMapa")
  }).addTo(map);

  markersLayer = L.layerGroup().addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(textoSaude("voceEstaAqui"));
}

function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
}

async function carregarUnidadesFavoritas() {
  if (!token) {
    unidadesFavoritas = [];
    idsUnidadesFavoritas = new Set();
    return;
  }

  const response = await fetch("/api/unidades/favoritas", {
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    unidadesFavoritas = [];
    idsUnidadesFavoritas = new Set();
    return;
  }

  unidadesFavoritas = await response.json();
  idsUnidadesFavoritas = new Set(
    unidadesFavoritas.map(u => String(u.ID_Unidade))
  );
}

async function buscarUnidades(lat, lng) {
  try {
    const response = await fetch(`/api/unidades?lat=${lat}&lng=${lng}`);

    if (!response.ok) throw new Error(textoSaude("erroBuscarUnidades"));

    unidades = await response.json();
    unidadesGlobais = unidades;

    await carregarUnidadesFavoritas();
    aplicarFiltro();
  } catch (err) {
    console.error(err);
    mostrarPopup(textoSaude("erroCarregarUnidades", { mensagem: err.message }), "error");
  }
}

function adicionarMarcadores(unidadesParaExibir) {
  if (!markersLayer) return;

  markersLayer.clearLayers();

  unidadesParaExibir.forEach(u => {
    if (!u?.latitude || !u?.longitude) return;

    const tipo = (u.tipo || "").toLowerCase().trim();
    let icon;

    if (tipo.includes("hospital")) icon = icons.hospital;
    else if (tipo.includes("ubs")) icon = icons.ubs;
    else icon = icons.upa;

    L.marker([Number(u.latitude), Number(u.longitude)], { icon })
      .bindPopup(`
        <b>${u.nome}</b><br>
        ${u.tipo}<br>
        ${u.telefone || textoSaude("semTelefone")}<br>
        ${Number(u.distancia || 0).toFixed(1)} km
      `)
      .addTo(markersLayer);
  });
}

function renderizarUnidades(unidadesParaExibir) {
  const container = document.getElementById("lista-unidades");
  let html = `<h3>${textoSaude("unidadesEncontradas", { total: unidadesParaExibir.length })}</h3>`;

  unidadesParaExibir.forEach(u => {
    const tipo = (u.tipo || "").toLowerCase().trim();
    const favoritada = idsUnidadesFavoritas.has(String(u.ID_Unidade));

    let badgeClass = "";
    let badgeText = "";

    if (tipo.includes("hospital")) {
      badgeClass = "badge-hospital";
      badgeText = "Hospital";
    } else if (tipo.includes("upa")) {
      badgeClass = "badge-upa";
      badgeText = "UPA";
    } else {
      badgeClass = "badge-ubs";
      badgeText = "UBS";
    }

    const enderecoCompleto = `${u.endereco || ""}, ${u.nome_municipio || ""}`.trim();

    html += `
      <div class="card-unidade">
        <div class="card-header">
          <div class="title-area">
            <span class="pin">📍</span>
            <h4>${u.nome}</h4>
          </div>

          <div class="card-actions">
            <button class="btn-rota" data-endereco="${encodeURIComponent(enderecoCompleto)}">
              ${textoSaude("comoChegar")}
            </button>
            <button class="btn-favoritar-unidade ${favoritada ? "ativo" : ""}" data-id="${u.ID_Unidade}">
              <span class="material-symbols-outlined">star</span>
              <span>${favoritada ? textoSaude("favoritado") : textoSaude("favoritar")}</span>
            </button>
          </div>
        </div>

        <span class="badge ${badgeClass}">${badgeText}</span>

        <div class="info">
          <p>📍 ${u.endereco || ""} • <strong>${Number(u.distancia || 0).toFixed(1)} km</strong></p>
          <p>☎ ${u.telefone || textoSaude("naoInformado")}</p>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  configurarAcoesDosCards();
}

function configurarAcoesDosCards() {
  document.querySelectorAll(".btn-rota").forEach(botao => {
    botao.addEventListener("click", () => abrirRota(botao.dataset.endereco));
  });

  document.querySelectorAll(".btn-favoritar-unidade").forEach(botao => {
    botao.addEventListener("click", () => alternarFavoritoUnidade(botao));
  });
}

function abrirRota(endereco) {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${endereco}`;
  window.open(url, "_blank");
}

function getFiltroAtual() {
  return document.querySelector('input[name="filtro"]:checked').id;
}

function filtrarUnidades(unidadesParaFiltrar) {
  const filtro = getFiltroAtual();

  if (filtro === "todos") return unidadesParaFiltrar;
  if (filtro === "favoritos") return unidadesFavoritas;

  return unidadesParaFiltrar.filter(u => {
    const tipo = (u.tipo || "").toLowerCase();

    if (filtro === "hospital") return tipo.includes("hospital");
    if (filtro === "upa") return tipo.includes("upa");
    if (filtro === "ubs") return tipo.includes("ubs");

    return true;
  });
}

function aplicarFiltro() {
  const filtradas = filtrarUnidades(unidadesGlobais)
    .filter(u => u?.latitude != null && u?.longitude != null);

  adicionarMarcadores(filtradas);
  renderizarUnidades(filtradas);
}

async function alternarFavoritoUnidade(botao) {
  if (!token) {
    mostrarPopup(textoSaude("loginFavoritar"), "warning");
    return;
  }

  const idUnidade = botao.dataset.id;
  const favoritada = idsUnidadesFavoritas.has(String(idUnidade));

  try {
    const response = await fetch("/api/unidades/favorita", {
      method: favoritada ? "DELETE" : "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ idUnidade })
    });

    if (!response.ok) throw new Error(textoSaude("erroAtualizarFavorito"));

    await carregarUnidadesFavoritas();
    aplicarFiltro();
  } catch (err) {
    console.error(err);
    mostrarPopup(err.message, "error");
  }
}

const input = document.getElementById("cidade-input");

input.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    buscarCidade(input.value);
  }
});

async function buscarCidade(nomeCidade) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(nomeCidade)}`
  );

  const data = await res.json();

  if (data.length === 0) {
    mostrarPopup(textoSaude("cidadeNaoEncontrada"), "warning");
    return;
  }

  const lat = Number(data[0].lat);
  const lon = Number(data[0].lon);

  map.setView([lat, lon], 12);

  try {
    const response = await fetch(
      `/api/unidades?&cidade=${encodeURIComponent(nomeCidade)}`
    );

    if (!response.ok) throw new Error(textoSaude("erroBuscarUnidades"));

    unidades = await response.json();
    unidadesGlobais = unidades;

    await carregarUnidadesFavoritas();
    aplicarFiltro();
  } catch (err) {
    console.error(err);
    mostrarPopup(textoSaude("erroCarregarUnidades", { mensagem: err.message }), "error");
  }
}

document.querySelectorAll(".trocar-idioma, .idioma-fixo").forEach(botao => {
  botao.addEventListener("click", () => {
    setTimeout(() => {
      if (unidadesGlobais.length > 0 || unidadesFavoritas.length > 0) {
        aplicarFiltro();
      }
    }, 0);
  });
});
