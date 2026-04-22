document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const nome = document.querySelector('input[placeholder="Seu nome completo"]').value;
            const email = document.querySelector('input[placeholder="Seu @email.com"]').value;
            const dataNasc = document.querySelector('input[placeholder="dd/mm/aaaa"]').value;
            
           
            const senhas = document.querySelectorAll('input[type="password"]');
            const senha = senhas[0].value;
            const confirmaSenha = senhas[1].value;

            if (senha !== confirmaSenha) {
                alert("As senhas não coincidem!");
                return;
            }

            console.log("Sucesso:", { nome, email, dataNasc });
            alert("Cadastro realizado!");
        });
    }
});