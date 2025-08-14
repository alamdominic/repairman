// Toggle para mostrar/ocultar contraseña en los campos password y confirm-password
document.querySelectorAll('.password-toggle-btn').forEach(button => {
    button.addEventListener('click', () => {
        const input = button.parentElement.querySelector('input');
        const eyeImg = button.querySelector('img.eye-icon');

        if (input.type === 'password') {
            input.type = 'text';
            eyeImg.src = 'src/img/eye_password_hide.svg'; // ojo abierto
            eyeImg.alt = 'Ocultar contraseña';
        } else {
            input.type = 'password';
            eyeImg.src = 'src/img/eye_password_show.svg'; // ojo cerrado
            eyeImg.alt = 'Mostrar contraseña';
        }
    });
});

// Validación al enviar formulario
document.getElementById('register-form').addEventListener('submit', e => {
    e.preventDefault();
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

    const formData = new FormData(form);
    const newEntry = Object.fromEntries(formData.entries());
    const url = `http://localhost:8080/api/v1/repairman/create-customer`;

    const user = {
        username: newEntry.username,
        firstname: newEntry.name,
        lastname: newEntry.lastname,
        password: newEntry.password,
        email: newEntry.email,
        phonenumber: newEntry.phone   
    }

     fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
        // body: user
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log('Guardado', data);
        })
        .catch(error => {
            console.error(error);
        })
});
