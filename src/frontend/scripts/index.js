document.addEventListener("DOMContentLoaded", () => {
    console.log("Integra+ Home Initialized");

    // Lógica para o botão de idioma
    const btnIdioma = document.querySelector(".trocar-idioma-home");
    if (btnIdioma) {
        btnIdioma.addEventListener("click", () => {
            console.log("Troca de idioma solicitada.");
            // Futuramente: lógica de i18n
        });
    }
});