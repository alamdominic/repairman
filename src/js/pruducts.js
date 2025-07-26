
const form = document.getElementById("add-Product");
const onFormSumbmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newProduct = Object.fromEntries(formData.entries());
    console.log(newProduct);
}
form.addEventListener("submit", onFormSumbmit);