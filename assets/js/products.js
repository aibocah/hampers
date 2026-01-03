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
        <div class="slider">
          ${(p.images || []).map((img, i) =>
            `<img src="${img}" class="${i === 0 ? "active" : ""}" onclick="zoomImage('${img}')">`
          ).join("")}
        </div>

        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <strong>Rp ${p.price.toLocaleString("id-ID")}</strong>

        <button onclick='openModal(${JSON.stringify(p)})'>Pesan</button>
      `;

      productList.appendChild(card);
      initSlider(card);
    });
  }
});

function initSlider(card) {
  const images = card.querySelectorAll(".slider img");
  let index = 0;

  if (images.length <= 1) return;

  setInterval(() => {
    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
  }, 3000);
}
function zoomImage(src) {
  zoomImg.src = src;
  zoomModal.style.display = "flex";
}

