const token = localStorage.getItem('token');
const nome = document.getElementById('nome');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const avatarPadrao = "/assets/img/user.png";


async function inicio() {
    await carregar();
    await carregaVaga();
    await carregaStatusVagas();
}

inicio();



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

async function carregaVaga() {
    try {
        const response = await fetch(`/api/vagaById?id=${id}`);
        const data = await response.json();

        carregarDetalhes(data);
    }
    catch (error) {
        console.error("Erro ao carregar vagas:", error);
    }
}

async function carregaStatusVagas() {
    try {
        const response = await fetch(`/api/verificaSeFavorita?ID_vaga=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();



    } catch (error) {
        alert("erro err " + error);
        console.error("Erro ao verificar favorito:", error);
    }





    try {
        const response = await fetch(`/api/verificaSeEnviado?ID_vaga=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();


    } catch (error) {
        alert("ero ero");
        console.error("Erro ao verificar favorito:", error);
    }

}






function carregarDetalhes(vaga) {
    if (!vaga) return;

    // Header da vaga
    document.getElementById("titulo-vaga").textContent = vaga.titulo;
    document.getElementById("empresa-vaga").textContent = vaga.empresa;
    document.getElementById("cidade-vaga").textContent = vaga.cidade;

    // Novos campos
    document.getElementById("salario-vaga").textContent =
        vaga.salario ? `R$ ${Number(vaga.salario).toFixed(2)}` : "A combinar";

    document.getElementById("carga-horaria-vaga").textContent =
        vaga.carga_horaria ? `${vaga.carga_horaria}h/semana` : "Não informado";

    document.getElementById("tipo-vaga").textContent =
        vaga.tipo_vaga || "Não informado";

    document.getElementById("data-publicacao-vaga").textContent =
        vaga.data_publicacao
            ? new Date(vaga.data_publicacao).toLocaleDateString("pt-BR")
            : "Sem data";

    // Descrição
    document.getElementById("descricao-vaga").textContent = vaga.descricao;
    document.getElementById("email-empresa-vaga").textContent =
        vaga.empresa_email ? ` ${vaga.empresa_email}` : "";

    // Requisitos
    const lista = document.getElementById("requisitos-vaga");
    lista.innerHTML = "";

    if (vaga.requisitos) {
        const requisitosArray = vaga.requisitos
            .split(/,| e /g)
            .map(r => r.trim())
            .filter(Boolean);

        requisitosArray.forEach(req => {
            const li = document.createElement("li");
            li.textContent = req;
            lista.appendChild(li);
        });
    }
}



















