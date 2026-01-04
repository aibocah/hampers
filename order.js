const container = document.getElementById("product-list");

PRODUCTS.forEach(p => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${p.images[0]}" onclick="openModal(${p.id})">
    <h3>${p.name}</h3>
    <p>${p.description}</p>
    <strong>Rp ${p.price.toLocaleString()}</strong>
    <button onclick="openModal(${p.id})">Pesan Sekarang</button>
  `;
  container.appendChild(card);
});
