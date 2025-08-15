/*
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

const onClick = async (event) => {
    const saleid = event.target.value;
    console.log(saleid);
    const url =`http://localhost:8080/api/v1/repairman/sales/${saleid}`;

    const res = await fetch(url);
    const productJson = await res.json();
    const newProduct = {
        id: productJson.salesID,
        productName:productJson.model, 
        imagen: productJson.imageUrl,
        productDescription: productJson.description,
        productCost: productJson.price
    }

    addToCarrito(newProduct);
    
}
*/

const showProducts = async (event) => {
    const productList = document.getElementById("product-list");
    const url = 'http://localhost:8080/api/v1/repairman/customers'; // La URL para obtener todos los datos
    
    try {
        // event.preventDefault();
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
                                <p>Vendido por <strong> ${customer.firstname} ${customer.lastname} </strong></p>
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

window.onload = () => {
    showProducts(event);
}