document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formRecuperar");
    const mensagem = document.getElementById("mensagemVerifiqueEmail");
    const errorMessage = document.getElementById("error-message");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.querySelector('input[type="email"]').value;
            errorMessage.textContent = "";

            try {
                const response = await fetch("/api/recuperar-senha", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();

                if (data.sucesso === false) {
                    errorMessage.textContent = data.mensagem || "Email nao encontrado.";
                    return;
                }

                if (!response.ok) {
                    errorMessage.textContent = data.mensagem || "Erro ao recuperar senha.";
                    return;
                }

                form.hidden = true;
                if (mensagem) {
                    mensagem.hidden = false;
                } else {
                    mostrarPopup(data.mensagem || "Verifique seu email.", "success");
                }
            } catch (error) {
                console.error(error);
                mostrarPopup("Erro ao conectar com o servidor", "error");
            }
        });
    }
});
