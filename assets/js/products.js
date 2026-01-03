const productList = document.getElementById("product-list");

// Ambil produk (dari localStorage, fallback ke products.json)
async function getProducts() {
  let products = JSON.parse(localStorage.getItem("products"));

  if (!products || products.length === 0) {
    try {
      const res = await fetch("products.json");
      products = await res.json();
      localStorage.setItem("products", JSON.stringify(products));
    } catch (error) {
      console.error("Gagal load products.json", error);
      products = [];
    }
  }

  return products;
}

// Render produk ke halaman index
async function renderProducts() {
  const products = await getProducts();
  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML = "<p>Produk belum tersedia</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <span>Rp ${product.price}</span>
    `;

    productList.appendChild(card);
  });
}

// Jalankan saat halaman dibuka
renderProducts();
