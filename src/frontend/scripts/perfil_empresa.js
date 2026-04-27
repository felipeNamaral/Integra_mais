const token = localStorage.getItem('token');
const nome = document.getElementById('nome');


async function init() {
    await carregar();
    await carregaDados();
}


init();

async function carregar() {
    try {
        const response = await fetch('http://localhost:3000/api/protected', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
 
        const data = await response.json();

        nome.textContent = data.nome;
        
        

    } catch (error) {
        console.error('Erro ao carregar usuário:', error);
    }
}


async function carregaDados() {
    try {


        const response = await fetch(
            `http://localhost:3000/api/empresa`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );

        const data = await response.json();

        trocaDadosPerfilEmpresa(data);

    } catch (error) {
        alert('Erro ao carregar dados da empresa. Tente novamente.\n' + error);
        console.error('Erro:', error);
    }
}

function trocaDadosPerfilEmpresa(data) {

    let nomeEmpresa = document.getElementById('nomeUsuario');
    let cnpj = document.getElementById('CnpjEmpresa');
    let email = document.getElementById('emailEmpresa');
    let telefone = document.getElementById('telefoneEmpresa');
    let endereco = document.getElementById('enderecoEmpresa');
    let descricao = document.getElementById('descricao')
    nomeEmpresa.textContent = data.nome;
    cnpj.textContent = data.cnpj;
    email.textContent = data.email;
    telefone.textContent = data.telefone;

    if (!data.endereco) {
        endereco.textContent = "Sem endereço";
    } else {
        endereco.textContent = data.endereco;
    }

    descricao.textContent = data.descricao;
}