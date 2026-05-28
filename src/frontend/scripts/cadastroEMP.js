document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();


            const erroSenha = document.getElementById("error-message2");
            const erroEmail = document.getElementById("error-message");

            const nomeEmpresa = document.getElementById("nomeEmpresa").value;
            const cnpj = document.getElementById("cnpj").value;
            const cnpjLimpo = cnpj.replace(/\D/g, "");
            const emailCorporativo = document.getElementById("emailCorporativo").value;
            const endereco = document.getElementById("endereco").value;
            const senha = document.getElementById("senha").value;
            const confirmarSenha = document.getElementById("confirmarSenha").value;


            erroSenha.textContent = "";
            erroEmail.textContent = "";


            // validação
            if (senha !== confirmarSenha) {
                erroSenha.textContent = "As senhas não coincidem!";
                return;
            }

            if (cnpjLimpo.length !== 14) {
                erroSenha.textContent = "CNPJ inválido!";
                return;
            }

            try {
                const response = await fetch("/api/cadastro/empresa", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nomeEmpresa,
                        cnpj,
                        emailCorporativo,
                        endereco,
                        senha,
                        confirmarSenha
                    })
                });

                const data = await response.json();
                if (!response.ok) {
                    if (data.mensagem === "Email já cadastrado.") {
                        erroEmail.textContent = data.mensagem;
                    } else {
                        mostrarPopup(data.mensagem || "Erro ao cadastrar empresa", "error");
                    }
                    return;
                }


                window.location.href = "login.html";

            } catch (error) {
                console.error(error);
                mostrarPopup("Erro ao conectar com o servidor", "error");
            }
        });
    }
});
