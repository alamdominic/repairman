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

// Función para llenar el select con los datos de los clientes
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

document.getElementById('add-Product').addEventListener('submit', async e => {
    // 1. Previene el envío por defecto del formulario
    e.preventDefault();

    const form = e.target;

    // 2. Obtiene los valores de los campos del formulario
    const brand = form.querySelector('#brand').value;
    const model = form.querySelector('#model').value;
    const productDescription = form.querySelector('#productDescription').value;
    const productCost = form.querySelector('#productCost').value;
    const status = form.querySelector('#status').value;
    const imageUrl = form.querySelector('#imageurl').value;
    
    // Obtiene el ID del cliente del select
    const customerSelect = form.querySelector('#customerSelect');
    const customerID = customerSelect.value;

    // Verifica que se haya seleccionado un cliente
    if (!customerID) {
        alert('Por favor, selecciona un cliente.');
        return;
    }

    // Crea el objeto JSON API
    const saleData = {
        brand: brand, 
        model: model,
        description: productDescription,
        price: productCost,
        cellphoneStatus: status,
        imageUrl: imageUrl,
        customer: {
            customerID: customerID
        }
    };

    // 5. URL del endpoint
    const url = 'http://localhost:8080/api/v1/repairman/add-sale';

    try {
        // 6. Realiza la petición POST con fetch
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(saleData)
        });

        if (response.ok) {
            // Si la respuesta es exitosa (código 200-299)
            const result = await response.json();
            alert('¡Venta registrada exitosamente!');
            console.log('Venta registrada:', result);
            form.reset(); // Opcional: limpia el formulario
        } else {
            // Maneja respuestas de error del servidor
            const errorText = await response.text();
            alert(`Error al registrar la venta: ${errorText}`);
            console.error('Error en la petición:', response.status, errorText);
        }

    } catch (error) {
        // Maneja errores de la red o del fetch
        console.error('Error de conexión o de la petición:', error);
        alert('Ocurrió un error. Por favor, revisa la conexión o intenta de nuevo más tarde.');
    }
});

// Llama a la función para llenar el select cuando la página se cargue
document.addEventListener('DOMContentLoaded', populateCustomerSelect);

