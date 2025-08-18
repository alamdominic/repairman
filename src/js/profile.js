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
    const url = ''
}