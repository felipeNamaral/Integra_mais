document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();


            const erroSenha = document.getElementById("error-message2");
            const erroEmail = document.getElementById("error-message");

            const nomeEmpresa = document.getElementById("nomeEmpresa").value;
            const cnpj = document.getElementById("cnpj").value;
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

            if (cnpj.length < 14) {
                alert("CNPJ inválido.");
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/api/cadastro/empresa", {
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
                        alert(data.mensagem || "Erro ao cadastrar empresa");
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