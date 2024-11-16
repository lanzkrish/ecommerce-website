// Mock Products
const products = [
    { id: 1, name: "Laptop", price: 800, description: "High-performance laptop.", image: "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/d/k/k/-original-imagqkqnb2fpbhyb.jpeg?q=70" },
    { id: 2, name: "Smartphone", price: 500, description: "Latest model smartphone.", image: "https://via.placeholder.com/250" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Load Product Details
if (window.location.pathname.endsWith("product.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"), 10);
    const product = products.find((p) => p.id === productId);

    if (product) {
        document.getElementById("product-info").innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h1>${product.name}</h1>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
        `;

        document.getElementById("add-to-cart-btn").addEventListener("click", () => {
            addToCart(product);
            alert(`${product.name} added to cart!`);
        });
    }
}

// Add Product to Cart
function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

// Load Cart
if (window.location.pathname.endsWith("cart.html")) {
    const cartList = document.getElementById("cart-list");
    const totalPriceElement = document.getElementById("total-price");

    let totalPrice = 0;
    cart.forEach((item) => {
        totalPrice += item.price * item.quantity;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
            <div>
                <img src="${item.image}" alt="${item.name}" width="100">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
        `;
        cartList.appendChild(cartItem);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

document.getElementById("checkout-btn")?.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Thank you for your purchase!");
        cart = [];
        localStorage.removeItem("cart");
        location.reload();
    }
});
