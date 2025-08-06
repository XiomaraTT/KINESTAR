let carrito = [];

  function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    alert(`${nombre} agregado al carrito`);
  }

  function irAPagar() {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    // Guarda en localStorage para leer en la página de pago
    localStorage.setItem('carritoKINESTAR', JSON.stringify(carrito));
    window.location.href = 'Pago.html'; // página de pago
  }