
const onSubmit = (event) => {
    // Prevención del evento por defecto
    // event.preventDefault();
    // Obtención del formulario
    const form = document.getElementById("register-form");

    // Creación de un objeto JS a partir de los campos del formulario
    const formData = new FormData(event.target);
    const newUser = Object.fromEntries(formData.entries())

    // Se convierte el objeto JS en un string para poder almacenarlo en el localStorage 
    const stringUser = JSON.stringify(newUser);
    // Se cuentan los usuarios, ademas del nuevo a agregar para definir su key
    const countUsers = localStorage.length + 1;
    let userKey = "User" + countUsers;

    // Se almacena en el localStorage el nuevo valor
    localStorage.setItem(userKey, stringUser);
}
