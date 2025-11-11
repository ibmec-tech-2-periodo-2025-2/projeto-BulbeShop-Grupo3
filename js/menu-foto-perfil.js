document.addEventListener('DOMContentLoaded', () => {
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');

    // Função para alternar o menu
    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', (e) => {
            // Impede que o clique na foto feche o menu imediatamente
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });

        // Fecha o menu ao clicar fora dele
        document.addEventListener('click', (e) => {
            if (!profileBtn.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }
});