function formatCurrency(value) {
  return `$${value.toLocaleString('es-MX')}`;
}

/* Muestra los productos en #carritoListContainer  */
function showCarrito() {
    const contenedorProductos = document.getElementById('carritoListContainer');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    contenedorProductos.innerHTML = '';

    if (carrito.length === 0) {
        contenedorProductos.innerHTML = `<div class="p-4"><p class="text-center">El carrito está vacío.</p></div>`;
        return;
    }

    carrito.forEach(producto => {
        const row = document.createElement('div');
        row.classList.add('row', 'align-items-center', 'text-center', 'py-4', 'border-bottom', 'gap-2');
        row.dataset.id = producto.id;

        const subtotal = producto.precio * producto.cantidad;

        row.innerHTML = `
            <div class="col-md-1">
                <button type="button" class="btn-close" aria-label="Eliminar" onclick="eliminarProducto(${producto.id})"></button>
            </div>
            <div class="col-md-2">
                <img src="${producto.imagen}" class="rounded mx-auto d-block" style="width: 80px;" alt="${producto.productName}" />
            </div>
            <div class="col-md-3 text-start">
                <p class="mb-1 fw-semibold">${producto.productName}</p>
                <p class="fw-bold text-success mb-0">${formatCurrency(producto.productCost)}</p>
            </div>
            <div class="col-md-3">
                <div class="input-group input-group-sm justify-content-center">
                    <button class="btn btn-outline-dark" onclick="cambiarCantidad(${producto.id}, -1)">-</button>
                    <input type="text" class="form-control text-center border-secondary" value="${producto.cantidad}" readonly style="max-width: 50px;">
                    <button class="btn btn-outline-dark" onclick="cambiarCantidad(${producto.id}, 1)">+</button>
                </div>
            </div>
        `;
        
        contenedorProductos.appendChild(row);
    });
    
    updateCartTotal();
}

/* Elimina un producto del carrito. */
function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    showCarrito(); // Vuelve a renderizar el carrito
}

/** Cambia la cantidad de un producto */
function cambiarCantidad(id, cambio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = carrito.find(item => item.id === id);

    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad <= 0) {
            eliminarProducto(id);
        } else {
            localStorage.setItem('carrito', JSON.stringify(carrito));
            showCarrito();
        }
    }
}

/** Calcula subtotal, envío, total. */
function updateCartTotal() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let subtotal = 0;
    carrito.forEach(item => {
        subtotal += item.productCost * item.cantidad;
    });

    const envio = 20; // Valor fijo
    const impuestos = 0.16; // 16% de impuestos
    const total = subtotal + envio + (subtotal * impuestos);

    // Actualiza los elementos del resumen.
    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('total').textContent = formatCurrency(total);
}

// Inicializa el carrito cuando la página se carga
document.addEventListener('DOMContentLoaded', () => {
    showCarrito();
});