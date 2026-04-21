const vagas = [
    {
        id: 1,
        titulo: "Mecânico",
        empresa: "Mecânica Mecânica",
        local: "Campinas, SP",
        descricao: "Oportunidade para trabalhar em uma mecânica..."
    },
    {
        id: 2,
        titulo: "Eletricista",
        empresa: "Elétrica Silva",
        local: "Sorocaba, SP",
        descricao: "Vaga para eletricista com experiência..."
    },
    {
        id: 3,
        titulo: "Soldador",
        empresa: "Metalúrgica XP",
        local: "São Paulo, SP",
        descricao: "Atuar com soldagem industrial..."
    }
];

const container = document.getElementById("lista-vagas");

function renderizarVagas() {
    container.innerHTML = "";

    vagas.forEach(vaga => {
        const card = document.createElement("div");
        card.classList.add("card-vaga");

        card.innerHTML = `
            <h2>${vaga.titulo}</h2>

            <div class="info">
                <p>🏢 ${vaga.empresa}</p>
                <p>📍 ${vaga.local}</p>
            </div>

            <p class="descricao">${vaga.descricao}</p>

            <div class="acoes">
                <button class="btn-editar" onclick="editarVaga(${vaga.id})">
                    Editar
                </button>

                <button class="btn-excluir" onclick="excluirVaga(${vaga.id})">
                    Excluir
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

function editarVaga(id) {
    alert("Editar vaga ID: " + id);
}

function excluirVaga(id) {
    const confirmacao = confirm("Deseja excluir essa vaga?");
    
    if (confirmacao) {
        const index = vagas.findIndex(v => v.id === id);
        vagas.splice(index, 1);
        renderizarVagas();
    }
}

document.addEventListener("DOMContentLoaded", renderizarVagas);