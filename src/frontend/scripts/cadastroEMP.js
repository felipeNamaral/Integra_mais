document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", (event) => {
           
            event.preventDefault();

         
            const nomeEmpresa = document.querySelector('input[placeholder="Nome da empresa"]').value;
            const cnpj = document.querySelector('input[placeholder="00.000.000/0000-00"]').value;
            const email = document.querySelector('input[type="email"]').value;
            const endereco = document.querySelector('input[placeholder="Rua, Cidade, Estado"]').value;
            
            
            const inputsSenha = document.querySelectorAll('input[type="password"]');
            const senha = inputsSenha[0].value;
            const confirmaSenha = inputsSenha[1].value;

         
            if (senha !== confirmaSenha) {
                alert("As senhas não coincidem. Por favor, verifique.");
                return; 
            }

            if (cnpj.length < 14) {
                alert("Por favor, insira um CNPJ válido.");
                return;
            }

            
            const dadosEmpresa = {
                razaoSocial: nomeEmpresa,
                documento: cnpj,
                contato: email,
                localizacao: endereco,
                senha: senha
            };

     
            console.log("Dados da Empresa Prontos:", dadosEmpresa);
            
            alert("Cadastro de Empresa enviado com sucesso!");
            
          
        });
    }
});