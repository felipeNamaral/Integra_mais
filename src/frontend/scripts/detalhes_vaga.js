const token = localStorage.getItem('token');
const nome = document.getElementById('nome');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const btnFavoritar = document.getElementById('btn-favoritar');
const btnEnviar = document.getElementById('btn-enviar');
let favoritada = false;
let enviada = false;




async function inicio() {
    await carregar();
    await carregaVaga();
    await carregaStatusVagas();
}

inicio();



async function carregar() {
    const response = await fetch('http://localhost:3000/api/protected', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    nome.textContent = `${data.nome}`;
}

async function carregaVaga() {
    try {
        const response = await fetch(`http://localhost:3000/api/vagaById?id=${id}`);
        const data = await response.json();

        carregarDetalhes(data);
    }
    catch (error) {
        console.error("Erro ao carregar vagas:", error);
    }
}

async function carregaStatusVagas() {
    try {
        const response = await fetch(`http://localhost:3000/api/verificaSeFavorita?ID_vaga=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data.favoritada) {
            favoritada = true;
            btnFavoritar.classList.add('ativo');
        }


    } catch (error) {
        alert("erro err " + error);
        console.error("Erro ao verificar favorito:", error);
    }





    try {
        const response = await fetch(`http://localhost:3000/api/verificaSeEnviado?ID_vaga=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data.Enviado) {
            enviada = true;
            btnEnviar.classList.add('ativo');

        }

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














// Lógica para Favoritar
btnFavoritar.addEventListener('click', async () => {
    try {
        if (favoritada) {
            // Rota de remover favorito


            favoritada = false;
            btnFavoritar.classList.remove('ativo');
            showToast("Removido dos favoritos ❌", "error");

        } else {
            // Rota de ADD aos favoritos 


            favoritada = true;
            btnFavoritar.classList.add('ativo');
            showToast("Adicionado aos favoritos ⭐");
        }

    } catch (error) {
        alert(error);
        console.error(error);
    }

});






// Lógica para Marcar como Enviado
btnEnviar.addEventListener('click', async () => {
    try {
        if (enviada) {
            

            enviada = false;
            btnEnviar.classList.remove('ativo');
            showToast("Desmarcado como enviado ❌", "error");

        } else {
            // 🟢 marcar como enviado


            enviada = true;
            btnEnviar.classList.add('ativo');
            showToast("Marcado como enviado 🚀");
        }

    } catch (error) {
        alert(error);
        console.error(error);
    }




});






function showToast(message, type = "success") {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}






