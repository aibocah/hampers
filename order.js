const container = document.getElementById("product-list");

PRODUCTS.forEach(p => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${p.images[0]}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p>${p.description}</p>
    <strong>Rp ${p.price.toLocaleString()}</strong>
    <button data-id="${p.id}">Pesan</button>
  `;

  card.querySelector("button").addEventListener("click", () => {
    openModal(p.id);
  });

  container.appendChild(card);
});

