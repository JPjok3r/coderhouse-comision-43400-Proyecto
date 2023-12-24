async function deleteRequest(){
    await fetch('http://localhost:8080/api/users', {method: 'DELETE'})
    .then(res => res.json())
    .then(res => console.log(res));
}

const agregarCarritoForm = document.getElementById("agregarACarrito");
const cartId = document.getElementById('cartId');
const productId = document.getElementById('productId');
const btnPurchase = document.getElementById("purchase");

agregarCarritoForm.onsubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/api/carts/${cartId.value}/products/${productId.value}`, {
        method:'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cant: document.getElementById('inputQuantity').value })
    });
    const resData = await response.json();
    if(resData.op === "success"){
        console.log(resData);
        Toastify({
            text: `Producto añadido al carrito`,
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
        }).showToast();
    } else{
        console.log('Error al agregar');
    }
}