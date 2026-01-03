document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");

  if (!productList) {
    console.error("productList tidak ditemukan");
    return;
  }

  let products = [];

  try {
    products = JSON.parse(localStorage.getItem("products")) || [];
  } catch (e) {
    console.error("LocalStorage rusak", e);
    products = [];
  }

  // jika ada data dari admin
  if (products.length > 0) {
    render(products);
    return;
  }

  // fallback products.json
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      products = data;
      localStorage.setItem("products", JSON.stringify(products));
      render(products);
    })
    .catch(() => {
      productList.innerHTML = "<p>Produk belum tersedia</p>";
    });

  function render(data) {
    productList.innerHTML = "";

    data.forEach(p => {
      if (!p.name || !p.price) return;

      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <strong>Rp ${Number(p.price).toLocaleString("id-ID")}</strong>
        <button onclick='openModal(${JSON.stringify(p)})'>Pesan</button>
      `;

      productList.appendChild(card);
    });
  }
});
