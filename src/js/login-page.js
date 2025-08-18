// Es como mandar un mensaje de WhatsApp y esperar respuesta. No te quedas parado esperando, pero cuando llega la respuesta, la lees.
// Declaramos que no cambia y dice (async) esta función puede "esperar" respuestas del servidor, 
// Recibe como parámetro un evento - El formulario del HTML
const onLogInSubmit = async (event) => {
  // Es como decirle al navegador: "¡Espera! No hagas lo que normalmente haces, yo me encargo"
  event.preventDefault();

  // Toma automáticamente todos los campos de tu formulario HTML (email y password)
  // Convierte en un objeto que podemos usar, los captura automáticamente usando sus name -> <input name="email" ... />
  const formData = new FormData(event.target);

  // Convierte los datos del formulario en un objeto JavaScript que podemos usar fácilmente - Objeto JSON.
  /* 
  HTML form
    <input name="email" value="juan@email.com" />
    <input name="password" value="123456" />
  Objeto de JS
    user = {
      email: "juan@email.com",
      password: "123456"
    }
  */
  const user = Object.fromEntries(formData.entries());

  try {
    // Inicia una llamada a tu servidor (el backend) usando la dirección (URL) que le pasas.
    const response = await fetch('http://localhost:8080/api/v1/repairman/login', {
      // La anotación @RequestBody en el backend le dice a Spring que espera datos que vengan en el cuerpo (body) de la solicitud HTTP. 
      // Y lo que espera recibir ahí es un objeto en formato JSON, con los mismos campos que el CustomerModel (email y password).
      method: 'POST',
      // Indica al servidor que los datos enviados en el body de la solicitud son JSON, 
      // para que sepa cómo leer y procesar correctamente la información.
      headers: {
        'Content-Type': 'application/json'
      },
      // Función JS que convierte un objeto en cadena de texto con formato JSON.
      body: JSON.stringify(user)
    });

    if (response.ok) {
      // Si el servidor responde con éxito (HTTP 200)
      const result = await response.json();
      console.log('¡Login exitoso!', result);
      // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito en la página
    } else {
      // Si el servidor responde con error (por ejemplo, 401)
      const errorText = await response.text();
      console.error('Error de login:', errorText);
      // Aquí puedes mostrar el error específico en la página al usuario
      // Por ejemplo: document.getElementById('error-message').textContent = errorText;
    }
  } catch (error) {
    // Manejar errores de red (por ejemplo, el servidor no está disponible)
    console.error('Error en la conexión:', error);
    // Mostrar un mensaje de error genérico en la página
  }
};
