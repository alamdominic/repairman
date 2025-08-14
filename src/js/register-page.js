// Toggle para mostrar/ocultar contraseña en los campos password y confirm-password
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

// Validación al enviar formulario
document.getElementById('register-form').addEventListener('submit', e => {
    const form = e.target;

    // Validación HTML5 estándar
    if (!form.checkValidity()) {
        e.preventDefault();
        alert('Por favor, complete los campos correctamente.');
        return;
    }

    // Validación que password y confirm-password coinciden
    const password = form.querySelector('#password').value;
    const confirmPassword = form.querySelector('#confirm-password').value;

    if (password !== confirmPassword) {
        e.preventDefault();
        alert('Las contraseñas no coinciden. Por favor, corríjalas.');
        form.querySelector('#confirm-password').focus();
        return;
    }
});
