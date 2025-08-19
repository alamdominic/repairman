// // profile.js - Manejo simple del perfil del usuario

// const API_BASE_URL = 'http://localhost:8080/api/v1/repairman'; // Ajusta según tu configuración
// let currentCustomer = null;

// // Función para obtener el customer del sessionStorage
// function getCurrentCustomer() {
//     const customerData = sessionStorage.getItem('currentCustomer');
//     return customerData ? JSON.parse(customerData) : null;
// }

// // Función para cargar los datos del perfil
// async function loadProfile() {
//     try {
//         currentCustomer = getCurrentCustomer();
        
//         if (!currentCustomer || !currentCustomer.customerID) {
//             alert('No hay usuario logueado');
//             window.location.href = 'login-page.html';
//             return;
//         }

//         // Obtener datos actualizados del servidor
//         const response = await fetch(`${API_BASE_URL}/customer/${currentCustomer.customerID}`);
        
//         if (response.ok) {
//             const customerData = await response.json();
//             currentCustomer = customerData;
//             displayProfileData(customerData);
//         } else {
//             alert('Error al cargar el perfil');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('Error de conexión al servidor');
//     }
// }

// // Función para mostrar los datos en el formulario
// function displayProfileData(customer) {
//     // Campos editables
//     document.getElementById('username').value = customer.username || '';
//     document.getElementById('firstname').value = customer.firstname || '';
//     document.getElementById('lastname').value = customer.lastname || '';
//     document.getElementById('email').value = customer.email || '';
//     document.getElementById('phonenumber').value = customer.phonenumber || '';
    
//     // Información de solo lectura
//     if (document.getElementById('customerID')) {
//         document.getElementById('customerID').textContent = customer.customerID || 'N/A';
//     }
//     if (document.getElementById('createdat')) {
//         const date = customer.createdat ? new Date(customer.createdat).toLocaleDateString('es-MX') : 'N/A';
//         document.getElementById('createdat').textContent = date;
//     }
// }

// // Función para actualizar el perfil
// async function updateProfile(event) {
//     event.preventDefault();
    
//     if (!currentCustomer || !currentCustomer.customerID) {
//         alert('Error: No hay usuario logueado');
//         return;
//     }

//     // Obtener datos del formulario
//     const formData = new FormData(event.target);
//     const updatedCustomer = {
//         username: formData.get('username'),
//         firstname: formData.get('firstname'),
//         lastname: formData.get('lastname'),
//         email: formData.get('email'),
//         phonenumber: formData.get('phonenumber')
//     };

//     // Validación básica
//     if (!updatedCustomer.username || !updatedCustomer.firstname || 
//         !updatedCustomer.lastname || !updatedCustomer.email || 
//         !updatedCustomer.phonenumber) {
//         alert('Todos los campos son obligatorios');
//         return;
//     }

//     try {
//         const response = await fetch(`${API_BASE_URL}/update-customer/${currentCustomer.customerID}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedCustomer)
//         });

//         if (response.ok) {
//             const updatedData = await response.json();
//             currentCustomer = updatedData;
//             // Actualizar sessionStorage
//             sessionStorage.setItem('currentCustomer', JSON.stringify(updatedData));
//             alert('Perfil actualizado exitosamente');
//             // Recargar los datos en el formulario
//             displayProfileData(updatedData);
//         } else if (response.status === 409) {
//             alert('El username o email ya están en uso');
//         } else {
//             alert('Error al actualizar el perfil');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('Error de conexión al servidor');
//     }
// }

// // Inicialización cuando se carga la página
// document.addEventListener('DOMContentLoaded', function() {
//     // Cargar los datos del perfil
//     loadProfile();
    
//     // Agregar evento al formulario de perfil
//     const profileForm = document.getElementById('profile-form');
//     if (profileForm) {
//         profileForm.addEventListener('submit', updateProfile);
//     }
// });