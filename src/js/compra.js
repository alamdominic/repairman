const showProducts = async (event) => {
    const productList = document.getElementById("product-list");
    const url = 'http://localhost:8080/api/v1/repairman/customers'; // La URL para obtener todos los datos
    
    try {
        event.preventDefault();
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const customers = await res.json(); 
        console.log(customers); 

        if (!Array.isArray(customers) || customers.length === 0) {
            let h1 = document.createElement("h1");
            h1.textContent = "Aun no hay nada aquí, usa el boton Agregar.";
            productList.appendChild(h1);
            return;
        }

        let fragment = document.createDocumentFragment();

        // Itera sobre la lista de clientes
        customers.forEach(customer => {
            // para cada cliente, itera sobre su lista de ventas
            if (customer.sales && customer.sales.length > 0) {
                customer.sales.forEach(sale => {
                    let div = document.createElement("div");
                    let template = `
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="card h-100">
                            <img src="${sale.imageUrl}" class="card-img-top" alt="${sale.description}"/>
                            <div class="card-body">
                                <h4 class="card-title">${sale.brand} - ${sale.model}</h4>
                                <strong>$ ${sale.price}</strong>
                                <p class="card-text">
                                    ${sale.description}
                                </p>
                                <p>Vendido por <strong> ${customer.firstname} ${customer.lastname} </strong></p>
                            </div>
                        </div>
                    </div>`;
                    div.innerHTML = template;
                    div.classList.add("px-3");
                    fragment.appendChild(div);
                });
            }
        });
        
        productList.appendChild(fragment);

    } catch (e) {
        console.error(e);
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

window.onload = () => {
    showProducts(event);
}