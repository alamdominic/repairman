function obtenerDatos(url) {
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            const divProductos = document.getElementById('productList');
            divProductos.innerHTML = '';

            for (const producto of datos.productos) {
                const productCol = document.createElement('div');
                productCol.classList.add('col-12', 'col-md-4', 'mb-4');

                const cardHTML = `
                    <div class="card product-card h-100 text-center shadow-sm">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.productName}">
                        <div class="card-body">
                            <h6 class="card-title mb-1">${producto.productName}</h6>
                            <div class="rating">★★★★☆ <span>(${producto.reviews})</span></div>
                            <p class="text-muted text-decoration-line-through">$${producto.precioOriginal}</p>
                            <p class="price">$${producto.precioFinal}</p>
                            <button class="btn btn-primary btn-sm">Comprar</button>
                        </div>
                    </div>
                `;

                productCol.innerHTML = cardHTML;
                divProductos.appendChild(productCol);
            }
        })
        .catch(error => console.error('Error:', error));
}

let productosData = []; // Guardaremos aquí todos los productos para filtrar después

function obtenerDatos(url) {
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            productosData = datos.productos; // Guardamos todos los productos
            mostrarProductos(productosData); // Mostramos todos al inicio
        })
        .catch(error => console.error('Error:', error));
}

function mostrarProductos(lista) {
    const divProductos = document.getElementById('productList');
    divProductos.innerHTML = '';

    for (const producto of lista) {
        const productCol = document.createElement('div');
        productCol.classList.add('col-12', 'col-md-4', 'mb-4');

        const cardHTML = `
            <div class="card product-card h-100 text-center shadow-sm">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.productName}">
                <div class="card-body">
                    <h6 class="card-title mb-1">${producto.productName}</h6>
                    <div class="rating">★★★★☆ <span>(${producto.reviews})</span></div>
                    <p class="text-muted text-decoration-line-through">$${producto.precioOriginal}</p>
                    <p class="price">$${producto.precioFinal}</p>
                    <button class="btn btn-primary btn-sm">Comprar</button>
                </div>
            </div>
        `;

        productCol.innerHTML = cardHTML;
        divProductos.appendChild(productCol);
    }
}

// Función para filtrar en tiempo real
function filtrarProductos(texto) {
    const filtro = texto.toLowerCase();
    const filtrados = productosData.filter(producto =>
        producto.productName.toLowerCase().includes(filtro)
    );
    mostrarProductos(filtrados);
}

// Escuchar evento del input
document.addEventListener('DOMContentLoaded', () => {
    const buscador = document.querySelector('#buscador');
    buscador.addEventListener('input', e => {
        filtrarProductos(e.target.value);
    });
});