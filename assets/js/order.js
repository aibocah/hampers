
/* ==================================================
   ORDER.JS — FINAL VERSION (FIREBASE)
   ================================================== */

import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ===============================
   STATE GLOBAL
================================ */
let selectedProduct = {};
let isCustomProduct = false;

/* ===============================
   OPEN PRODUCT (MODAL)
================================ */
window.openProduct = function (title, price, desc, custom) {
  selectedProduct = { title, price, desc };
  isCustomProduct = custom;

  modalTitle.textContent = title;
  modalPrice.textContent = price;
  modalDesc.textContent = desc;

  customSection.style.display = custom ? "block" : "none";

  resetForm();
  hideError();
  modal.style.display = "flex";
};

/* ===============================
   CLOSE MODAL
================================ */
window.closeModal = function () {
  modal.style.display = "none";
};

/* ===============================
   SUBMIT ORDER
================================ */
window.orderFromModal = async function () {
  hideError();

  const name = buyerName.value.trim();
  const address = buyerAddress.value.trim();
  const phone = buyerPhone.value.trim();
  const note = customText.value.trim();

  if (!name || !address || !phone) {
    showError("Mohon lengkapi nama, alamat, dan nomor WhatsApp 🙏");
    return;
  }

  /* ===============================
     CUSTOM ITEMS
  ================================ */
  let customItems = [];
  if (isCustomProduct) {
    document
      .querySelectorAll('#modal input[type="checkbox"]:checked')
      .forEach(el => customItems.push(el.value));
  }

  if (isCustomProduct && customItems.length === 0 && !note) {
    showError("Untuk hampers custom, mohon pilih minimal 1 isian ✨");
    return;
  }

  /* ===============================
     SAVE TO FIRESTORE
  ================================ */
  const orderData = {
    name,
    address,
    phone,
    product: selectedProduct.title,
    price: selectedProduct.price,
    desc: selectedProduct.desc,
    customItems,
    note: note || "-",
    status: "baru",
    createdAt: serverTimestamp()
  };

  try {
    await addDoc(collection(db, "orders"), orderData);
  } catch (err) {
    console.error(err);
    showError("Gagal menyimpan order. Coba lagi 🙏");
    return;
  }

  /* ===============================
     WHATSAPP MESSAGE
  ================================ */
  const message = `
Halo, saya mau pesan hampers 🎁

Nama: ${name}
Alamat: ${address}
No WhatsApp: ${phone}

Produk: ${orderData.product}
Harga: ${orderData.price}

Isi Produk:
${orderData.desc}

Custom:
${customItems.join(", ") || "-"}

Catatan:
${note || "-"}

Mohon info ketersediaan & total harga 🙏
`;

  window.open(
    "https://wa.me/62895339847320?text=" +
      encodeURIComponent(message),
    "_blank"
  );

  closeModal();
};

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

// auto hide error ketika user mengetik
document.addEventListener("input", hideError);
