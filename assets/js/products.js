document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");
  let products = JSON.parse(localStorage.getItem("products")) || [];

  if (products.length === 0) {
    fetch("products.json")
      .then(r => r.json())
      .then(data => {
        products = data;
        localStorage.setItem("products", JSON.stringify(products));
        render(products);
      });
  } else {
    render(products);
  }

  function render(data) {
    productList.innerHTML = "";

    data.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <div class="swipe-container">
          <div class="swipe-track">
            ${(p.images || []).map(img =>
              `<img src="${img}" onclick="zoomImage('${img}')">`
            ).join("")}
          </div>
        </div>

        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <strong>Rp ${p.price.toLocaleString("id-ID")}</strong>

        <button onclick='openModal(${JSON.stringify(p)})'>Pesan</button>
      `;

      productList.appendChild(card);
      initSwipe(card);
    });
  }
});

// ===== SWIPE LOGIC =====
function initSwipe(card) {
  const container = card.querySelector(".swipe-container");
  const track = card.querySelector(".swipe-track");
  const images = track.querySelectorAll("img");

  if (images.length <= 1) return;

  let index = 0;
  let startX = 0;
  let currentX = 0;

  container.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  container.addEventListener("touchmove", e => {
    currentX = e.touches[0].clientX;
  });

  container.addEventListener("touchend", () => {
    const diff = startX - currentX;

    if (diff > 50 && index < images.length - 1) index++;
    if (diff < -50 && index > 0) index--;

    track.style.transform = `translateX(-${index * 100}%)`;
  });
}

