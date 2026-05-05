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
carregaVagas();




async function carregaVagas() {
    try {
        const response = await fetch('http://localhost:3000/api/vagaAll');
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
            `http://localhost:3000/api/vagaAll?busca=${encodeURIComponent(input)}`
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