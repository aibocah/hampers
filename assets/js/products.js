document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");

  let products = JSON.parse(localStorage.getItem("products")) || [];

  // fallback kalau localStorage kosong
  if (products.length === 0) {
    fetch("products.json")
      .then(res => res.json())
      .then(data => {
        products = data;
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts(products);
      })
      .catch(() => {
        productList.innerHTML = "<p>Produk belum tersedia</p>";
      });
  } else {
    renderProducts(products);
  }

  function renderProducts(products) {
    productList.innerHTML = "";

    products.forEach(p => {
      const div = document.createElement("div");
      div.className = "product-card";

      div.innerHTML = `
        <img src="${p.image}" style="max-width:150px">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <strong>Rp ${p.price}</strong>
      `;

      productList.appendChild(div);
    });
  }
});
