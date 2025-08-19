// Este script maneja la lógica de inicio de sesión.
// La función asíncrona para poder usar 'await' y esperar la respuesta del servidor.
const onLogInSubmit = async (event) => {
    // Previene el comportamiento por defecto del formulario (recargar la página).
    event.preventDefault();
    
    // Obtiene una referencia al elemento donde se mostrarán los mensajes.
    const messageElement = document.getElementById('message');

    // Deshabilita el botón de envío para evitar múltiples clics.
    const submitButton = event.target.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Iniciando...';
    }

    // Crea un objeto a partir de los datos del formulario.
    const formData = new FormData(event.target);
    const user = Object.fromEntries(formData.entries());

    try {
        // Realiza la petición POST al endpoint de login.
        const response = await fetch('http://localhost:8080/api/v1/repairman/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            // Si el login es exitoso (código HTTP 200).
            const result = await response.json();
            console.log('¡Login exitoso!', result);

            //Guarda el email del usuario en localStorage solo si el login es exitoso.
            // Esto asegura que el email esté disponible en la siguiente página.
            localStorage.setItem("email", user.email);
            
            // Muestra un mensaje de éxito y redirige al usuario.
            messageElement.textContent = '¡Login exitoso! Redirigiendo...';
            messageElement.style.color = 'green';
            
            setTimeout(() => {
                // Redirige a la página de perfil.
                window.location.href = "/src/pages/profile.html";
            }, 1000); // 1 segundo de espera
        } else {
            // Si hay un error en la autenticación.
            const errorText = await response.text();
            console.error('Error de login:', errorText);

            messageElement.textContent = errorText;
            messageElement.style.color = 'red';
        }
    } catch (error) {
        // Captura errores de red o del servidor.
        console.error('Error en la conexión:', error);

        messageElement.textContent = 'No se pudo conectar al servidor. Inténtalo de nuevo.';
        messageElement.style.color = 'red';
    } finally {
        // Restablece el botón de envío, sin importar el resultado.
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Iniciar Sesión';
        }
    }
};