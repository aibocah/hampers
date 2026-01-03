let selectedProduct = null;

function openModal(product) {
  selectedProduct = product;

  modalTitle.innerText = product.name;
  modalPrice.innerText = "Rp " + product.price.toLocaleString("id-ID");
  modalDesc.innerText = product.description;

  const slider = document.getElementById("modalSlider");
  slider.innerHTML = "";

  product.images.forEach((img, i) => {
    slider.innerHTML += `
      <img src="${img}" class="${i === 0 ? "active" : ""}" onclick="zoomImage('${img}')">
    `;
  });

  initModalSlider();
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

function initModalSlider() {
  const imgs = document.querySelectorAll("#modalSlider img");
  let i = 0;

  if (imgs.length <= 1) return;

  setInterval(() => {
    imgs[i].classList.remove("active");
    i = (i + 1) % imgs.length;
    imgs[i].classList.add("active");
  }, 2500);
}

