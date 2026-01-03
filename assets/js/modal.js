
/* ==================================================
   MODAL ORDER + FIREBASE (FINAL VERSION)
   ================================================== */

import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ===============================
   STATE
================================ */
let selectedProduct = {};
let isCustomProduct = false;

/* ===============================
   OPEN MODAL
================================ */
window.openProduct = function (title, price, desc, custom) {
  selectedProduct = { title, price, desc };
  isCustomProduct = custom;

  modalTitle.innerText = title;
  modalPrice.innerText = price;
  modalDesc.innerText = desc;

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
   ORDER VIA WHATSAPP + FIREBASE
================================ */
window.orderFromModal = async function () {
  hideError();

  const name = buyerName.value.trim();
  const address = buyerAddress.value.trim();
  const phone = buyerPhone.value.trim();
  const note = customText.value.trim();

  // VALIDASI
  if (!name || !address || !phone) {
    showError("Mohon lengkapi nama, alamat, dan nomor WhatsApp 🙏");
    return;
  }

  // CUSTOM ITEM
  let customItems = [];
  if (isCustomProduct) {
    document
      .querySelectorAll('#modal input[type="checkbox"]:checked')
      .forEach(c => customItems.push(c.value));
  }

  if (isCustomProduct && customItems.length === 0 && !note) {
    showError("Untuk hampers custom, mohon isi minimal satu pilihan ✨");
    return;
  }

  /* ===============================
     SAVE TO FIRESTORE
  ================================ */
  try {
    await addDoc(collection(db, "orders"), {
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
    });
  } catch (err) {
    showError("Gagal menyimpan order. Coba lagi 🙏");
    console.error(err);
    return;
  }

  /* ===============================
     WHATSAPP MESSAGE
  ================================ */
  const pesan = `
Halo, saya mau pesan hampers 🎁

Nama: ${name}
Alamat: ${address}
No WhatsApp: ${phone}

Produk: ${selectedProduct.title}
Harga: ${selectedProduct.price}

Isi Produk:
${selectedProduct.desc}

Custom:
${customItems.join(", ") || "-"}

Catatan:
${note || "-"}

Mohon info ketersediaan & total harga 🙏
`;

  window.open(
    "https://wa.me/62895339847320?text=" +
      encodeURIComponent(pesan),
    "_blank"
  );

  closeModal();
};

/* ===============================
   UI HELPERS
================================ */
function showError(message) {
  formError.innerText = message;
  formError.style.display = "block";
}

function hideError() {
  if (formError) formError.style.display = "none";
}

function resetForm() {
  document
    .querySelectorAll('#modal input[type="checkbox"]')
    .forEach(c => (c.checked = false));

  buyerName.value = "";
  buyerAddress.value = "";
  buyerPhone.value = "";
  customText.value = "";
}

// auto hide error saat input
document.addEventListener("input", hideError);
