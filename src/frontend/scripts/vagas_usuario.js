const token = localStorage.getItem('token');
const nome = document.getElementById('nome');
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





carregaVagas();




async function carregaVagas() {
    try {
        const response = await fetch('/api/vagaAll');
        const data = await response.json();

        renderizarVagas(data);
    }
    catch (error) {
        console.error("Erro ao carregar vagas:", error);
    }
}


const container = document.getElementById("lista-vagas");
const contador = document.getElementById("contador");

function renderizarVagas(vagas) {

    container.innerHTML = "";

    vagas.forEach(vaga => {
        const card = document.createElement("div");
        card.classList.add("card-vaga");

        card.innerHTML = `
            <h2>${vaga.titulo}</h2>
            <p>🏢 ${vaga.empresa}</p>
            <p>📍 ${vaga.cidade}</p>
            <p>${vaga.descricao}</p>
            <button class="btn-detalhes" onclick="verDetalhes(${vaga.ID_vaga})">
    Ver detalhes
</button>
        `;

        container.appendChild(card);
    });

    contador.textContent = `${vagas.length} vagas encontradas`;
}



const input = document.getElementById("buscaVaga");

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {

        filtraVaga(input.value);
    }
});



async function filtraVaga(input) {
    try {
        const response = await fetch(
            `/api/vagaAll?busca=${encodeURIComponent(input)}`
        );

        const data = await response.json();
        renderizarVagas(data);

    } catch (error) {
        console.error("Erro ao carregar vagas:", error);
    }
}


function verDetalhes(id) {
    window.location.href = `/pages/detalhes_vaga.html?id=${id}`;
    
}