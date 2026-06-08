
async function loadProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) return;

    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const p = await res.json();
        const prod = new Product(p.id, p.title, p.price, p.description, p.image, p.category); // Assuming Product class from app.js

        const detail = document.getElementById('product-detail');
        detail.innerHTML = `
            <img src="${prod.image}" alt="${prod.title}" style="max-width:300px;">
            <h2>${prod.title}</h2>
            <p>$${prod.price}</p>
            <p>${prod.description}</p>
            <button onclick="addToCart(${prod.id})">Добавить в корзину</button>
            <button onclick="window.location.href='cart.html'">В корзину</button>
        `;
    } catch (e) {
        console.error(e);
    }
}

function goBack() {
    window.location.href = 'index.html';
}

window.onload = () => {
    loadProduct();
    updateCartCount();
    updateUserGreeting();
};