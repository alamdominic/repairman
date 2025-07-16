//Función de validación de los tipos de entrada del formulario
function validarDatosForm(event){
    // Prevenir el envío del formulario si hay errores
    event.preventDefault();
    
    // Obtener los valores de los campos del formulario
    let nombre = document.getElementById("nameInput").value.trim();
    let correo = document.getElementById("exampleInputEmail1").value.trim();
    let telefono = document.getElementById("exampleInputphone").value.trim();
    let mensaje = document.getElementById("exampleFormControlTextarea1").value.trim();
    let checkbox = document.getElementById("exampleCheck1").checked;
    
    let errores = [];
    
    // Validación del nombre
    if(nombre.length === 0){
        errores.push("El nombre es obligatorio");
    } else if(nombre.length < 2){
        errores.push("El nombre debe tener al menos 2 caracteres");
    } else if(!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)){
        errores.push("El nombre solo puede contener letras y espacios");
    }
    
    // Validación del correo
    if(correo.length === 0){
        errores.push("El correo electrónico es obligatorio");
    } else {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regexCorreo.test(correo)){
            errores.push("Ingrese un correo electrónico válido");
        }
    }
    
    // Validación del teléfono
    if(telefono.length === 0){
        errores.push("El teléfono es obligatorio");
    } else if(!/^\d{7,15}$/.test(telefono.replace(/[\s\-\(\)]/g, ''))){
        errores.push("El teléfono debe tener entre 7 y 15 dígitos");
    }
    
    // Validación del mensaje
    if(mensaje.length === 0){
        errores.push("El mensaje es obligatorio");
    } else if(mensaje.length < 10){
        errores.push("El mensaje debe tener al menos 10 caracteres");
    }
    
    // Validación del checkbox
    if(!checkbox){
        errores.push("Debe aceptar los términos y condiciones");
    }
    
    // Mostrar errores si existen
    if(errores.length > 0){
        alert("Por favor, corrija los siguientes errores:\n\n" + errores.join("\n"));
        return false;
    }
    
    // Si no hay errores, el formulario se puede enviar
    alert("Formulario enviado correctamente");
    return true;
}