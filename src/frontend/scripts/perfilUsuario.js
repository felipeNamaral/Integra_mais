const token = localStorage.getItem('token');
const nome = document.getElementById('nome');
let id ;


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
    id = data.id;
    

};

async function carregaDados() {
    try {
        const response = await fetch(
            `http://localhost:3000/api/usuario?id=${id}`
        );
        const data = await response.json();
        trocaDadosPerfil(data);
    }
    catch (error) {
        alert('Erro ao carregar dados do usuário. Por favor, tente novamente mais tarde.'+id);
        console.error('Erro ao carregar dados:', error);
    }
};


async function favoritados() {
    try {
        const response = await fetch()
        const dataVagasFavoritadas = await response.json();

        const response2 = await fetch()
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
    email.textContent = `${data.email}`;
    telefone.textContent = `${data.telefone}`;
    if (!data.descricao) {
        descricao.textContent = `Sem descrição`;
    } else {
        descricao.textContent = `${data.descricao}`;
    }
    idade.textContent = `${data.idade}`;


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


async function printaVagasFavoritadas(data){

    try {
        const responseVagas = await fetch()
        const dataVagas = await responseVagas.json();

        const container = document.getElementById('vagasFavoritadas');

        let html = `<div class="scroll-vagas">`;

        data.forEach(v => {
            html += `
        <div class="card-vaga" onclick="abrirVaga(${v.id})">

            <div class="card-header">
                <h4>${v.titulo}</h4>
            </div>

            <div class="info">
                <p>🏢 ${v.empresa}</p>
                <p>📍 ${v.cidade}, ${v.estado}</p>
            </div>

        </div>
    `;
        });

        html += `</div>`;

        container.innerHTML = html;


/*


.scroll-vagas {
  max-height: 40vh; 
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  padding-right: 0.5rem;
}


.card-vaga {
  background: #fff;
  border-radius: 0.75rem;
  padding: 0.75rem;

  box-shadow: 0 0.125rem 0.5rem rgba(0,0,0,0.05);

  cursor: pointer;
  transition: transform 0.2s ease;
}

.card-vaga:active {
  transform: scale(0.98); 


.card-header h4 {
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}


.info p {
  font-size: 0.8rem;
  margin: 0.125rem 0;
}

@media (min-width: 48rem) {
  .scroll-vagas {
    max-height: 50vh;
  }

  .card-vaga {
    padding: 1rem;
  }

  .card-header h4 {
    font-size: 1rem;
  }

  .info p {
    font-size: 0.9rem;
  }
}

*/

    } catch (error) {
        console.error('Erro ao carregar dados das vagas:', error);
    }

}


async function printaVagasEnviadas(data) {
    try {
        const responseVagas = await fetch()
        const dataVagas = await responseVagas.json();

        const container = document.getElementById('vagasEnviadas');

        let html = `<div class="scroll-vagas">`;

        data.forEach(v => {
            html += `
        <div class="card-vaga" onclick="abrirVaga(${v.id})">

            <div class="card-header">
                <h4>${v.titulo}</h4>
            </div>

            <div class="info">
                <p>🏢 ${v.empresa}</p>
                <p>📍 ${v.cidade}, ${v.estado}</p>
            </div>

        </div>
    `;
        });

        html += `</div>`;

        container.innerHTML = html;    



}    catch (error) {
        console.error('Erro ao carregar dados das vagas:', error);
    }



};



function abrirVaga(id) {
    window.location.href = `/vaga.html?id=${id}`;
}