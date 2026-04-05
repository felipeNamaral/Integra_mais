const token = localStorage.getItem('token');
const nome = document.getElementById('nome');

async function carregar() {
    const response = await fetch('http://localhost:3000/api/protected', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    nome.textContent = `Bem-vindo, ${data.nome}`;
}

carregar();