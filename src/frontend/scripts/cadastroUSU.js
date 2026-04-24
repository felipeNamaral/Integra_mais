document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    const txt = document.getElementById('error-message2');
    const txtEmail = document.getElementById("error-message");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
            const dataNascimento = document.getElementById("dataNascimento").value;
            const senha = document.getElementById("senha").value;
            const confirmarSenha = document.getElementById("confirmarSenha").value;

            
            txt.textContent = "";
            txtEmail.textContent = "";

            if (senha !== confirmarSenha) {
                txt.textContent = "As senhas não coincidem!";
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/api/cadastro/usuario", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nome,
                        email,
                        dataNascimento,
                        senha,
                        confirmarSenha
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    if (data.mensagem === "Email já cadastrado.") {
                        txtEmail.textContent = data.mensagem;
                    } else {
                        alert(data.mensagem || "Erro ao cadastrar");
                    }
                    return;
                }

                
                window.location.href = "login.html";

            } catch (error) {
                console.error(error);
                alert("Erro ao conectar com o servidor");
            }
        });
    }
});