window.selectedProduct = null;

function openModal(product) {
  window.selectedProduct = product;

  modalTitle.innerText = product.name;
  modalPrice.innerText = "Rp " + product.price.toLocaleString("id-ID");
  modalDesc.innerText = product.description;

  const slider = document.getElementById("modalSlider");
  slider.innerHTML = `
    <div class="swipe-container">
      <div class="swipe-track">
        ${product.images.map(img =>
          `<img src="${img}" onclick="zoomImage('${img}')">`
        ).join("")}
      </div>
    </div>
  `;

  initModalSwipe();
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

// ===== SWIPE MODAL =====
function initModalSwipe() {
  const container = document.querySelector("#modalSlider .swipe-container");
  const track = document.querySelector("#modalSlider .swipe-track");
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
