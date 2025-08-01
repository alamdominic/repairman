//Mostrar productos en Cards en la pagina index.html
const url = 'http://127.0.0.1:5500/src/js/db.json';
function obtenerDatos(url) { // Petición GET
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => {
        const divProductos = document.getElementById('productList'); // Selecciona un div con id = productList de index
        divProductos.innerHTML = ''; // seteamos vacio el contenedor padre de productos

        const productsTitle = document.createElement('h2'); // Creamos un nuevo elemento html
        productsTitle.classList = 'text-center fw-bold mb-5';
        productsTitle.textContent = 'Nuestro stock';
        divProductos.appendChild(productsTitle); // añadimos el elemento hijo a su padre

        const productsRow = document.createElement('div');
        productsRow.classList = 'row justify-content-center';

        for (const producto of datos.productos) {
            //Creacion de la card (Bootstrap) por cada elemento del objeto json
            const productCol = document.createElement('div');
            productCol.classList.add('col-12', 'col-md-4', 'mb-4'); 

            const cardHTML = `
                <div class="card h-100 text-center shadow-sm">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.productName}">
                    <div class="card-body">
                        <h5 class="card-title mb-1">${producto.productName}</h5>
                        <p class="card-text fw-bold mb-2">${producto.productDescription}</p> 
                        <p class="card-text fw-bold mb-2">${producto.productCost}$</p> 
                        <button id="addProduct" class="btn btn-primary btn-sm">Comprar</button>
                    </div>
                </div>
            `;
            productCol.innerHTML=cardHTML;

            //Seleccionar el boton con id addProduct
            const btnComprar = productCol.querySelector('#addProduct');
            //Event Listener para el boton
            btnComprar.addEventListener('click', ()=>{
                addToCarrito(producto); // Le pasamos el objeto Producto con sus atributos
            });

            productsRow.appendChild(productCol);
        }
        divProductos.appendChild(productsRow);
    })
    .catch(error => console.error('Error:', error));
}
// Funcion para añadir los productos al localStorage
function addToCarrito(producto){
    // json.parse Intenta obtener el 'carrito' del localStorage y convertirlo en un arreglo. Si no existe o está vacío, entonces usa un arreglo vacío como valor inicial
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificamos si el producto ya está en el carrito para actualizar la cantidad
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        // Si ya existe, incrementamos la cantidad
        productoExistente.cantidad++;
    } else {
        //...producto -> Operador de propacion
        // Hace una copia de todas las propiedades del producto original en el objeto carrito.
        // Si no existe, agregamos una cantidad (nueva propiedad) inicial de 1
        carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${producto.productName} ha sido añadido al carrito.`);
}
obtenerDatos(url);
