document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos comunes (mensajes de alerta)
    const alertMessage = document.getElementById('alert-message');

    // Función para mostrar mensajes de alerta
    function showAlert(message, type = 'error') {
        if (alertMessage) { // Asegurarse de que el elemento exista
            alertMessage.textContent = message;
            alertMessage.className = `alert ${type}`;
            alertMessage.style.display = 'block';
            setTimeout(() => {
                alertMessage.style.display = 'none';
            }, 3000); // Ocultar mensaje después de 3 segundos
        }
    }

    // --- Lógica para el formulario de Registro (en Registrate.html) ---
    const registerForm = document.getElementById('registerUserForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita el envío tradicional del formulario

            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmar-password').value;

            // Validaciones básicas
            if (password !== confirmPassword) {
                showAlert('Las contraseñas no coinciden.', 'error');
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Verificar si el correo ya está registrado
            if (users.some(user => user.email === email)) {
                showAlert('Este correo electrónico ya está registrado. Intenta iniciar sesión.', 'error');
                return;
            }

            // Añadir nuevo usuario
            users.push({ nombre, email, password });
            localStorage.setItem('users', JSON.stringify(users));

            showAlert('¡Registro exitoso! Ahora puedes iniciar sesión.', 'success');
            registerForm.reset(); // Limpiar formulario

            // Redirigir a la página de login después de un registro exitoso
            setTimeout(() => {
                window.location.href = 'Login.html';
            }, 2000);
        });
    }

    // --- Lógica para el formulario de Inicio de Sesión (en Login.html) ---
    const loginForm = document.getElementById('loginUserForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita el envío tradicional del formulario

            const email = document.getElementById('email').value; // ID 'email' en Login.html
            const password = document.getElementById('password').value; // ID 'password' en Login.html

            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Buscar usuario por email y contraseña
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Simulación de sesión iniciada
                localStorage.setItem('currentUser', JSON.stringify(user));
                showAlert(`¡Bienvenido de nuevo, ${user.nombre}! Sesión iniciada.`, 'success');
                loginForm.reset();

                // Redirigir a una página de "perfil" o "inicio" simulada
                setTimeout(() => {
                    window.location.href = 'Inicio.html'; // Redirige a la página de inicio
                }, 2000);

            } else {
                showAlert('Correo electrónico o contraseña incorrectos.', 'error');
            }
        });
    }
});