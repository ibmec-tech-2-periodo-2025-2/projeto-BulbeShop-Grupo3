document.addEventListener('DOMContentLoaded', () => {
    const profileBtn = document.getElementById('profileBtn'); // Isso é a DIV que contém a foto
    const profileDropdown = document.getElementById('profileDropdown');

    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
            profileBtn.classList.toggle('active'); // Adiciona/remove a classe 'active' ao container da foto também
        });

        document.addEventListener('click', (e) => {
            if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('active');
                profileBtn.classList.remove('active'); // Remove a classe 'active' do container da foto
            }
        });
    }
});