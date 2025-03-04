let cart = [];
let totalPrice = 0;

// Dodawanie produktu do koszyka
function addToCart(item, price) {
    cart.push({ item, price });
    totalPrice += price;
    updateCart();
}

// Aktualizacja koszyka
function updateCart() {
    const cartList = document.getElementById('cart');
    const totalPriceElement = document.getElementById('total-price');
    const orderInput = document.getElementById('order-input');

    cartList.innerHTML = "";
    cart.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.item} - ${product.price} zł`;

        // Dodanie przycisku do usuwania produktu
        const removeButton = document.createElement('button');
        removeButton.textContent = "❌";
        removeButton.onclick = () => removeFromCart(index);
        listItem.appendChild(removeButton);

        cartList.appendChild(listItem);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2); // Wyświetlanie sumy z dwoma miejscami po przecinku
    orderInput.value = JSON.stringify(cart); // Przekazanie koszyka do formularza zamówienia
}

// Usuwanie produktu z koszyka
function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

// Formularz zamówienia
document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (cart.length === 0) {
        alert("Koszyk jest pusty! Dodaj coś do zamówienia.");
        return;
    }

    const orderNumber = Math.floor(100000 + Math.random() * 900000); // Losowy numer zamówienia
    const orderDetails = encodeURIComponent(JSON.stringify(cart));

    window.location.href = `potwierdzenie.html?order=${orderDetails}&orderNumber=${orderNumber}`;
});

