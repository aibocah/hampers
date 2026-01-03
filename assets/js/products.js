/* ==================================================
   PRODUCTS.JS — FINAL (LOCALSTORAGE)
   Render produk dari admin editor
================================================== */

const productList = document.getElementById("productList");

/* ===============================
   AMBIL DATA
================================ */
function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

/* ===============================
   RENDER PRODUK
================================ */
function renderProducts() {
  const products = getProducts();
  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML =
      "<p style='text-align:center;color:#666'>Belum ada produk</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="price">
        ${
          product.price
            ? "Rp " + product.price.toLocaleString("id-ID")
            : "Harga Menyesuaikan"
        }
      </p>
    `;

    card.onclick = () => openProduct(product);
    productList.appendChild(card);
  });
}

/* ===============================
   INIT
================================ */
document.addEventListener("DOMContentLoaded", renderProducts);

