let cart = [];

function addToCart(item) {
    cart.push(item);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartList = document.getElementById("cart");
    cartList.innerHTML = "";
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;
        cartList.appendChild(li);
    });
    document.getElementById("order-input").value = JSON.stringify(cart);
}

document.getElementById("order-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const orderData = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch("https://your-gcp-endpoint.com/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });
        
        if (response.ok) {
            alert("Zamówienie zostało wysłane!");
            cart = [];
            updateCartDisplay();
            event.target.reset();
        } else {
            alert("Błąd podczas składania zamówienia.");
        }
    } catch (error) {
        console.error("Błąd połączenia z serwerem", error);
        alert("Nie udało się połączyć z serwerem.");
    }
});
