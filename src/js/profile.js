// Variable global para almacenar el ID del cliente.
// Se inicializa en null y se llenará más tarde.
let customerId = localStorage.getItem("email");

// Escucha el evento de carga del DOM para ejecutar la lógica de la página.
document.addEventListener("DOMContentLoaded", function() {
    // Llama a la función que obtiene la información del cliente.
    getCustomerInfo();

    // Asigna los escuchadores de eventos a los formularios de perfil y contraseña.
    document.getElementById("profile-form").addEventListener("submit", onProfileSubmit);
    document.getElementById("password-form").addEventListener("submit", onPasswordSubmit);
});

// --- Funciones del formulario de perfil ---
function llenarFormulario(customer) {
    document.getElementById("nombre").value = customer.firstname || '';
    document.getElementById("apellido").value = customer.lastname || '';
    document.getElementById("usuario").value = customer.username || '';
    document.getElementById("email").value = customer.email || '';
    document.getElementById("telefono").value = customer.phonenumber || '';

    //document.getElementById("password").value = customer.password || '';

}

function onProfileSubmit(event) {
    event.preventDefault();
    
    // Verifica si el ID del cliente ya fue cargado.
    if (!customerId) {
        console.error("Error: ID de cliente no encontrado. No se puede actualizar.");
        alert("Los datos aún se están cargando. Por favor, espera y vuelve a intentarlo.");
        return;
    }

    const formData = new FormData(event.target);
    const updatedData = Object.fromEntries(formData);
    
    const customer = {
        firstname: updatedData.nombre,
        lastname: updatedData.apellido,
        username: updatedData.usuario,
        email: updatedData.email,
        phonenumber: updatedData.telefono
        //password:updatedData.password
    };

    const url = `http://localhost:8080/api/v1/repairman/update-customer/${customerId}`;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Perfil actualizado:', data);
        alert('Perfil actualizado correctamente.');
    })
    .catch(error => {
        console.error('Error al actualizar el perfil:', error);
        alert('Hubo un error al guardar los cambios.');
    });
}

// --- Funciones del formulario 
function onPasswordSubmit(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById("current-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (newPassword !== confirmPassword) {
        alert("Las contraseñas no coinciden. Por favor, revísalas.");
        return;
    }
    
    // Verifica si el ID del cliente ya fue cargado.
    if (!customerId) {
        console.error("Error: ID de cliente no encontrado.");
        alert("Ocurrió un error. Por favor, recarga la página.");
        return;
    }

    const url = `http://localhost:8080/api/v1/repairman/customer/update-password/${customerId}`;
    
    const passwordData = {
        password: newPassword
    };

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al cambiar la contraseña: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Contraseña actualizada con éxito:', data);
        alert('¡Contraseña cambiada exitosamente!');
        document.getElementById("current-password").value = '';
        document.getElementById("new-password").value = '';
        document.getElementById("confirm-password").value = '';
    })
    .catch(error => {
        console.error('Hubo un problema con la operación fetch:', error);
        alert('Hubo un error al cambiar la contraseña.');
    });
}

// --- Función para cargar datos del cliente ---
function getCustomerInfo() {
    //Obtiene el email de localStorage cada vez que la función es llamada.
    const customerEmail = localStorage.getItem("email");
    console.log("Email localsoptrage"+ customerEmail);
    if (!customerEmail) {
        console.error("No se encontró ningún email en el localStorage.");
        alert("No se pudo cargar tu perfil. Asegúrate de haber iniciado sesión.");
        return;
    }

    const url = `http://localhost:8080/api/v1/repairman/customer/email/${customerEmail}`;
    
    const submitProfileButton = document.getElementById("profile-submit-btn");
    const submitPasswordButton = document.getElementById("password-submit-btn");

    if (submitProfileButton) {
        submitProfileButton.disabled = true;
    }
    if (submitPasswordButton) {
        submitPasswordButton.disabled = true;
    }

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(customer => {
        // Asigna el ID del cliente a la variable global.
        customerId = customer.customerID; 
        console.log("Valor en getCustomerInfo " + customerId);
        llenarFormulario(customer);
        
        if (submitProfileButton) {
            submitProfileButton.disabled = false;
        }
        if (submitPasswordButton) {
            submitPasswordButton.disabled = false;
        }

        const userinfo = document.getElementById("user-information");
        const fechaDeAPI = customer.createdat;
        const fecha = new Date(fechaDeAPI);
        const formato = {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        };
        const fechaFormateada = fecha.toLocaleDateString('es-MX', formato);

        const h1 = document.createElement("h1");
        h1.classList.add('fw-semibold');
        h1.textContent = customer.firstname + ' ' + customer.lastname;

        const p = document.createElement('p');
        p.classList.add('text-muted', 'fw-medium');
        p.innerHTML = `@${customer.username} | ${customer.email} | ${customer.phonenumber} <br> Miembro desde: ${fechaFormateada}`;
            
        userinfo.appendChild(h1);
        userinfo.appendChild(p);
    })
    .catch(error => {
        console.error("Hubo un problema con la operación fetch:", error);
        alert("No se pudieron cargar los datos del perfil.");
        if (submitProfileButton) {
            submitProfileButton.disabled = false;
        }
        if (submitPasswordButton) {
            submitPasswordButton.disabled = false;
        }
    });
}