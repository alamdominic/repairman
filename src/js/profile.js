function onProfileSubmit(event) {
    event.preventDefault();
    
    // Aquí puedes agregar la lógica para guardar los cambios
    alert('Cambios guardados exitosamente');
    
    // Opcional: Aquí podrías enviar los datos a tu servidor
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);
    console.log('Datos del usuario:', userData);
}


function getCustomerInfo(){
    const customerEmail = localStorage.getItem("email", email);
    
    const url = 'http://localhost:8080/api/v1/repairman/customer/email/${customerEmail}';

    fetch(url)
    .then(response => {
        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            // Lanza un error si la respuesta no es exitosa
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }
        // Parsea la respuesta como JSON
        return response.json();
    })
    .then(data => {
        // Maneja los datos de la respuesta 
        console.log("Datos del cliente:", data);
    })
    .catch(error => {
        // maneja cualquier error de la petición
        console.error("Hubo un problema con la operación fetch:", error);
    });

}

getCustomerInfo();