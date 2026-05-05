const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const nome = document.getElementById('nome');

const token = localStorage.getItem("token");
carregar();

async function carregar() {
    const response = await fetch('http://localhost:3000/api/protected', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    nome.textContent = `${data.nome}`;
}


async function carregarVaga() {
    try {
        const response = await fetch(`http://localhost:3000/api/vagaById?id=${id}`, {
        });

        const data = await response.json();
        
        preencherFormulario(data);

    } catch (error) {
        alert("Erro ao carregar vaga");
    }
}

carregarVaga();


function preencherFormulario(vaga) {
    document.getElementById("titulo").value = vaga.titulo;
    document.getElementById("cidade").value = vaga.cidade;
    document.getElementById("carga").value = vaga.carga_horaria;
    document.getElementById("modelo").value = vaga.tipo_vaga;
    document.getElementById("requisitos").value = vaga.requisitos;
    document.getElementById("salario").value = vaga.salario;
    document.getElementById("descricao").value = vaga.descricao;
}

const enviar = document.getElementById('envia');


enviar.addEventListener('click', async () => {
    try {
        const dados = {
            idVaga: id,
            titulo: document.getElementById("titulo").value,
            cidade: document.getElementById("cidade").value,
            cargaHoraria: document.getElementById("carga").value,
            tipoVaga: document.getElementById("modelo").value,
            requisitos: document.getElementById("requisitos").value,
            salario: document.getElementById("salario").value,
            descricao: document.getElementById("descricao").value,
            status: "Ativa"
        };

        const response = await fetch(`http://localhost:3000/api/vaga?ID_vaga=${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(dados)
        });

        const res = await response.json();

        if (!response.ok) {
            throw new Error(res.mensagem || "Erro ao editar");
        }

        alert("Vaga atualizada com sucesso!");

        
        window.location.href = "gerenciar_vagas.html";

    } catch (error) {
        alert("Erro ao editar vaga:\n" + error.message);
    }
});