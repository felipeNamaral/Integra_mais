const vagas = [
    {
        titulo: "Mecânico",
        empresa: "Mecânica Mecânica",
        local: "Campinas, SP",
        descricao: "Oportunidade para trabalhar em uma mecânica..."
    },
    {
        titulo: "Eletricista",
        empresa: "Elétrica Silva",
        local: "Sorocaba, SP",
        descricao: "Vaga para eletricista experiente..."
    },
    {
        titulo: "Soldador",
        empresa: "Metalúrgica XP",
        local: "São Paulo, SP",
        descricao: "Atuar com soldagem industrial..."
    }
];

const container = document.getElementById("lista-vagas");
const contador = document.getElementById("contador");

function renderizarVagas() {
    container.innerHTML = "";

    vagas.forEach(vaga => {
        const card = document.createElement("div");
        card.classList.add("card-vaga");

        card.innerHTML = `
            <h2>${vaga.titulo}</h2>
            <p>🏢 ${vaga.empresa}</p>
            <p>📍 ${vaga.local}</p>
            <p>${vaga.descricao}</p>
            <button class="btn-detalhes">Ver detalhes</button>
        `;

        container.appendChild(card);
    });

    contador.textContent = `${vagas.length} vagas encontradas`;
}

renderizarVagas();