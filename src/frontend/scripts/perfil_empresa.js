const token = localStorage.getItem('token');
const nome = document.getElementById('nome');
const avatarPadrao = "/assets/img/user.png";


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
        await carregarAvatar();



    } catch (error) {
        console.error('Erro ao carregar usuário:', error);
    }
}

async function carregarAvatar() {
    try {
        const response = await fetch('http://localhost:3000/api/avatar', {
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
    cnpj.textContent = `CNPJ: ${data.cnpj}`;
    email.textContent = `Email: ${data.email}`;
    telefone.textContent = `Telefone: ${data.telefone}`;

if (!data.endereco) {
    endereco.textContent = "Endereço: Sem endereço";
} else {
    endereco.textContent = `Endereço: ${data.endereco}`;
}
    descricao.textContent = `Descrição: ${data.descricao}`;
}
