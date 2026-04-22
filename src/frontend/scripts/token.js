const token = localStorage.getItem('token');

const nomeHeader = document.getElementById('nome');
const nomeUsuario = document.getElementById('nomeUsuario');

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

    } catch (erro) {
        console.error("Erro ao carregar usuário:", erro);
    }
}

document.addEventListener("DOMContentLoaded", carregarUsuario);