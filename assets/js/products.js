async function loadProducts() {
  const res = await fetch("products.json");
  const products = await res.json();

  const list = document.getElementById("productList");
  list.innerHTML = "";

  products
    .filter(p => p.active)
    .forEach(p => {
      const card = document.createElement("div");
      card.className = "card product-card";
      card.innerHTML = `
        <img src="${p.image}">
        <h3>${p.title}</h3>
        <p class="price">
          ${p.price ? "Rp " + p.price.toLocaleString("id-ID") : "Harga Menyesuaikan"}
        </p>
      `;
      card.onclick = () => openProduct(p);
      list.appendChild(card);
    });
}

loadProducts();
