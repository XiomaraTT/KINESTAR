document.addEventListener("DOMContentLoaded", function () {
  const btnHamburguesa = document.getElementById("btn-hamburguesa-superior");
  const menuSuperior = document.getElementById("menu-superior");

  btnHamburguesa.addEventListener("click", function () {
    menuSuperior.classList.toggle("show-menu");
  });
});
