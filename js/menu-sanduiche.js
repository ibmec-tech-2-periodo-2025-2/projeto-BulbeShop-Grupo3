const btnSanduiche = document.getElementsByClassName("menu-btn")[0];
const menu = document.getElementById("sidebar-menu");

btnSanduiche.addEventListener("click",() => {
    menu.classList.toggle("active");
})