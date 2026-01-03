/* ==================================================
   MODAL + ORDER WHATSAPP (FINAL – NO FIREBASE)
================================================== */

/* ===============================
   ELEMENT
================================ */
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.getElementById("modalDesc");
const customSection = document.getElementById("customSection");

const buyerName = document.getElementById("buyerName");
const buyerAddress = document.getElementById("buyerAddress");
const buyerPhone = document.getElementById("buyerPhone");
const customText = document.getElementById("customText");
const formError = document.getElementById("formError");

/* ===============================
   STATE
================================ */
let selectedProduct = null;

/* ===============================
   OPEN MODAL
================================ */
function openProduct(product) {
  selectedProduct = product;

  modalTitle.textContent = product.title;
  modalPrice.textContent = product.price
    ? "Rp " + product.price.toLocaleString("id-ID")
    : "Harga Menyesuaikan";
  modalDesc.textContent = product.desc || "-";

  customSection.style.display = product.custom ? "block" : "none";

  resetForm();
  hideError();
  modal.style.display = "flex";
}

/* ===============================
   CLOSE MODAL
================================ */
function closeModal() {
  modal.style.display = "none";
}

/* ===============================
   ORDER VIA WHATSAPP
================================ */
function orderFromModal() {
  hideError();

  const name = buyerName.value.trim();
  const address = buyerAddress.value.trim();
  const phone = buyerPhone.value.trim();
  const note = customText.value.trim();

  if (!name || !phone) {
    showError("Nama dan nomor WhatsApp wajib diisi 🙏");
    return;
  }

  /* custom items */
  let customItems = [];
  if (selectedProduct.custom) {
    document
      .querySelectorAll('#modal input[type="checkbox"]:checked')
      .forEach(el => customItems.push(el.value));

    if (customItems.length === 0 && !note) {
      showError("Untuk hampers custom, pilih minimal 1 isian ✨");
      return;
    }
  }

  const pesan = `
Halo, saya mau pesan hampers 🎁

Nama: ${name}
Alamat: ${address || "-"}
No WhatsApp: ${phone}

Produk: ${selectedProduct.title}
Harga: ${
    selectedProduct.price
      ? "Rp " + selectedProduct.price.toLocaleString("id-ID")
      : "Menyesuaikan"
  }

Isi:
${selectedProduct.desc || "-"}

Custom:
${customItems.join(", ") || "-"}

Catatan:
${note || "-"}
`;

  window.open(
    "https://wa.me/62895339847320?text=" +
      encodeURIComponent(pesan),
    "_blank"
  );

  closeModal();
}

/* ===============================
   UI HELPERS
================================ */
function showError(text) {
  formError.textContent = text;
  formError.style.display = "block";
}

function hideError() {
  if (formError) formError.style.display = "none";
}

function resetForm() {
  buyerName.value = "";
  buyerAddress.value = "";
  buyerPhone.value = "";
  customText.value = "";

  document
    .querySelectorAll('#modal input[type="checkbox"]')
    .forEach(el => (el.checked = false));
}

/* auto hide error */
document.addEventListener("input", hideError);

