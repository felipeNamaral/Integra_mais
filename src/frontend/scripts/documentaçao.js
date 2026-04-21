document.addEventListener("DOMContentLoaded", () => {
    // 1. Lógica dos Acordeões
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            const arrow = header.querySelector(".arrow");

            // Fecha outros acordeões se quiser o efeito "um por vez"
            document.querySelectorAll(".accordion-content").forEach(item => {
                if(item !== content) item.classList.remove("open");
            });

            // Abre o atual
            content.classList.toggle("open");
        });
    });

    // 2. Simular nome do usuário (ou puxar do localStorage)
    const nomeUser = document.getElementById("nomeUser");
    const nomeSalvo = localStorage.getItem("nomeUsuario") || "Pedro Guimarães";
    if(nomeUser) nomeUser.innerText = nomeSalvo;
});