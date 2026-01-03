/* ==================================================
   ORDER.JS — FINAL (RENDER PRODUK DARI FIRESTORE)
================================================== */

import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ===============================
   ELEMENT
================================ */
const productList = document.getElementById("productList");

/* modal */
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
   LOAD PRODUCTS
   👉 DIPANGGIL OTOMATIS SAAT FILE DIBUKA
================================ */
async function loadProducts() {
  productList.innerHTML = "⏳ Memuat produk...";

  try {
    const snapshot = await getDocs(collection(db, "products"));
    productList.innerHTML = "";

    if (snapshot.empty) {
      productList.innerHTML = "❌ Belum ada produk";
      return;
    }

    snapshot.forEach(docSnap => {
      const p = docSnap.data();

      const card = document.createElement("div");
      card.className = "card product-card";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p class="price">
          Rp ${Number(p.price).toLocaleString("id-ID")}
        </p>
      `;

      card.onclick = () => openProduct({
        ...p,
        custom: p.custom || false
      });

      productList.appendChild(card);
    });
  } catch (err) {
    productList.innerHTML = "❌ Gagal load produk";
    console.error(err);
  }
}

/* AUTO LOAD */
loadProducts();

/* ===============================
   OPEN MODAL
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
    showError("Nama, alamat, dan WhatsApp wajib diisi 🙏");
    return;
  }

  const orderData = {
    name,
    address,
    phone,
    product: selectedProduct.title,
    price: Number(selectedProduct.price),
    desc: selectedProduct.desc || "-",
    note: note || "-",
    status: "baru",
    createdAt: serverTimestamp()
  };

  await addDoc(collection(db, "orders"), orderData);

  /* ===============================
     WHATSAPP
  ================================ */
  const message = `
Halo, saya mau pesan hampers 🎁

Nama: ${name}
Alamat: ${address}
No WA: ${phone}

Produk: ${orderData.product}
Harga: Rp ${orderData.price.toLocaleString("id-ID")}

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
}
