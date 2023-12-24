const cartId = document.getElementById('cartId');
const btnPurchase = document.getElementById("purchase");

btnPurchase.onclick = async () => {
    const response = await fetch(`http://localhost:8080/api/carts/${cartId.value}/purchase`, {
        method:'GET'
    });
    const resData = await response.json();
    if(resData.opSuccess){
        Swal.fire({
            title: 'Éxito en la compra!!!',
            html: "Los datos de su compra fueron enviados a su correo",
            icon: 'success',
            confirmButtonText: '¡Entendido!'
        }).then(result => {
            if(result.isConfirmed){
                location.reload()
            }
        });
    }
}