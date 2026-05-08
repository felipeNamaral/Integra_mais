(() => {
const token = localStorage.getItem('token');

const nomeHeader = document.getElementById('nome');
const nomeUsuario = document.getElementById('nomeUsuario');
const avatarPadrao = "/assets/img/user.png";

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
    } catch (erro) {
        console.error("Erro ao carregar avatar:", erro);
    }
}

async function carregarUsuario() {
    try {
        const response = await fetch('http://localhost:3000/api/protected', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (nomeHeader) {
            nomeHeader.textContent = data.nome;
        }

        if (nomeUsuario) {
            nomeUsuario.textContent = data.nome;
        }

        await carregarAvatar();

    } catch (erro) {
        console.error("Erro ao carregar usuário:", erro);
    }
}

document.addEventListener("DOMContentLoaded", carregarUsuario);
})();
