  const btnSubir = document.getElementById("btn-subir");
const btnBajar = document.getElementById("btn-bajar");

// Mostrar/ocultar botón subir según scroll
window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  if (scrollTop > 100) {
    btnSubir.style.display = "block";
  } else {
    btnSubir.style.display = "none";
  }
});

// Subir al inicio
btnSubir.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Bajar al final
btnBajar.addEventListener("click", function () {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});

// Ocultar botón subir al cargar
btnSubir.style.display = "none";
