document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const email = document.querySelector('input[type="email"]').value;
            const senha = document.querySelector('input[type="password"]').value;

            console.log("Tentativa de login:", { email, senha });

            // Simulação de validação
            if (email && senha) {
                alert("Login realizado! Redirecionando...");
                // window.location.href = "perfil.html"; 
            }
        });
    }
});