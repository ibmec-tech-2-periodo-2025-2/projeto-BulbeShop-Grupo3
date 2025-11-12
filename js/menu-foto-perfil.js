document.addEventListener('DOMContentLoaded', () => {
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    const replicaBtn = document.getElementById('replicaBtn'); // Seleciona a foto réplica

    if (profileBtn && profileDropdown) {
        
        // 1. Abrir/Fechar no botão principal
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // 2. Fechar ao clicar na RÉPLICA (interno)
        if (replicaBtn) {
            replicaBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeMenu(); // Apenas fecha
            });
        }

        // 3. Fechar ao clicar fora
        document.addEventListener('click', (e) => {
            if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
                closeMenu();
            }
        });

        // Funções auxiliares para não repetir código
        function toggleMenu() {
            profileDropdown.classList.toggle('active');
            profileBtn.classList.toggle('active');
        }

        function closeMenu() {
            profileDropdown.classList.remove('active');
            profileBtn.classList.remove('active');
        }
    }
});