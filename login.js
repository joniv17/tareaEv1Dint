// login.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulario");
    const nombre = document.getElementById("nombre");
    const password = document.getElementById("password");
    const errorNombre = document.getElementById("error-nombre");
    const errorPassword = document.getElementById("error-password");
    const limpiarBtn = document.getElementById("limpiar");

    // Validaciones del formulario al enviar
    form.addEventListener("submit", (e) => {
        let valid = true;

        // Validación del nombre
        if (!nombre.value.trim()) {
            errorNombre.textContent = "Nombre obligatorio.";
            valid = false;
        } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nombre.value)) {
            errorNombre.textContent = "Nombre inválido.";
            valid = false;
        } else if (nombre.value.length > 20) {
            errorNombre.textContent = "El nombre no puede tener más de 20 caracteres.";
            valid = false;
        } else {
            errorNombre.textContent = "";
        }

        // Validación de la contraseña
        if (!password.value.trim()) {
            errorPassword.textContent = "La contraseña es obligatoria.";
            valid = false;
        } else if (!/^[a-zA-Z0-9·$%&/()]{8,16}$/.test(password.value)) {
            errorPassword.textContent = "La contraseña debe tener entre 8 y 16 caracteres y solo puede contener letras, números y los caracteres ·$%&/().";
            valid = false;
        } else {
            errorPassword.textContent = "";
        }

        // Si los campos son válidos, redirigir al usuario
        if (valid) {
            // Prevenir el envío del formulario
            e.preventDefault();

            // Redirigir a la página main.html después de un breve retraso
            setTimeout(() => {
                window.location.href = "main.html"; // Redirigir a la página principal
            }, 300); // 300ms de retraso
        } else {
            // Si hay errores, evitar el envío del formulario
            e.preventDefault();
        }
    });

    // Botón de limpiar datos
    limpiarBtn.addEventListener("click", () => {
        nombre.value = "";
        password.value = "";
        errorNombre.textContent = "";
        errorPassword.textContent = "";
    });
});