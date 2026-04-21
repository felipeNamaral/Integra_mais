document.addEventListener('DOMContentLoaded', () => {
    const btnFavoritar = document.getElementById('btn-favoritar');
    const btnEnviar = document.getElementById('btn-enviar');

    // Lógica para Favoritar
    btnFavoritar.addEventListener('click', () => {
        const icon = btnFavoritar.querySelector('.material-symbols-outlined');
        
        if (btnFavoritar.classList.contains('active')) {
            btnFavoritar.classList.remove('active');
            btnFavoritar.style.backgroundColor = "white";
            btnFavoritar.innerHTML = '<span class="material-symbols-outlined">star</span> Favoritar vaga';
            alert("Vaga removida dos favoritos.");
        } else {
            btnFavoritar.classList.add('active');
            btnFavoritar.style.backgroundColor = "#fffbeb";
            btnFavoritar.innerHTML = '<span class="material-symbols-outlined" style="font-variation-settings: \'FILL\' 1">star</span> Vaga Favoritada';
            alert("Vaga salva nos favoritos!");
        }
    });

    // Lógica para Marcar como Enviado
    btnEnviar.addEventListener('click', () => {
        btnEnviar.disabled = true;
        btnEnviar.style.backgroundColor = "#717684";
        btnEnviar.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Enviado';
        alert("Candidatura registrada com sucesso!");
    });
});