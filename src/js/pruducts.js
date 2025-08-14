const onSubmit = (event) => {
  event.preventDefault();
  // console.log(event.target);

  const formData = new FormData(event.target);
  const newEntry = Object.fromEntries(formData.entries());
  console.log(newEntry);
  const url = `http://localhost:8080/api/v1/repairman/purchases`;

  const purchase = {
    brand: newEntry.brand,
    cellphoneStatus: newEntry.cellphoneStatus,
    description: newEntry.description,
    model: newEntry.model,
    price: newEntry.price,
    customer: {
      customerID: newEntry.customerID,
    },
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(purchase),
    // body: user
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("Guardado", data);
    })
    .catch((error) => {
      console.error(error);
    });
};


const getProducts = async () => {
  // Se obtiene el <div></div> donde se van a agregar los productos
  const productos = document.getElementById("product-list");

  try {
    const productos = await fetch("http://localhost:8080/api/v1/repairman/purchases");
    const allProducts = await productos.json();

    if (!allProducts) {
      let h1 = document.createElement("h1");
      h1.textContent("No hay productos");
    } else {
      allProducts.map((product) => {
        let div = document.createElement("div");
        // Plantilla card
        let template = `<div class="card" style="width: 18rem">
           <img src="${product.url}" class="card-img-top"/>
           <div class="card-body d-grid text-center">
             
               <h4>${product.brand} - ${product.model}</h4>
               <strong>$ ${product.price}</strong>
             
             <p class="card-text text-start">
               ${product.description}
             </p>
             <button id="addProduct" class="btn btn-primary btn-sm">Comprar</button>
           </div>
         </div>`;

        // Se agrega la card dentro del contenedor creado previamente
        div.innerHTML = template;

        // Se agrega al contenedor que se obtuvo a través de su id en el DOM
        productos.append(div);

        //Seleccionar el boton con id addProduct -- incompleto
        const btnComprar = document.getElementById("#addProduct");
        //Event Listener para el boton
        console.log(product);
        btnComprar.addEventListener("click", () => {
          addToCarrito(product); // Le pasamos el objeto Producto con sus atributos
        });
      });
    }
  } catch (e) {
    console.error("No se pudo recuperar los productos.");
  }
};

// Cada vez se se recarga la página ejecuta las funciones que tiene
window.onload = () => {
  getProducts();
};
