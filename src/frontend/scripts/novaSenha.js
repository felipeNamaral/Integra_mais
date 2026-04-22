document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formNovaSenha");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const inputs = form.querySelectorAll('input[type="password"]');
            const novaSenha = inputs[0].value;
            const confirmaSenha = inputs[1].value;

            if (novaSenha !== confirmaSenha) {
                alert("As senhas não coincidem! Verifique e tente novamente.");
                return;
            }

            alert("Senha alterada com sucesso! Você será redirecionado para o Login.");
            window.location.href = "login.html";
        });
    }
});