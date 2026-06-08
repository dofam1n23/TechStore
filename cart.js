function renderCart() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    cart.items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <h3>${item.product.title}</h3>
            <p>$${item.product.price} x ${item.quantity}</p>
            <button onclick="removeFromCart(${item.product.id})">Удалить</button>
        `;
        container.appendChild(div);
    });
    document.getElementById('total').textContent = cart.getTotal().toFixed(2);
}

function removeFromCart(id) {
    cart.removeItem(id);
    renderCart();
}

function checkout() {
    if (cart.items.length === 0) {
        alert('Корзина пуста');
        return;
    }
    alert('Заказ оформлен! Спасибо за покупку.');
    cart.items = [];
    cart.save();
    renderCart();
    updateCartCount();
}

window.onload = () => {
    renderCart();
    updateCartCount();
    updateUserGreeting();
};