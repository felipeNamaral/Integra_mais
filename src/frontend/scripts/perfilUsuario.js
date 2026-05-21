const token = localStorage.getItem('token');
const nome = document.getElementById('nome');
const avatarPadrao = "/assets/img/user.png";

function idiomaAtual() {
    return localStorage.getItem('integraIdioma') || 'pt-BR';
}

function textoPerfil(chave) {
    const textos = {
        semDescricao: {
            'pt-BR': 'Sem descrição',
            es: 'Sin descripción'
        },
        semFavoritas: {
            'pt-BR': 'Você ainda não favoritou nenhuma vaga.',
            es: 'Todavía no has marcado ninguna vacante como favorita.'
        },
        semEnviadas: {
            'pt-BR': 'Você ainda não enviou currículo para nenhuma vaga.',
            es: 'Todavía no has enviado currículo a ninguna vacante.'
        }
    };

    return textos[chave][idiomaAtual()] || textos[chave]['pt-BR'];
}



async function init() {
    await carregar();
    await carregaDados();
    await favoritados();
}

init();


async function carregar() {

    const response = await fetch('/api/protected', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    nome.textContent = `${data.nome}`;
    await carregarAvatar();
};

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

async function carregaDados() {
    try {
        const response = await fetch(

            `/api/usuario`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        trocaDadosPerfil(data);
    }
    catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
};


async function favoritados() {
    try {
        const response = await fetch(`/api/vagasFavoritadas`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const dataVagasFavoritadas = await response.json();

        const response2 = await fetch(`/api/vagasEnviadas`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const dataVagasEnviadas = await response2.json();

        trocaVagasFavoritadas(dataVagasFavoritadas);
        trocaVagasEnviadas(dataVagasEnviadas);


    } catch (error) {
        console.error('Erro ao carregar dados das vagas favoritadas/enviadas:', error);
    }

}


function trocaDadosPerfil(data) {

    let nome = document.getElementById('nomeUsuario');
    let email = document.getElementById('emailUsuario');
    let telefone = document.getElementById('telefoneUsuario');
    let descricao = document.getElementById('descricaoUsuario');
    let idade = document.getElementById('idadeUsuario');

    nome.textContent = `${data.nome}`;
    email.textContent = '📧 ' + data.email;
    telefone.textContent = '📞 ' + data.telefone;
    idade.textContent = '🎂 ' + data.idade;

    if (!data.descricao) {
        descricao.textContent = textoPerfil('semDescricao');
    } else {
        descricao.textContent = `${data.descricao}`;
    }
    

}


function trocaVagasFavoritadas(data) {
    if (data.length === 0) {
        document.getElementById('statsFavoritadas').textContent = `0`;
        document.getElementById('vagasFavoritadas').textContent = textoPerfil('semFavoritas');
    } else {
        document.getElementById('statsFavoritadas').textContent = `${data.length}`;

        printaVagasFavoritadas(data);
    }

}


function trocaVagasEnviadas(data) {
    if (data.length === 0) {
        document.getElementById('statsEnviadas').textContent = `0`;
        document.getElementById('vagasEnviadas').textContent = textoPerfil('semEnviadas');
    } else {
        document.getElementById('statsEnviadas').textContent = `${data.length}`;
        printaVagasEnviadas(data);
    }

}


async function printaVagasFavoritadas(data) {

    try {

        //bucar todas as vagas de data 
        const responseVagas = await fetch(
            `/api/vaga?id=${data.map(v => v.ID_vaga).join(',')}`
        );


        const dataVagas = await responseVagas.json();

        const container = document.getElementById('vagasFavoritadas');

        let html = `<div class="scroll-vagas">`;

        dataVagas.forEach(v => {
            html += `
        <div class="card-vaga" onclick="abrirVaga(${v.ID_vaga})">

            <div class="card-header">
                <h4>${v.titulo}</h4>
            </div>

            <div class="info">
                <p>🏢 ${v.empresa}</p>
                <p>💰 ${Number(v.salario).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })}</p>
                <p>📄 ${v.tipo_vaga}</p>
                <p>⏱️ ${v.carga_horaria}h</p>
            </div>

        </div>
    `;
        });

        html += `</div>`;

        container.innerHTML = html;



    } catch (error) {
        console.error('Erro ao carregar dados das vagas:', error);
    }

}


async function printaVagasEnviadas(data) {
    try {

        //bucar todas as vagas de data 
        const responseVagas = await fetch(
            `/api/vaga?id=${data.map(v => v.ID_vaga).join(',')}`
        );


        const dataVagas = await responseVagas.json();

        const container = document.getElementById('vagasEnviadas');

        let html = `<div class="scroll-vagas">`;

        dataVagas.forEach(v => {
            html += `
        <div class="card-vaga" onclick="abrirVaga(${v.ID_vaga})">

            <div class="card-header">
                <h4>${v.titulo}</h4>
            </div>

            <div class="info">
                <p>🏢 ${v.empresa}</p>
                <p>💰 ${Number(v.salario).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })}</p>
                <p>📄 ${v.tipo_vaga}</p>
                <p>⏱️ ${v.carga_horaria}h</p>
            </div>

        </div>
    `;
        });

        html += `</div>`;

        container.innerHTML = html;

    } catch (error) {
        console.error('Erro ao carregar dados das vagas:', error);
    }
};



function abrirVaga(id) {
    window.location.href = `/pages/detalhes_vaga.html?id=${id}`;
}
