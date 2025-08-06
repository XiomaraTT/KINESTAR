window.onload = function () {
  const resumen = document.getElementById("resumen");
  const totalDiv = document.getElementById("total");
  const carrito = JSON.parse(localStorage.getItem("carritoKINESTAR")) || [];

  if (carrito.length === 0) {
    resumen.innerHTML = "<p>No hay snacks en el carrito.</p>";
    return;
  }

  let total = 0;
  let html = "<ul>";
  carrito.forEach((item) => {
    html += `<li>${item.nombre}: S/ ${item.precio.toFixed(2)}</li>`;
    total += item.precio;
  });
  html += "</ul>";

  resumen.innerHTML = html;
  totalDiv.innerText = `Total: S/ ${total.toFixed(2)}`;

  // Mostrar u ocultar formulario de tarjeta según el método seleccionado
  const metodoSelect = document.getElementById("metodoPago");
  const formTarjeta = document.getElementById("formTarjeta");

  metodoSelect.addEventListener("change", function () {
    if (this.value === "tarjeta") {
      formTarjeta.style.display = "block";
    } else {
      formTarjeta.style.display = "none";
    }
  });
};

function procesarPago() {
  const metodo = document.getElementById('metodoPago').value;
  const voucher = document.getElementById('voucher');
  const detalleVoucher = document.getElementById('detalleVoucher');
  const qr = document.getElementById('qrPago');
  const formTarjeta = document.getElementById('formTarjeta'); 
  const carrito = JSON.parse(localStorage.getItem('carritoKINESTAR')) || [];
  const total = carrito.reduce((sum, item) => sum + item.precio, 0);

  // Mostrar QR si es Yape o Plin
  if (metodo === 'yape' || metodo === 'plin') {
    const qrImg = metodo === 'yape' ? 'img/YapeSnacks.jpg' : 'img/qr.jpg';
    qr.style.display = 'block';
    qr.innerHTML = `
      <p>Escanea el código QR con tu app de <strong>${metodo.toUpperCase()}</strong>:</p>
      <img src="${qrImg}" alt="QR ${metodo}" width="200" style="border:2px solid #014034; border-radius:10px;">
    `;
    formTarjeta.style.display = 'none'; // Oculta el formulario si no es tarjeta
  } else if (metodo === 'tarjeta') {
    qr.style.display = 'none';
    qr.innerHTML = '';
    formTarjeta.style.display = 'block'; // Muestra formulario si es tarjeta
  } else {
    qr.style.display = 'none';
    formTarjeta.style.display = 'none';
  }

  setTimeout(() => {
    const confirmar = confirm(`¿Confirmas el pago de S/ ${total.toFixed(2)} con ${metodo}?`);

    if (!confirmar) {
      alert("Pago cancelado.");
      qr.style.display = 'none';
      return;
    }

    // Ocultar formulario de tarjeta después del pago
    formTarjeta.style.display = 'none';

    // Ocultar QR también 
    qr.style.display = 'none';

    // Mostrar voucher
    voucher.style.display = 'block';
    let detalles = carrito.map(item => `${item.nombre}: S/ ${item.precio.toFixed(2)}`).join('<br>');
    detalleVoucher.innerHTML = `
      Método: ${metodo.charAt(0).toUpperCase() + metodo.slice(1)}<br>
      ${detalles}<br>
      <strong>Total pagado: S/ ${total.toFixed(2)}</strong>
    `;

    // Botón volver a inicio
    if (!document.getElementById('volverInicio')) {
      const volverBtn = document.createElement('button');
      volverBtn.id = 'volverInicio';
      volverBtn.textContent = 'Volver al inicio';
      volverBtn.onclick = () => window.location.href = 'Inicio.html';
      volverBtn.style.marginTop = '20px';
      voucher.appendChild(volverBtn);
    }

    // Limpiar carrito
    localStorage.removeItem('carritoKINESTAR');
  }, metodo === 'yape' || metodo === 'plin' ? 3000 : 0);
}


