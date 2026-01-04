async function loadProducts() {
  try {
    const res = await fetch("products.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal load products.json");
    const products = await res.json();
    renderProducts(products);
  } catch (err) {
    console.error(err);
    document.getElementById("productList").innerHTML =
      "<p style='text-align:center;color:#999'>Produk belum tersedia</p>";
  }
}

function renderProducts(products) {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach(p => {
    list.innerHTML += `
      <div class="card product-card">
        <div class="swipe-container">
          <div class="swipe-track">
            ${p.images
              .map(
                img =>
                  `<img src="${img}" alt="${p.name}" onclick="zoomImage('${img}')">`
              )
              .join("")}
          </div>
        </div>

        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="price">Rp ${p.price.toLocaleString("id-ID")}</div>

        <button onclick="orderProduct('${p.name}', ${p.price})">
          Pesan
        </button>
      </div>
    `;
  });
}

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

// ===== ZOOM IMAGE =====
function zoomImage(src) {
  const zoomModal = document.getElementById("zoomModal");
  const zoomImg = document.getElementById("zoomImg");
  zoomImg.src = src;
  zoomModal.style.display = "flex";
}
