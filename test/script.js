// Mock Products
const products1 = [
    { id: 1, name: "Laptop", price: 800, description: "High-performance laptop.", image: "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/a/q/h/-original-imagypv6prbgkfzg.jpeg?q=70" },
    { id: 2, name: "Smartphone", price: 500, description: "Latest model smartphone.", image: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/k/l/l/-original-imagtc5fz9spysyk.jpeg?q=70" },
];
const products = [
    { id: 1, name: "Laptop", price: 800, category: "electronics", image: "https://via.placeholder.com/250" },
    { id: 2, name: "Smartphone", price: 500, category: "electronics", image: "https://via.placeholder.com/250" },
    { id: 3, name: "T-Shirt", price: 20, category: "fashion", image: "https://via.placeholder.com/250" },
    { id: 4, name: "Microwave", price: 100, category: "home", image: "https://via.placeholder.com/250" },
    { id: 5, name: "Sofa", price: 300, category: "home", image: "https://via.placeholder.com/250" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display Products
const productList = document.getElementById("product-list");

function displayProducts(filteredProducts) {
    productList.innerHTML = "";
    filteredProducts.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <a href="product.html?id=${product.id}">View Details</a>
        `;
        productList.appendChild(productCard);
    });
}

// Initial Load
displayProducts(products);

// Search and Filter Functionality
const searchBar = document.getElementById("search-bar");
const categoryFilter = document.getElementById("category-filter");

function filterProducts() {
    const searchTerm = searchBar.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory =
            selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    displayProducts(filteredProducts);
}

// Event Listeners
searchBar.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

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

console.log(item)
