// customers-table.js

// Configuración de la API
const API_BASE_URL = 'http://localhost:8080/api/v1/repairman';

// Variable global para almacenar los clientes
let customers = [];

// Función principal para cargar los clientes
async function loadCustomers() {
    try {
        showLoading();

        const response = await fetch(`${API_BASE_URL}/customers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        customers = data;

        displayCustomers(data);
        updateRecordCount(data.length);

    } catch (error) {
        console.error('Error cargando clientes:', error);
        showError(error.message);
    }
}

// Función para mostrar los clientes en la tabla
function displayCustomers(customersData) {
    const tbody = document.getElementById('customersTableBody');

    if (!customersData || customersData.length === 0) {
        showEmptyState();
        return;
    }

    showTable();
    tbody.innerHTML = '';

    customersData.forEach(customer => {
        const row = document.createElement('tr');
        // Combina el nombre y el apellido para el nombre completo
        const fullName = `${customer.firstname || ''} ${customer.lastname || ''}`.trim() || 'N/A';

        row.innerHTML = `
            <td>${customer.customerID || 'N/A'}</td> 
            <td>${fullName}</td>
            <td>${customer.email || 'N/A'}</td>`;
        tbody.appendChild(row);
    });
}

// Función para mostrar el estado de carga
function showLoading() {
    document.getElementById('loadingState').classList.remove('d-none');
    document.getElementById('errorState').classList.add('d-none');
    document.getElementById('tableContainer').classList.add('d-none');
}

// Función para mostrar error
function showError(errorMessage = 'Error desconocido') {
    document.getElementById('loadingState').classList.add('d-none');
    document.getElementById('errorState').classList.remove('d-none');
    document.getElementById('tableContainer').classList.add('d-none');

    // Opcional: mostrar el mensaje de error específico
    const errorState = document.getElementById('errorState');
    const errorText = errorState.querySelector('p');
    if (errorText) {
        errorText.textContent = `Error: ${errorMessage}`;
    }
}

// Función para mostrar la tabla
function showTable() {
    document.getElementById('loadingState').classList.add('d-none');
    document.getElementById('errorState').classList.add('d-none');
    document.getElementById('tableContainer').classList.remove('d-none');
}

// Función para mostrar estado vacío
function showEmptyState() {
    showTable();
    const tbody = document.getElementById('customersTableBody');
    tbody.innerHTML = `
        <tr>
            <td colspan="5" style="text-align: center; padding: 40px; color: #6c757d; font-style: italic;">
                No hay clientes registrados en el sistema
            </td>
        </tr>
    `;
}

// Función para actualizar el contador de registros
function updateRecordCount(count) {
    const recordCount = document.getElementById('recordCount');
    if (recordCount) {
        const text = count === 1 ? '1 registro encontrado' : `${count} registros encontrados`;
        recordCount.textContent = text;
    }
}

// Función para refrescar los datos
function refreshData() {
    const refreshIcon = document.getElementById('refreshIcon');

    // Animar el ícono de refresh
    refreshIcon.classList.add('spinning');

    // Cargar datos
    loadCustomers().finally(() => {
        // Remover animación después de 1 segundo
        setTimeout(() => {
            refreshIcon.classList.remove('spinning');
        }, 1000);
    });
}

// Función para obtener token de autenticación (si es necesario)
function getAuthToken() {
    // Implementar según tu sistema de autenticación
    // return localStorage.getItem('authToken');
    return null;
}

// Función para manejar errores de red
function handleNetworkError() {
    console.log('Error de red detectado');
    showError('Error de conexión. Verifique su conexión a internet.');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    console.log('Página cargada, iniciando carga de clientes...');
    loadCustomers();
});

// Detectar cambios en la conexión de red
window.addEventListener('online', function () {
    console.log('Conexión restaurada');
    loadCustomers();
});

window.addEventListener('offline', function () {
    console.log('Conexión perdida');
    handleNetworkError();
});

// Función para exportar a CSV (funcionalidad extra)
function exportToCSV() {
    if (!customers || customers.length === 0) {
        alert('No hay datos para exportar');
        return;
    }

    const headers = ['ID', 'Nombre', 'Usuario', 'Email', 'Teléfono'];
    const csvContent = [
        headers.join(','),
        ...customers.map(customer => [
            customer.id || '',
            `"${customer.nombre || customer.name || ''}"`,
            customer.username || '',
            customer.email || '',
            customer.telefono || customer.phone || ''
        ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `clientes_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Funciones auxiliares para debugging
function debugCustomers() {
    console.log('Clientes cargados:', customers);
    console.log('Total de clientes:', customers.length);
}

// Exponer funciones globales que pueden ser llamadas desde HTML
window.loadCustomers = loadCustomers;
window.refreshData = refreshData;
window.exportToCSV = exportToCSV;
window.debugCustomers = debugCustomers;