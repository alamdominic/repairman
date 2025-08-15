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
                    const colDiv = document.createElement("div");
                    colDiv.classList.add("col-sm-6", "col-md-4", "col-lg-3", "px-3");

                    // Define el template de la tarjeta sin el div de la columna
                    const cardTemplate = `
                        <div class="card h-100">
                            <img src="${sale.imageUrl}" class="card-img-top" alt="${sale.description}"/>
                            <div class="card-body">
                                <h4 class="card-title">${sale.brand} - ${sale.model}</h4>
                                <strong>$ ${sale.price}</strong>
                                <p class="card-text">
                                    ${sale.description}
                                </p>
                                <p><strong>Estado ${sale.cellphoneStatus} </p></strong>
                                <p>Vendido por <strong> ${customer.firstname} ${customer.lastname} </strong></p>
                                <button id="addProduct" class="btn btn-primary btn-sm" name="newId" value="value="${sale.salesID}"" onclick="onClick(event)">Agregar al carrito</button>
                            </div>
                        </div>`;
                    // Asigna el template al innerHTML del div de la columna
                    colDiv.innerHTML = cardTemplate;

                    // Agrega el div de la columna al DocumentFragment
                    fragment.appendChild(colDiv);
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
    const productCards = document.querySelectorAll('#product-list .col-sm-6');

    productCards.forEach(card => {
        // Obtener el texto completo de la tarjeta (título, descripción, etc.)
        const cardText = card.textContent.toLowerCase();

        // Comprobar si el texto de la tarjeta incluye el término de búsqueda
        if (cardText.includes(texto)) {
            card.style.display = 'block'; // O 'flex' si tu contenedor principal es d-flex
        } else {
            card.style.display = 'none';
        }
    });
}

// Escuchar evento del input
document.getElementById('buscador').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filtrarProductos(searchTerm);
});

window.onload = () => {
    showProducts(event);
}