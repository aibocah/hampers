/* ==================================================
   ORDER.JS — FINAL (RENDER PRODUK AKTIF DARI ADMIN)
================================================== */

import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ELEMENT */
const productList = document.getElementById("productList");

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

let selectedProduct = null;

/* ===============================
   LOAD PRODUK AKTIF
================================ */
async function loadProducts() {
  productList.innerHTML = "⏳ Memuat produk...";

  const q = query(
    collection(db, "products"),
    where("active", "==", true)
  );

  const snapshot = await getDocs(q);
  productList.innerHTML = "";

  if (snapshot.empty) {
    productList.innerHTML = "❌ Belum ada produk aktif";
    return;
  }

  snapshot.forEach(docSnap => {
    const p = docSnap.data();

    const card = document.createElement("div");
    card.className = "card product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p class="price">Rp ${Number(p.price).toLocaleString("id-ID")}</p>
    `;

    card.onclick = () => openProduct(p);
    productList.appendChild(card);
  });
}

loadProducts();

/* ===============================
   MODAL
================================ */
window.openProduct = function (product) {
  selectedProduct = product;

  modalTitle.textContent = product.title;
  modalPrice.textContent =
    "Rp " + Number(product.price).toLocaleString("id-ID");
  modalDesc.textContent = product.desc || "";

  customSection.style.display = product.custom ? "block" : "none";

  resetForm();
  hideError();
  modal.style.display = "flex";
};

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
    showError("Nama, alamat, dan WhatsApp wajib diisi 🙏");
    return;
  }

  let customItems = [];
  if (selectedProduct.custom) {
    document
      .querySelectorAll('#modal input[type="checkbox"]:checked')
      .forEach(el => customItems.push(el.value));

    if (customItems.length === 0 && !note) {
      showError("Pilih minimal 1 isian custom ✨");
      return;
    }
  }

  await addDoc(collection(db, "orders"), {
    name,
    address,
    phone,
    product: selectedProduct.title,
    price: Number(selectedProduct.price),
    desc: selectedProduct.desc || "-",
    customItems,
    note: note || "-",
    status: "baru",
    createdAt: serverTimestamp()
  });

  const message = `
Halo, saya mau pesan hampers 🎁

Nama: ${name}
Alamat: ${address}
No WA: ${phone}

Produk: ${selectedProduct.title}
Harga: Rp ${Number(selectedProduct.price).toLocaleString("id-ID")}

Custom:
${customItems.join(", ") || "-"}

Catatan:
${note || "-"}
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
  formError.style.display = "none";
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
