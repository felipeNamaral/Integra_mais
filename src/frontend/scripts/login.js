const form = document.getElementById('loginForm');
const errorMessage = document.getElementById('error-message');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);


            if (data.tipo === 'empresa') {
                window.location.href = '../pages/empresa.html';
            } else {
                window.location.href = '../pages/usuario.html';
            }
        } else {
            errorMessage.textContent = data.message;
        }
    } catch (error) {
        alert('Erro ao fazer login:', error);
    }


});

