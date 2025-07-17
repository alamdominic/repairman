//Mostrar productos en Cards
const plantilla='';
const url = 'http://127.0.0.1:5500/db.json';
function obtenerDatos(url) {
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => {
        const divProductos = document.getElementById('productList');

        divProductos.innerHTML = ''; 

        const productsTitle = document.createElement('h2');
        productsTitle.classList = 'text-center fw-bold mb-5';
        productsTitle.textContent = 'Nuestro stock';
        divProductos.appendChild(productsTitle);

        const productsRow = document.createElement('div');
        productsRow.classList = 'row justify-content-center';

        for (const producto of datos.recursos) {
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
