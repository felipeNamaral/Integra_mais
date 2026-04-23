

const token = localStorage.getItem('token');
const nome = document.getElementById('nome');

async function carregar() {
  const response = await fetch('http://localhost:3000/api/protected', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  nome.textContent = `${data.nome}`;
}

carregar();





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











//loq de sp
const defaultLat = -23.5505;
const defaultLng = -46.6333;

const icons = {
  hospital: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),

  upa: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),

  ubs: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
};

let map;


// começo

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
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
  map = L.map('map').setView([lat, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  markersLayer = L.layerGroup().addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup("Você está aqui");
}




let unidades;
let unidadesGlobais = [];

async function buscarUnidades(lat, lng, cidade) {
  try {


    const response = await fetch(

      `http://localhost:3000/api/unidades?lat=${lat}&lng=${lng}`
    );

    if (!response.ok) throw new Error("Erro ao buscar unidades");

    unidades = await response.json();
    unidadesGlobais = unidades;

    aplicarFiltro();


  } catch (err) {
    console.error(err);
    alert("Erro ao carregar unidades");
  }
}


function adicionarMarcadores(unidades) {
  if (!markersLayer) return;

  markersLayer.clearLayers();

  unidades.forEach(u => {
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
        ${u.telefone || "Sem telefone"}<br>
        ${(u.distancia || 0).toFixed(1)} km
      `)
      .addTo(markersLayer);
  });
}




function renderizarUnidades(unidades) {
  const container = document.getElementById("lista-unidades");

  let html = `<h3>${unidades.length} unidades encontradas</h3>`;

  unidades.forEach(u => {

    const tipo = (u.tipo || "").toLowerCase().trim();

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

          <button class="btn-rota" onclick="abrirRota('${encodeURIComponent(enderecoCompleto)}')">
  Como Chegar
</button>
        </div>

        <span class="badge ${badgeClass}">${badgeText}</span>

        <div class="info">
          <p>📍 ${u.endereco || ""} • <strong>${(u.distancia || 0).toFixed(1)} km</strong></p>
          <p>📞 ${u.telefone || "Não informado"}</p>
        </div>

      </div>
    `;
  });

  container.innerHTML = html;
}


function abrirRota(endereco) {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${endereco}`;
  window.open(url, "_blank");
}



function getFiltroAtual() {
  return document.querySelector('input[name="filtro"]:checked').id;
}

function filtrarUnidades(unidades) {
  const filtro = getFiltroAtual();

  if (filtro === "todos") return unidades;

  return unidades.filter(u => {
    const tipo = (u.tipo || "").toLowerCase();

    if (filtro === "hospital") return tipo.includes("hospital");
    if (filtro === "upa") return tipo.includes("upa");
    if (filtro === "ubs") return tipo.includes("ubs");

    return true;
  });
}


function aplicarFiltro() {
  const filtradas = filtrarUnidades(unidadesGlobais).filter(u => u?.latitude != null && u?.longitude != null);

  adicionarMarcadores(filtradas);
  renderizarUnidades(filtradas);
}




const input = document.getElementById("cidade-input");

input.addEventListener("keypress", (e) => {
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
    alert("Cidade não encontrada");
    return;
  }

  const lat = Number(data[0].lat);
  const lon = Number(data[0].lon);

  map.setView([lat, lon], 12);

  try {
    const response = await fetch(

      `http://localhost:3000/api/unidades?&cidade=${encodeURIComponent(nomeCidade)}`
    );

    if (!response.ok) throw new Error("Erro ao buscar unidades ");

    unidades = await response.json();
    unidadesGlobais = unidades;

    aplicarFiltro();


  } catch (err) {
    console.error(err);
    alert("Erro ao carregar unidades aaaaaa" + err);
  }
}