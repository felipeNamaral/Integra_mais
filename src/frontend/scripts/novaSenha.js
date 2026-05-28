document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formNovaSenha");
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token") || sessionStorage.getItem("tokenRecuperacaoSenha");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const inputs = form.querySelectorAll('input[type="password"]');
            const novaSenha = inputs[0].value;
            const confirmarSenha = inputs[1].value;

            if (!token) {
                mostrarPopup("Solicite a recuperacao de senha novamente.", "warning");
                window.location.href = "recuperar.html";
                return;
            }

            if (novaSenha !== confirmarSenha) {
                mostrarPopup("As senhas nao coincidem! Verifique e tente novamente.", "warning");
                return;
            }

            try {
                const response = await fetch("/api/redefinir-senha", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        token,
                        novaSenha,
                        confirmarSenha
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    mostrarPopup(data.mensagem || "Erro ao redefinir senha.", "error");
                    return;
                }

                sessionStorage.removeItem("tokenRecuperacaoSenha");
                window.location.href = "login.html";
            } catch (error) {
                console.error(error);
                mostrarPopup("Erro ao conectar com o servidor", "error");
            }
        });
    }
});
