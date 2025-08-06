let seleccionados = 0;
const LIMITE_ASIENTOS = 5;

// Datos de precios por película (en soles peruanos)
const preciosPorPelicula = {
  'annabelle': 15,
  'elmalviveaqui': 15,
  'escape': 12,
  'flow': 10,
  'laniñademisojos': 12,
  'minecraft': 18,
  'okja': 12,
  'slenderman': 15,
  'thechosen': 10,
  'terremoto': 15,
  'sonic': 18,
  'yomeddine': 10
};

// Asientos ocupados por película (simulación)
const asientosOcupados = {
  'annabelle': ['A3', 'A4', 'B5', 'C1', 'C2', 'D7', 'E8'],
  'elmalviveaqui': ['A1', 'A2', 'B3', 'C5', 'D4', 'D5'],
  'escape': ['A5', 'B2', 'B3', 'C8', 'D1'],
  'flow': ['A4', 'A5', 'B1', 'C3', 'C4', 'E2'],
  'laniñademisojos': ['A2', 'B4', 'B5', 'C1', 'D6', 'D7'],
  'minecraft': ['A1', 'A3', 'B2', 'C5', 'C6', 'D4', 'E1', 'E2'],
  'okja': ['A5', 'B1', 'B2', 'C3', 'D5'],
  'slenderman': ['A2', 'A4', 'B3', 'C1', 'C2', 'D8', 'E5'],
  'thechosen': ['A1', 'B5', 'C2', 'C3', 'D1', 'D2'],
  'terremoto': ['A3', 'B1', 'B4', 'C5', 'D2', 'E3'],
  'sonic': ['A2', 'A5', 'B3', 'C1', 'C4', 'D5', 'E1'],
  'yomeddine': ['A4', 'B2', 'B5', 'C3', 'D1', 'D4']
};

// Abre el modal y carga la matriz de asientos
function abrirVentana(pelicula) {
  document.getElementById("ventana").classList.add("show");

  // Cambiar título con nombre de película
  const titulo = document.querySelector("#ventana h2");
  titulo.textContent = pelicula
    ? `Selecciona tus asientos para ${pelicula.toUpperCase()}`
    : "Selecciona tus asientos";

  // Resetear contador
  seleccionados = 0;
  actualizarResumen(pelicula);

  crearMatrizAsientos(pelicula);
}

// Cierra el modal
function cerrarVentana() {
  document.getElementById("ventana").classList.remove("show");
  seleccionados = 0;
  document.getElementById("cantidad").textContent = "0";
  
  // Ocultar sección de pago si estaba visible
  const pagoQR = document.getElementById("pagoQR");
  if (pagoQR) {
    pagoQR.style.display = "none";
  }
}

// Evento para el botón Cancelar
document.getElementById("cancelar").addEventListener("click", cerrarVentana);

// Procesar compra y mostrar QR
document.getElementById("continueBtn").addEventListener("click", function () {
  if (seleccionados === 0) {
    alert("Por favor, selecciona al menos un asiento.");
    return;
  }

  if (seleccionados > LIMITE_ASIENTOS) {
    alert(`No puedes seleccionar más de ${LIMITE_ASIENTOS} asientos.`);
    return;
  }

  const asientosSeleccionados = Array.from(document.querySelectorAll(".seat.selected"))
    .map(seat => seat.dataset.seatId)
    .join(", ");
  
  const tituloCompleto = document.querySelector("#ventana h2").textContent;
  const pelicula = tituloCompleto.replace("Selecciona tus asientos para ", "").toLowerCase();
  
  const precio = preciosPorPelicula[pelicula] || 12;
  const total = seleccionados * precio;

  // Confirmar compra
  const confirmar = confirm(
    `Resumen de compra:\n` +
    `Película: ${pelicula.toUpperCase()}\n` +
    `Asientos: ${asientosSeleccionados}\n` +
    `Cantidad: ${seleccionados} entrada(s)\n` +
    `Precio unitario: S/ ${precio}\n` +
    `Total: S/ ${total}\n\n` +
    `¿Confirmar compra?`
  );

  if (confirmar) {
    // Cerrar modal de selección
    cerrarVentana();
    
    // Mostrar QR de pago
    mostrarPagoQR(pelicula, asientosSeleccionados, total);
  }
});

// Muestra la sección de pago con QR
function mostrarPagoQR(pelicula, asientos, total) {
  const pagoQR = document.getElementById("pagoQR");
  if (pagoQR) {
    // Actualizar información del pago
    pagoQR.innerHTML = `
      <div style="background: white; padding: 30px; border-radius: 15px; text-align: center; max-width: 400px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
        <h3 style="color: #333; margin-bottom: 20px;">💳 Finalizar Pago</h3>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #e74c3c;">
          <p style="margin: 5px 0;"><strong>Película:</strong> ${pelicula.toUpperCase()}</p>
          <p style="margin: 5px 0;"><strong>Asientos:</strong> ${asientos}</p>
          <p style="margin: 5px 0;"><strong>Total:</strong> <span style="color: #e74c3c; font-size: 1.3em; font-weight: bold;">S/ ${total}</span></p>
        </div>
        <p style="margin-bottom: 15px; color: #555;">Escanea el código QR para realizar el pago:</p>
        <div style="background: #f0f0f0; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
          <img src="img/qr.jpg" alt="Código QR para pagar" style="width: 180px; height: 180px; border: 2px solid #ddd; border-radius: 10px;" />
        </div>
        <p style="color: #666; font-size: 0.9em; margin-bottom: 20px;">
          📧 Después del pago, recibirás tus entradas por correo electrónico.
        </p>
        <div style="display: flex; gap: 10px; justify-content: center;">
          <button onclick="cerrarPago()" style="background: #95a5a6; color: white; border: none; padding: 12px 20px; border-radius: 5px; cursor: pointer; font-size: 14px;">
            Cancelar
          </button>
          <button onclick="confirmarPago()" style="background: #27ae60; color: white; border: none; padding: 12px 20px; border-radius: 5px; cursor: pointer; font-size: 14px; font-weight: bold;">
            ✓ Pago Realizado
          </button>
        </div>
      </div>
    `;
    pagoQR.style.display = "flex";
    pagoQR.style.position = "fixed";
    pagoQR.style.top = "0";
    pagoQR.style.left = "0";
    pagoQR.style.width = "100%";
    pagoQR.style.height = "100%";
    pagoQR.style.backgroundColor = "rgba(0,0,0,0.8)";
    pagoQR.style.justifyContent = "center";
    pagoQR.style.alignItems = "center";
    pagoQR.style.zIndex = "1001";
  }
}

// Confirma el pago y muestra mensaje de éxito
function confirmarPago() {
  alert("✅ ¡Pago realizado con éxito!\n\n📧 Recibirás tus entradas por correo electrónico en los próximos minutos.\n\n¡Disfruta tu película en KINESTAR!");
  cerrarPago();
}

// Cierra la ventana de pago
function cerrarPago() {
  const pagoQR = document.getElementById("pagoQR");
  if (pagoQR) {
    pagoQR.style.display = "none";
  }
}

// Actualiza el resumen de selección
function actualizarResumen(pelicula) {
  const precio = preciosPorPelicula[pelicula] || 12;
  const total = seleccionados * precio;
  
  document.getElementById("cantidad").innerHTML = `
    <span style="font-size: 16px; font-weight: bold;">${seleccionados}</span> asiento(s) seleccionado(s)
    <br><span style="color: #e74c3c; font-weight: bold; font-size: 18px;">Total: S/ ${total}</span>
    <br><small style="color: #666;">Precio por entrada: S/ ${precio}</small>
  `;
}

// Películas y su configuración
const filasPorPelicula = {
  'annabelle': ['A', 'B', 'C', 'D', 'E'],
  'elmalviveaqui': ['A', 'B', 'C', 'D', 'E'],
  'escape': ['A', 'B', 'C', 'D', 'E'],
  'flow': ['A', 'B', 'C', 'D', 'E'],
  'laniñademisojos': ['A', 'B', 'C', 'D', 'E'],
  'minecraft': ['A', 'B', 'C', 'D', 'E'],
  'okja': ['A', 'B', 'C', 'D', 'E'],
  'slenderman': ['A', 'B', 'C', 'D', 'E'],
  'thechosen': ['A', 'B', 'C', 'D', 'E'],
  'terremoto': ['A', 'B', 'C', 'D', 'E'],
  'sonic': ['A', 'B', 'C', 'D', 'E'],
  'yomeddine': ['A', 'B', 'C', 'D', 'E']
};

const columnasPorPelicula = {
  'annabelle': 10,
  'elmalviveaqui': 10,
  'escape': 10,
  'flow': 10,
  'laniñademisojos': 10,
  'minecraft': 10,
  'okja': 10,
  'slenderman': 10,
  'thechosen': 10,
  'terremoto': 10,
  'sonic': 10,
  'yomeddine': 10
};

// Crea los asientos dinámicamente
function crearMatrizAsientos(pelicula) {
  const zona = document.getElementById("asientos");
  zona.innerHTML = "";

  const filas = filasPorPelicula[pelicula] || ['A', 'B', 'C', 'D', 'E'];
  const columnas = columnasPorPelicula[pelicula] || 10;
  const ocupados = asientosOcupados[pelicula] || [];

  // Agregar pantalla del cine
  const pantalla = document.createElement("div");
  pantalla.innerHTML = "🎬 PANTALLA";
  pantalla.style.cssText = `
    text-align: center; 
    padding: 15px; 
    margin-bottom: 25px; 
    background: linear-gradient(45deg, #2c3e50, #4a6741); 
    color: white; 
    border-radius: 10px; 
    font-weight: bold;
    font-size: 16px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  `;
  zona.appendChild(pantalla);

  filas.forEach(fila => {
    const filaDiv = document.createElement("div");
    filaDiv.classList.add("row");
    filaDiv.style.cssText = "display: flex; align-items: center; margin-bottom: 10px; justify-content: center;";

    // Etiqueta de fila (A, B, C...)
    const label = document.createElement("div");
    label.classList.add("row-label");
    label.textContent = fila;
    label.style.cssText = "width: 35px; text-align: center; font-weight: bold; color: #2c3e50; font-size: 16px;";
    filaDiv.appendChild(label);

    for (let i = 1; i <= columnas; i++) {
      const asiento = document.createElement("div");
      asiento.classList.add("seat");
      asiento.dataset.seatId = `${fila}${i}`;
      
      // Verificar si el asiento está ocupado
      if (ocupados.includes(`${fila}${i}`)) {
        asiento.classList.add("occupied");
      }

      // Estilos del asiento
      asiento.style.cssText = `
        width: 28px; 
        height: 28px; 
        margin: 3px; 
        border-radius: 6px; 
        cursor: pointer; 
        border: 2px solid #ddd;
        transition: all 0.3s ease;
        position: relative;
        font-size: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      `;

      // Aplicar colores según estado
      if (asiento.classList.contains("occupied")) {
        asiento.style.backgroundColor = "#e74c3c";
        asiento.style.borderColor = "#c0392b";
        asiento.style.cursor = "not-allowed";
        asiento.style.color = "white";
        asiento.textContent = "✕";
        asiento.title = `Asiento ${fila}${i} - Ocupado`;
      } else {
        asiento.style.backgroundColor = "#27ae60";
        asiento.style.borderColor = "#229954";
        asiento.style.color = "white";
        asiento.textContent = i;
        asiento.title = `Asiento ${fila}${i} - Disponible (Clic para seleccionar)`;
      }

      // Efecto hover para asientos disponibles
      if (!asiento.classList.contains("occupied")) {
        asiento.addEventListener("mouseenter", function() {
          if (!this.classList.contains("selected")) {
            this.style.transform = "scale(1.1)";
            this.style.backgroundColor = "#2ecc71";
          }
        });

        asiento.addEventListener("mouseleave", function() {
          if (!this.classList.contains("selected")) {
            this.style.transform = "scale(1)";
            this.style.backgroundColor = "#27ae60";
          }
        });
      }

      asiento.onclick = () => {
        if (asiento.classList.contains("occupied")) return;

        const yaSeleccionado = asiento.classList.contains("selected");
        
        // Verificar límite antes de seleccionar
        if (!yaSeleccionado && seleccionados >= LIMITE_ASIENTOS) {
          alert(`⚠️ No puedes seleccionar más de ${LIMITE_ASIENTOS} asientos por compra.`);
          return;
        }

        asiento.classList.toggle("selected");
        
        if (asiento.classList.contains("selected")) {
          asiento.style.backgroundColor = "#f39c12";
          asiento.style.borderColor = "#e67e22";
          asiento.style.transform = "scale(1.1)";
          asiento.textContent = "✓";
          seleccionados++;
        } else {
          asiento.style.backgroundColor = "#27ae60";
          asiento.style.borderColor = "#229954";
          asiento.style.transform = "scale(1)";
          asiento.textContent = i;
          seleccionados--;
        }

        actualizarResumen(pelicula);
      };

      filaDiv.appendChild(asiento);

      // Agregar pasillo en el medio
      if (i === Math.ceil(columnas / 2)) {
        const pasillo = document.createElement("div");
        pasillo.classList.add("aisle");
        pasillo.style.cssText = "width: 25px; height: 28px; margin: 3px;";
        filaDiv.appendChild(pasillo);
      }
    }

    zona.appendChild(filaDiv);
  });

  // Agregar leyenda
  const leyenda = document.createElement("div");
  leyenda.innerHTML = `
    <div style="display: flex; justify-content: center; gap: 25px; margin-top: 25px; padding: 15px; background: #f8f9fa; border-radius: 10px; font-size: 13px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="width: 18px; height: 18px; background: #27ae60; border-radius: 4px; color: white; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold;">1</div>
        <span><strong>Disponible</strong></span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="width: 18px; height: 18px; background: #f39c12; border-radius: 4px; color: white; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold;">✓</div>
        <span><strong>Seleccionado</strong></span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="width: 18px; height: 18px; background: #e74c3c; border-radius: 4px; color: white; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold;">✕</div>
        <span><strong>Ocupado</strong></span>
      </div>
    </div>
  `;
  zona.appendChild(leyenda);
}







window.onload = function () {
  const btn = document.getElementById("btnHorario");
  const horarios = document.getElementById("horarios");

  btn.addEventListener("click", function () {
    if (horarios.style.display === "none") {
      horarios.style.display = "block";
      horarios.scrollIntoView({ behavior: "smooth" });
      btn.textContent = "✖️ Ocultar Horarios";
    } else {
      horarios.style.display = "none";
      btn.textContent = "🕒 Ver Horarios";
    }
  });
};






