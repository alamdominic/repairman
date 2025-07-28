function validarEmail(){
    //Validamos el correo tomando la etiqueda id del formulario
    const emailUser = document.getElementById("email").value;
    const regex = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (regex.test(emailUser)){
        alert("Correo valido ✅ ");
    } else {
        alert("Correo inválido ❌");
    }
}
const inputEmail = document.getElementById("email");
inputEmail.addEventListener("change", validarEmail);

//Contraseña Segura: Regla: mínimo 8 caracteres, 1 mayúscula, 1 número, 1 carácter especial:
//^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
function validarPassword(){
    const passwordUser = document.getElementById("password").value;
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

    if (regex.test(passwordUser)){
        alert("Contraseña valida ✅ ");
    } else {
        alert("Contraseña inválida ❌");
    }
}
//911GT3rs.

const inputPassword = document.getElementById("password");
inputPassword.addEventListener("change", validarPassword);