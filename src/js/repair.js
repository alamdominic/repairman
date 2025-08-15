async function fetchAndFormatCustomers() {
    const url = 'http://localhost:8080/api/v1/repairman/customers';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }
        const customers = await response.json();
        return customers.map(customer => ({
            id: customer.customerID,
            fullName: `${customer.firstname} ${customer.lastname}`
        }));
    } catch (error) {
        console.error('No se pudieron obtener los clientes:', error);
        return [];
    }
}
async function populateCustomerSelect() {
    const selectElement = document.getElementById('customerSelect');

    // Muestra un estado de carga mientras se obtienen los datos
    selectElement.innerHTML = `<option selected>Cargando clientes...</option>`;

    const customers = await fetchAndFormatCustomers();

    // Limpia el select antes de añadir las nuevas opciones
    selectElement.innerHTML = '';

    // Si no hay clientes, añade una opción por defecto
    if (customers.length === 0) {
        selectElement.innerHTML = `<option value="">No hay clientes disponibles</option>`;
        selectElement.disabled = true; // Deshabilita el select si no hay opciones
    } else {
        // Añade una opción de "placeholder"
        selectElement.innerHTML = `<option value="">Selecciona un cliente</option>`;
        selectElement.disabled = false; // Asegura que esté habilitado

        // Itera sobre los clientes y añade cada uno como una opción
        customers.forEach(customer => {
            const option = document.createElement('option');
            option.value = customer.id;
            option.textContent = customer.fullName;
            selectElement.appendChild(option);
        });
    }
}

document.getElementById('repair-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Previene envío del formulario

    const form = e.target;

    // Obtener el ID del cliente del select
    const customerSelectElement = form.querySelector('#customerSelect');
    const customerID = customerSelectElement.value;

    // Obtener los datos del formulario para la API de reparación
    const repairData = {
        brand: form.querySelector('#brand').value,
        model: form.querySelector('#model').value,
        issue: form.querySelector('#issue').value,
        description: form.querySelector('#description').value,
        imageUrl: form.querySelector('#imageurl').value,
        cellphoneStatus: form.querySelector('#cellphoneStatus').value,
        price: form.querySelector('#price').value,
        customer: {
            customerID: customerID
        }
    };

    // Obtener los datos del formulario para Formspree
    const formspreeData = new FormData(form);

    // Hacer ambas peticiones en paralelo
    try {
        const [apiResponse, formspreeResponse] = await Promise.all([
            // Petición a tu API de Spring
            fetch('http://localhost:8080/api/v1/repairman/add-repair', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(repairData)
            }),

            // Petición a Formspree (usando el endpoint de AJAX)
            fetch('https://formspree.io/f/meokbegp', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json' // Esto es crucial
                },
                body: formspreeData
            })
        ]);

        if (apiResponse.ok && formspreeResponse.ok) {
            alert('Reparación agendada y formulario de contacto enviado con éxito!');
            form.reset();
        } else {
            throw new Error('Hubo un problema al procesar una de las peticiones.');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error. Por favor, intenta de nuevo más tarde.');
    }
});

document.addEventListener('DOMContentLoaded', populateCustomerSelect);
