class Product {
  constructor(id, title, price, description, image, category) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.image = image;
    this.category = category;
  }
}

class CartItem {
  constructor(product, quantity = 1) {
    this.product = product;
    this.quantity = quantity;
  }
}

class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("cart")) || [];
  }

  addItem(product) {
    const existing = this.items.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push(new CartItem(product));
    }
    this.save();
    updateCartCount();
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.save();
    updateCartCount();
  }

  getTotal() {
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }

  save() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }
}

const cart = new Cart();

async function fetchProducts() {
  try {
    // const res = await fetch('https://fakestoreapi.com/products/category/electronics');
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    // const data = await res.json();
    // Filter or enhance for theme: ASUS, Honor, Samsung - but use available
    displayProducts(data);
  } catch (e) {
    console.error("Error fetching products", e);
  }
}

function displayProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";
  products.forEach((p) => {
    const prod = new Product(
      p.id,
      p.title,
      p.price,
      p.description,
      p.image,
      p.category,
    );
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
            <img src="${prod.image}" alt="${prod.title}">
            <h3>${prod.title}</h3>
            <p>$${prod.price}</p>
            <button onclick="viewProduct(${prod.id})">Подробнее</button>
            <button onclick="addToCart(${prod.id})">В корзину</button>
        `;
    container.appendChild(card);
  });
}

function addToCart(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((p) => {
      const prod = new Product(
        p.id,
        p.title,
        p.price,
        p.description,
        p.image,
        p.category,
      );
      cart.addItem(prod);
      alert("Товар добавлен в корзину!");
    });
}

function viewProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

function updateCartCount() {
  const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = count;
}

// User handling
function updateUserGreeting() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const greeting = document.getElementById("user-greeting");
  if (user) {
    greeting.innerHTML = `Привет, ${user.name || user.email} <button onclick="logout()">Выйти</button>`;
  } else {
    greeting.innerHTML = '<a href="auth.html">Войти</a>';
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  updateUserGreeting();
}

window.onload = () => {
  fetchProducts();
  updateCartCount();
  updateUserGreeting();
};
