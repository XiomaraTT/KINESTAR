 const btnInferior = document.getElementById("btn-inferior");
  const menuInferior = document.getElementById("menu-inferior");

  btnInferior.addEventListener("click", function () {
    menuInferior.classList.toggle("show");
  });

  let index = 0;
  const imagenes = document.getElementById('imagenes');
  const total = imagenes.children.length;

  function mostrarImagen(i) {
    index = (i + total) % total; // hace que vuelva al principio o final
    imagenes.style.transform = `translateX(-${index * 100}%)`;
  }

  function moverDerecha() {
    mostrarImagen(index + 1);
  }

  function moverIzquierda() {
    mostrarImagen(index - 1);
  }

  // Movimiento automático cada 4 segundos
  setInterval(() => {
    moverDerecha();
  }, 4000);