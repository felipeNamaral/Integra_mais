const token = localStorage.getItem('token');
const nome = document.getElementById('nome');



async function init() {
    await carregar();
    await carregaDados();
    await favoritados();
}

init();


async function carregar() {

    const response = await fetch('http://localhost:3000/api/protected', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    nome.textContent = `${data.nome}`;
};

async function carregaDados() {
    try {
        const response = await fetch(

            `http://localhost:3000/api/usuario`, {
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
        const response = await fetch(`http://localhost:3000/api/vagasFavoritadas`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const dataVagasFavoritadas = await response.json();

        const response2 = await fetch(`http://localhost:3000/api/vagasEnviadas`,{
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
    email.textContent ='📧​ ' +`${data.email}`;
    telefone.textContent ="📞 " + `${data.telefone}`;

    idade.textContent ='​🎂 '+ `${data.idade}`;

    if (!data.descricao) {
        descricao.textContent = `Sem descrição`;
    } else {
        descricao.textContent = `${data.descricao}`;
    }
    

}


function trocaVagasFavoritadas(data) {
    if (data.length === 0) {
        document.getElementById('statsFavoritadas').textContent = `0`;
        document.getElementById('vagasFavoritadas').textContent = `Você ainda não favoritou nenhuma vaga.`;
    } else {
        document.getElementById('statsFavoritadas').textContent = `${data.length}`;

        printaVagasFavoritadas(data);
    }

}


function trocaVagasEnviadas(data) {
    if (data.length === 0) {
        document.getElementById('statsEnviadas').textContent = `0`;
        document.getElementById('vagasEnviadas').textContent = `Você ainda não enviou currículo para nenhuma vaga.`;
    } else {
        document.getElementById('statsEnviadas').textContent = `${data.length}`;
        printaVagasEnviadas(data);
    }

}


async function printaVagasFavoritadas(data) {

    try {

        //bucar todas as vagas de data 
        const responseVagas = await fetch(
            `http://localhost:3000/api/vaga?id=${data.map(v => v.ID_vaga).join(',')}`
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
            `http://localhost:3000/api/vaga?id=${data.map(v => v.ID_vaga).join(',')}`
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