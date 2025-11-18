document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-btn');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const closeButton = document.getElementById('close-btn');

    if (!menuButton || !sidebarMenu || !closeButton) {
        return;
    }

    menuButton.addEventListener('click', () => {
        sidebarMenu.classList.toggle('active');
    });

    closeButton.addEventListener('click', () => {
        sidebarMenu.classList.remove('active');
    });
});
