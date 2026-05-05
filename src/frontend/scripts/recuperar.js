document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("recuperarForm");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.querySelector('input[type="email"]').value;

            if (email) {
                console.log("Solicitação de recuperação para:", email);
                alert("Se o e-mail estiver cadastrado, você receberá um link de recuperação em breve!");
                
                // Redireciona de volta para o login após o alerta
                window.location.href = "login.html";
            }
        });
    }
});