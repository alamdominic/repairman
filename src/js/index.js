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

        for (const producto of datos.recursos) {
            //Creacion de la card (Bootstrap) por cada elemento del objeto json
            const productCol = document.createElement('div');
            productCol.classList = 'col-12 col-md-4 mb-4'; 

            productCol.innerHTML = `
                <div class="card h-100 text-center shadow-sm">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title mb-1">${producto.nombre}</h5>
                        <p class="card-text fw-bold mb-2">${producto.descripcion}</p> 
                        <button class="btn btn-primary btn-sm">Comprar</button>
                    </div>
                </div>
            `;
            productsRow.appendChild(productCol);
        }
        divProductos.appendChild(productsRow);
    })
    .catch(error => console.error('Error:', error));
}

obtenerDatos(url);
