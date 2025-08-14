const onSubmit = (event) => {
  event.preventDefault();
  // console.log(event.target);

  const formData = new FormData(event.target);
  const newEntry = Object.fromEntries(formData.entries());
  console.log(newEntry);
  const url = `http://localhost:8080/api/v1/repairman/`;

  const user = {
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
    body: JSON.stringify(user),
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

// // Se obtiene el input
// const inputEl = document.getElementById("product-image");

// // Se agrega un evento y una función al input
// inputEl.addEventListener("change", () => {
//   // Se obtiene un archivo desde el input
//   const file = inputEl.files[0];

//   // Se crea un objeto FileReader
//   const fr = new FileReader();

//   // Se onfigura la salida de datos del FileReader como una URL string
//   fr.readAsDataURL(file);

//   // Sees pera a que se complete la lectura del archivo
//   fr.addEventListener("load", () => {
//     // Se guarda el resultado
//     const url = fr.result;

//     //Obtenemos el formulario del DOM
//     const form = document.getElementById("add-Product");

//     // Se crea un objeto FormData
//     const formData = new FormData(form);

//     // Agregamos un nuevo campo al formData
//     formData.append("url", url);

//     // Creación del objeto JS a partir del formData
//     const newProduct = Object.fromEntries(formData.entries());

//     // Se transforma en string para que sea posible almacenarlo en localstorage
//     const stringProduct = JSON.stringify(newProduct);

//     //Contador de productos (agrega un identificador al producto)
//     let productCounter = localStorage.length + 1;

//     let productKey = "Product" + productCounter;
//     localStorage.setItem(productKey, stringProduct);
//   });
// });

// const getProducts = () => {
//   // Se obtiene el <div></div> donde se van a agregar los productos
//   const productos = document.getElementById("product-list");

//   // Se itera todo el localstorage
//   for (i = 1; i <= localStorage.length; i++) {

//     // Se obtiene el item de la iteración correspondiente desde el localstorage
//     let newProduct = localStorage.getItem(`Product${i}`);

//     // Se hace un parse del item ya que se almacena en string en el localstorage
//     let product = JSON.parse(newProduct);

//     // Se comprueba que existe el item (que no sea null)
//     if (product) {
//       // Se crea un contenedor para agregar los valores del item dentro de una card
//       let div = document.createElement("div");

//       // Plantilla card
//       let template = `<div class="card" style="width: 18rem">
//            <img src="${product.url}" class="card-img-top"/>
//            <div class="card-body d-grid text-center">

//                <h4>${product.productName}</h4>
//                <strong>$ ${product.productCost}</strong>

//              <p class="card-text text-start">
//                ${product.productDescription}
//              </p>
//              <button id="addProduct" class="btn btn-primary btn-sm">Comprar</button>
//            </div>
//          </div>`;

//       // Se agrega la card dentro del contenedor creado previamente
//       div.innerHTML = template;

//       // Se agrega al contenedor que se obtuvo a través de su id en el DOM
//       productos.append(div);

//       //Seleccionar el boton con id addProduct -- incompleto
//       const btnComprar = document.getElementById('#addProduct');
//       //Event Listener para el boton
//       console.log(product);
//       btnComprar.addEventListener('click', () => {
//         addToCarrito(product); // Le pasamos el objeto Producto con sus atributos
//       });
//     }
//   }
// };

const getProducts = async () => {
  // Se obtiene el <div></div> donde se van a agregar los productos
  const productos = document.getElementById("product-list");

  try {
    const productos = await fetch();
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
