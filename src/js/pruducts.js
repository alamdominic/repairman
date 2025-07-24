
const form = document.getElementById("add-Product");
const onFormSumbmit = (event) => {
    const formData = new FormData(event.target);
    const newProduct = Object.fromEntries(formData.entries());

    const stringProduct = JSON.stringify(newProduct);

    let productCounter = localStorage.length + 1;
    let productKey= "Product" + productCounter;
    localStorage.setItem(productKey, stringProduct);
    
}
form.addEventListener("submit", onFormSumbmit);