let selectedProduct = null;

function openModal(product) {
  selectedProduct = product;

  document.getElementById("modalTitle").innerText = product.name;
  document.getElementById("modalPrice").innerText =
    "Rp " + Number(product.price).toLocaleString("id-ID");
  document.getElementById("modalDesc").innerText = product.description;

  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
