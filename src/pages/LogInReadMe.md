# Guía de Conexión Frontend-Backend: Login de Usuario

---

## 1. El Objetivo

El objetivo de este proceso es conectar el formulario de login de tu **frontend** (HTML y JavaScript) con el endpoint de login de tu **backend** (Spring Boot), enviando los datos del usuario de forma segura y manejando las respuestas del servidor.

---
## 2. Lo que ya hicimos: Paso a paso en el código

### **Paso 1: Capturar los datos del formulario (Frontend)**

Este primer paso se encarga de tomar la información que el usuario ingresa en los campos del formulario (`email` y `password`) y prepararla para ser enviada.

-   **`const onLogInSubmit = async (event) => { ... }`**:
    -   **`async`**: Hace que la función pueda "esperar" respuestas del servidor (`await`) sin congelar la página. Es como mandar un mensaje de WhatsApp y esperar la respuesta, pero sin quedarte parado.
    -   `event`: Representa el evento que ocurrió, en este caso, el envío del formulario.
-   **`event.preventDefault();`**:
    -   Es como decirle al navegador: "¡Espera! No hagas lo que normalmente haces, yo me encargo". Evita que la página se recargue, lo cual es el comportamiento por defecto de los formularios.
-   **`const formData = new FormData(event.target);`**:
    -   Toma automáticamente todos los campos de tu formulario HTML (`<input name="email" ... />`, etc.) y los guarda en un objeto especial llamado `formData`.
-   **`const user = Object.fromEntries(formData.entries());`**:
    -   Convierte los datos del `formData` en un objeto de JavaScript (`user`), que es un formato mucho más fácil de manejar. Por ejemplo, convierte los datos del formulario en un objeto como este: `{ email: "juan@email.com", password: "123456" }`.

### **Paso 2: Enviar la solicitud HTTP con `fetch`**

Una vez que tenemos los datos listos, este paso se encarga de enviarlos al servidor de tu backend.

-   **`try { ... } catch (error) { ... }`**:
    -   Es un bloque de seguridad que intenta ejecutar el código (`try`). Si ocurre un error de red (por ejemplo, el servidor está apagado o no hay internet), el código salta al bloque `catch` para manejarlo.
-   **`const response = await fetch('http://localhost:8080/api/v1/repairman/login', { ... });`**:
    -   **`fetch(...)`**: Inicia la llamada a tu servidor (`http://localhost:8080...`), que es el endpoint para el login. La palabra clave `await` le dice a JavaScript que "espere" a que el servidor responda antes de continuar con la ejecución.
-   **`method: 'POST'`**:
    -   Le dice al servidor que estamos **enviando** datos. Esto se corresponde con el `@PostMapping` que tienes en tu controlador de Spring Boot.
-   **`headers: { 'Content-Type': 'application/json' }`**:
    -   Indica al servidor que los datos que enviamos en el `body` son de tipo **JSON**. Es como una etiqueta que le dice al servidor cómo debe interpretar el paquete de datos que le llega.
-   **`body: JSON.stringify(user)`**:
    -   La función `JSON.stringify(user)` toma tu objeto JavaScript (`user`) y lo convierte en una **cadena de texto** con formato JSON. Esto es necesario porque las solicitudes HTTP solo pueden enviar texto, y tu backend necesita que los datos vengan en formato JSON para poder leerlos.

### **Paso 3: Manejar las respuestas del servidor**

Este paso es crucial para saber si el login fue exitoso o si hubo algún problema.

-   **`if (response.ok) { ... }`**:
    -   Verifica si la respuesta del servidor es exitosa (códigos de estado entre 200 y 299). Si es `true`, significa que el login fue correcto.
-   **`const result = await response.json();`**:
    -   Si el login fue exitoso, lee el cuerpo de la respuesta del servidor (que contiene el objeto del cliente) y lo convierte de JSON a un objeto JavaScript para que puedas usarlo.
-   **`else { ... }`**:
    -   Si la respuesta del servidor no fue exitosa (por ejemplo, un código 401 por credenciales incorrectas), el código se ejecuta aquí.
-   **`const errorText = await response.text();`**:
    -   Lee el cuerpo de la respuesta como una **cadena de texto**, ya que tu backend envía el mensaje de error de esa forma.

---

## 3. Lo que haremos a continuación

### **Paso 4: Interactuar con la interfaz de usuario (DOM)**

-   **Objetivo:** Mostrar los mensajes de éxito o error al usuario en la página, en lugar de solo en la consola.
-   **Acción:**
    -   Usar un elemento HTML con un `id` (por ejemplo, `<p id="message">`) para mostrar los mensajes.
    -   Actualizar el `textContent` de ese elemento con el mensaje de éxito o con el mensaje de error recibido del servidor.

### **Paso 5: Lógica de redireccionamiento**

-   **Objetivo:** Si el login es exitoso, llevar al usuario a una nueva página.
-   **Acción:**
    -   Usar `window.location.href = '/dashboard.html';` dentro del bloque `if (response.ok)` para redirigir la página del navegador.

Espero que este resumen te ayude a dormir tranquilo y a retomar el trabajo con más claridad mañana. ¡Que descanses!

Cuando estés listo, podemos empezar a trabajar en el **Paso 4**.