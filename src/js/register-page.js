// Toggle para mostrar/ocultar contraseña (este código está correcto)
document.querySelectorAll('.password-toggle-btn').forEach(button => {
    button.addEventListener('click', () => {
        const input = button.parentElement.querySelector('input');
        const eyeImg = button.querySelector('img.eye-icon');

        if (input.type === 'password') {
            input.type = 'text';
            eyeImg.src = '../img/eye_password_hide.svg';
            eyeImg.alt = 'Ocultar contraseña';
        } else {
            input.type = 'password';
            eyeImg.src = '../img/eye_password_show.svg';
            eyeImg.alt = 'Mostrar contraseña';
        }
    });
});

// AHORA TODO SE MANEJA EN UN SOLO EVENTO DE SUBMIT
document.getElementById('register-form').addEventListener('submit', e => {
    // 1. Evita el envío por defecto para manejar la lógica con JS
    e.preventDefault();

    const form = e.target;

    // 2. Realiza las validaciones
    if (!form.checkValidity()) {
        alert('Por favor, complete los campos correctamente.');
        return;
    }

    const password = form.querySelector('#password').value;
    

    // 3. Si las validaciones pasan, obtén los datos y haz la llamada a la API
    const user = {
        username: form.querySelector('#nickname').value,
        firstname: form.querySelector('#name').value,
        lastname: form.querySelector('#lastname').value,
        email: form.querySelector('#email').value,
        password: password,
        phonenumber: form.querySelector('#phone').value
    };

    const url = `http://localhost:8080/api/v1/repairman/create-customer`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        // Manejo de la respuesta del servidor
        if (response.ok) { // Verifica si el estado de la respuesta es 200-299
            return response.json();
        } else if (response.status === 409) { // Maneja el conflicto (usuario o email ya existe)
            throw new Error('El usuario o email ya están registrados.');
        } else {
            throw new Error('Ocurrió un error en el servidor. Intente de nuevo.');
        }
    })
    .then(data => {
        alert('¡Registro exitoso!'); // Muestra el mensaje de éxito
        console.log(data); // Muestra los datos del usuario creado
        form.reset(); // Opcional: limpia el formulario
    })
    .catch(error => {
        alert(`Error: ${error.message}`); // Muestra el mensaje de error al usuario
        console.error('Error al registrar:', error);
    });
});

// REMUEVE ESTE CÓDIGO
// const registrar = document.getElementById('submit');
// registrar.addEventListener('click', () => { ... })