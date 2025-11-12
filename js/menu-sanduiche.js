const btnSanduiche = document.getElementsByClassName("menu-btn")[0];
const menu = document.getElementById("sidebar-menu");
const btnFecharMenu = document.getElementById("close-btn");

btnSanduiche.addEventListener("click",() => {
    menu.classList.toggle("active");
})

btnFecharMenu.addEventListener("click",() => {
    menu.classList.remove("active");
})