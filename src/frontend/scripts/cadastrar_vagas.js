
const token = localStorage.getItem('token');

CarreagarVagas()

async function CarreagarVagas() {

    try {
        const response = await fetch('http://localhost:3000/api/Vagasempresa', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        renderizarVagas(data);
        
    }
    catch (error) {
        alert('erro' + error);
    }

}

const botao = document.getElementById("publicar");

botao.addEventListener("click", async () => {
    try {
        const dados = {
            titulo: document.getElementById("titulo").value,
            cidade: document.getElementById("cidade").value,
            cargaHoraria: document.getElementById("carga").value,
            tipoVaga: document.getElementById("modelo").value,
            requisitos: document.getElementById("requisitos").value,
            salario: document.getElementById("salario").value,
            descricao: document.getElementById("descricao").value,
            status: "Ativa"
        };

        const response = await fetch("http://localhost:3000/api/vaga", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(dados)
        });

        const res = await response.json();

        if (!response.ok) {
            throw new Error(res.mensagem || "Erro ao cadastrar");
        }

        
        document.querySelector(".form-vaga").reset();

        CarreagarVagas();
    } catch (error) {
        alert("Erro ao cadastrar vaga:\n" + error.message);
    }
});














const container = document.getElementById("lista-vagas");

function renderizarVagas(vagas) {
    container.innerHTML = "";

    
    vagas.forEach(vaga => {
        const card = document.createElement("div");
        card.classList.add("card-vaga");

        card.innerHTML = `
            <h2>${vaga.titulo}</h2>

            <div class="info">
                <p>🏢 ${vaga.empresa}</p>
                <p>📍 ${vaga.cidade}</p>
            </div>

            <p class="descricao">${vaga.descricao}</p>

            <div class="acoes">
                <button class="btn-editar" onclick="editarVaga(${vaga.ID_vaga})">
                    Editar
                </button>

                <button class="btn-excluir" onclick="excluirVaga(${vaga.ID_vaga})">
                    Excluir
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

function editarVaga(id) {
    window.location.href = `/pages/editar_vagas.html?id=${id}`;

}

async function excluirVaga(id) {
    const confirmacao = confirm("Deseja excluir essa vaga?");

    if (!confirmacao) return;

    try {
        const response = await fetch(`http://localhost:3000/api/vaga/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensagem || "Erro ao excluir");
        }

        alert("Vaga excluída com sucesso! 🗑️");

        
        CarreagarVagas();

    } catch (error) {
        alert("Erro ao excluir vaga:\n" + error.message);
    }
}

