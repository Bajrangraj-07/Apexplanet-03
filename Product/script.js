// product data - normally ye kisi API ya database se aayega
const products = [
  { name: "Wireless Earbuds", category: "electronics", price: 1999, rating: 4.3 },
  { name: "Smart Watch", category: "electronics", price: 3499, rating: 4.1 },
  { name: "Bluetooth Speaker", category: "electronics", price: 1499, rating: 4.5 },
  { name: "Cotton T-Shirt", category: "clothing", price: 499, rating: 4.0 },
  { name: "Denim Jacket", category: "clothing", price: 2299, rating: 4.4 },
  { name: "Running Shoes", category: "clothing", price: 2999, rating: 4.6 },
  { name: "The Alchemist", category: "books", price: 299, rating: 4.7 },
  { name: "Atomic Habits", category: "books", price: 399, rating: 4.8 },
  { name: "Table Lamp", category: "home", price: 899, rating: 4.2 },
  { name: "Coffee Maker", category: "home", price: 2499, rating: 4.0 },
  { name: "Cushion Cover Set", category: "home", price: 599, rating: 3.9 },
  { name: "Gaming Mouse", category: "electronics", price: 1299, rating: 4.5 }
];

const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");
const priceDisplay = document.getElementById("price-display");
const sortSelect = document.getElementById("sort-select");
const productGrid = document.getElementById("product-grid");
const noResults = document.getElementById("no-results");

function renderProducts() {
  const selectedCategory = categoryFilter.value;
  const maxPrice = Number(priceFilter.value);
  const sortBy = sortSelect.value;

  // pehle filter karo
  let filtered = products.filter((p) => {
    const categoryMatch = selectedCategory === "all" || p.category === selectedCategory;
    const priceMatch = p.price <= maxPrice;
    return categoryMatch && priceMatch;
  });

  // fir sort karo
  if (sortBy === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // grid mein dikhao
  productGrid.innerHTML = "";

  if (filtered.length === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }

  filtered.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <span class="product-category">${product.category}</span>
      <h3>${product.name}</h3>
      <p class="product-price">₹${product.price}</p>
      <p class="product-rating">⭐ ${product.rating}</p>
    `;

    productGrid.appendChild(card);
  });
}

categoryFilter.addEventListener("change", renderProducts);
sortSelect.addEventListener("change", renderProducts);

priceFilter.addEventListener("input", () => {
  priceDisplay.textContent = "₹" + priceFilter.value;
  renderProducts();
});

// page load hote hi sab products dikha do
renderProducts();
