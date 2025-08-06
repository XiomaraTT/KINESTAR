let currentMembership = { type: '', price: 0 };

// Abre el modal de pago de membresías
function abrirModalPagoMembresia(membershipType, price) {
    const modal = document.getElementById("membershipPaymentModal");
    const title = document.getElementById("selectedMembershipTitle");
    const typeDisplay = document.getElementById("membershipTypeDisplay");
    const priceDisplay = document.getElementById("membershipPriceDisplay");
    const qrPaymentDiv = document.getElementById("qrMembershipPayment");
    const cardForm = document.getElementById("cardPaymentForm");
    const voucherDiv = document.getElementById("membershipVoucher");

    // Reiniciar estado
    qrPaymentDiv.style.display = 'none';
    cardForm.style.display = 'none';
    voucherDiv.style.display = 'none';
    document.querySelector('input[name="membershipPaymentMethod"][value="yape"]').checked = true; // Seleccionar Yape por defecto

    currentMembership = { type: membershipType, price: price };

    title.textContent = membershipType;
    typeDisplay.textContent = membershipType;
    priceDisplay.textContent = `S/.${price.toFixed(2)}`;

    modal.style.display = 'block';

    // Mostrar el QR de Yape por defecto al abrir el modal
    cargarMetodoPagoMembresia();
    
    // Asignar evento change a los radios de método de pago
    document.querySelectorAll('input[name="membershipPaymentMethod"]').forEach(radio => {
        radio.removeEventListener('change', cargarMetodoPagoMembresia); // Evitar duplicados
        radio.addEventListener('change', cargarMetodoPagoMembresia);
    });
}

// Cierra el modal de pago de membresías
function cerrarModalPagoMembresia() {
    document.getElementById("membershipPaymentModal").style.display = 'none';
}

// Carga el método de pago (QR o formulario de tarjeta)
function cargarMetodoPagoMembresia() {
    const metodo = document.querySelector('input[name="membershipPaymentMethod"]:checked').value;
    const qrPaymentDiv = document.getElementById('qrMembershipPayment');
    const cardForm = document.getElementById('cardPaymentForm');

    qrPaymentDiv.innerHTML = ''; // Limpiar cualquier QR anterior
    qrPaymentDiv.style.display = 'none';
    cardForm.style.display = 'none';

    if (metodo === 'yape' || metodo === 'plin') {
        const qrImgSrc = metodo === 'yape' ? 'img/YapeSnacks.jpg' : 'img/qr.jpg'; // Revisa que estas rutas sean correctas
        qrPaymentDiv.innerHTML = `
            <p>Escanea este código QR con tu app de <strong>${metodo.toUpperCase()}</strong> para pagar:</p>
            <img src="${qrImgSrc}" alt="QR ${metodo}" style="width: 180px; height: 180px; border: 2px solid #ddd; border-radius: 10px;" />
            <p style="font-size: 0.9em; color: #555;">Monto a pagar: S/.${currentMembership.price.toFixed(2)}</p>
        `;
        qrPaymentDiv.style.display = 'block';
    } else if (metodo === 'tarjeta') {
        cardForm.style.display = 'block';
    }
}


// Procesa el pago de la membresía
function procesarPagoMembresia() {
    const metodo = document.querySelector('input[name="membershipPaymentMethod"]:checked').value;
    const totalPagar = currentMembership.price;
    const membershipType = currentMembership.type;

    const qrPaymentDiv = document.getElementById('qrMembershipPayment');
    const cardForm = document.getElementById('cardPaymentForm');
    const voucherDiv = document.getElementById('membershipVoucher');
    const voucherDetails = document.getElementById('membershipVoucherDetails');

    let isCardFormValid = true;
    if (metodo === 'tarjeta') {
        const cardNumber = document.getElementById('cardNumber').value;
        const cardName = document.getElementById('cardName').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        // Validación básica de campos de tarjeta
        if (!cardNumber || !cardName || !expiryDate || !cvv) {
            alert('Por favor, completa todos los datos de la tarjeta.');
            isCardFormValid = false;
        }
    }

    if (!isCardFormValid && metodo === 'tarjeta') {
        return; // Detener si el formulario de tarjeta no es válido
    }

    // Simular tiempo de procesamiento para Yape/Plin
    const delay = (metodo === 'yape' || metodo === 'plin') ? 2000 : 0; 

    setTimeout(() => {
        const confirmar = confirm(`¿Confirmas el pago de S/.${totalPagar.toFixed(2)} para la membresía "${membershipType}" con ${metodo.charAt(0).toUpperCase() + metodo.slice(1)}?`);

        if (!confirmar) {
            alert("Pago cancelado.");
            qrPaymentDiv.style.display = 'none'; // Ocultar QR si se cancela
            cardForm.style.display = 'none'; // Ocultar formulario si se cancela
            return;
        }

        // Ocultar QR y formulario de tarjeta
        qrPaymentDiv.style.display = 'none';
        cardForm.style.display = 'none';
        
        // Mostrar voucher
        voucherDetails.innerHTML = `
            <strong>Membresía:</strong> ${membershipType}<br>
            <strong>Método de Pago:</strong> ${metodo.charAt(0).toUpperCase() + metodo.slice(1)}<br>
            <strong>Total Pagado:</strong> S/.${totalPagar.toFixed(2)}
            <p>¡Bienvenido a KINESTAR! Disfruta de tus beneficios.</p>
        `;
        voucherDiv.style.display = 'block';

        alert(`✅ ¡Pago de membresía "${membershipType}" realizado con éxito!\n\n¡Bienvenido a KINESTAR!`);
        
        // Opcional: Redirigir o recargar después de un tiempo para reflejar la membresía
        // setTimeout(() => { window.location.href = 'Inicio.html'; }, 3000);

    }, delay);
}

//
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