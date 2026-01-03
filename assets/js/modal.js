/* ==================================================
   MODAL.JS — FINAL
================================================== */

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.getElementById("modalDesc");
const customSection = document.getElementById("customSection");

function openProduct(product) {
  window.selectedProduct = product;

  modalTitle.textContent = product.title;
  modalPrice.textContent = product.price
    ? "Rp " + product.price.toLocaleString("id-ID")
    : "Harga Menyesuaikan";
  modalDesc.textContent = product.desc || "-";

  customSection.style.display = product.custom ? "block" : "none";
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

