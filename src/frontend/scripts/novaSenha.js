document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formNovaSenha");
    const email = sessionStorage.getItem("emailRecuperacaoSenha");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const inputs = form.querySelectorAll('input[type="password"]');
            const novaSenha = inputs[0].value;
            const confirmarSenha = inputs[1].value;

            if (!email) {
                alert("Informe seu email para recuperar a senha.");
                window.location.href = "recuperar.html";
                return;
            }

            if (novaSenha !== confirmarSenha) {
                alert("As senhas nao coincidem! Verifique e tente novamente.");
                return;
            }

            try {
                const response = await fetch("/api/redefinir-senha", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        novaSenha,
                        confirmarSenha
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    alert(data.mensagem || "Erro ao redefinir senha.");
                    return;
                }

                sessionStorage.removeItem("emailRecuperacaoSenha");
                alert(data.mensagem || "Senha alterada com sucesso!");
                window.location.href = "login.html";
            } catch (error) {
                console.error(error);
                alert("Erro ao conectar com o servidor");
            }
        });
    }
});
