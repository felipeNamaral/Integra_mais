document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formRecuperar");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.querySelector('input[type="email"]').value;

            try {
                const response = await fetch("/api/recuperar-senha", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();

                if (!response.ok) {
                    alert(data.mensagem || "Erro ao recuperar senha.");
                    return;
                }

                sessionStorage.setItem("emailRecuperacaoSenha", email);
                alert(data.mensagem || "Informe a nova senha.");
                window.location.href = "novaSenha.html";
            } catch (error) {
                console.error(error);
                alert("Erro ao conectar com o servidor");
            }
        });
    }
});
