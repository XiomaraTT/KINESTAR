function abrirModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'block';
  }
}

function cerrarModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'none';
  }
}

function aceptarModal(id) {
  alert("Gracias por aceptar.");
  cerrarModal(id);
}

function rechazarModal(id) {
  alert("Has rechazado los términos. Serás redirigido.");
  cerrarModal(id);
  window.location.href = "https://www.google.com"; //te manda a otra pagina
}
