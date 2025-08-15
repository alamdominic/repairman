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
    const saleid = document.getElementsByName("newId")[0].value;  // Guardamos el id de saleID
    
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

const showProducts = async (event) => {
    const productList = document.getElementById("product-list");
    const url = `http://localhost:8080/api/v1/repairman/sales`;
    try {
        event.preventDefault();
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const products = await res.json();
        console.log(products);
        if (!Array.isArray(products) || products.length === 0) {
            let h1 = document.createElement("h1");
            h1.textContent = "No se encontraron productos";
            productList.appendChild(h1);
            return;
        }

    
        let fragment = document.createDocumentFragment();
        products.map(product => {
            let div = document.createElement("div");
            let template = `<div class="card" style="width: 18rem">
           <img src="${product.imageUrl}" class="card-img-top"/>
           <div class="card-body d-grid text-center">
             
               <h4>${product.brand} - ${product.model}</h4>
               <strong>$ ${product.price}</strong>

             <p class="card-text text-center">
               ${product.description}
             </p>
             <button id="addProduct" class="btn btn-primary btn-sm" name="newId" value="${product.salesID}" onclick="onClick(event)">Comprar</button>
           </div>
         </div>`;
         div.innerHTML = template;
         div.classList.add("px-3");
         productList.appendChild(div);

        //  //Seleccionar el boton con id addProduct -- incompleto
        // const btnComprar = document.getElementById("#addProduct");
        // //Event Listener para el boton
        // console.log(product);
        // btnComprar.addEventListener("click", () => {
        //   addToCarrito(product); // Le pasamos el objeto Producto con sus atributos
        // });
        });

    } catch (e) {
        console.error(e);
    }


}


window.onload = () => {
    showProducts(event);
}