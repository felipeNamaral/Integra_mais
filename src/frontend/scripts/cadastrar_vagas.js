const vagas = [
    {
        titulo: "Mecânico",
        empresa: "Mecânica Mecânica",
        local: "Campinas, SP",
        descricao: "Oportunidade para trabalhar em uma mecânica..."
    }
];

const container = document.getElementById("lista-vagas");

function renderizarVagas() {
    container.innerHTML = "";

    if (vagas.length === 0) return;

    vagas.forEach(vaga => {
        const card = document.createElement("div");
        card.classList.add("card-vaga");

        card.innerHTML = `
            <h3>${vaga.titulo}</h3>
            <p>🏢 ${vaga.empresa}</p>
            <p>📍 ${vaga.local}</p>
            <p>${vaga.descricao}</p>

            <div class="card-botoes">
                <button class="btn-editar">Editar</button>
                <button class="btn-desativar">Desativar</button>
            </div>
        `;

        container.appendChild(card);
    });
}

renderizarVagas();