import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let selectedProduct = {};
let isCustomProduct = false;

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

window.orderFromModal = async function () {
  hideError();

  const name = buyerName.value.trim();
  const address = buyerAddress.value.trim();
  const phone = buyerPhone.value.trim();
  const note = customText.value.trim();

  if (!name || !address || !phone) {
    showError("Mohon lengkapi data pembeli 🙏");
    return;
  }

  let customItems = [];
  if (isCustomProduct) {
    document
      .querySelectorAll('#modal input[type="checkbox"]:checked')
      .forEach(c => customItems.push(c.value));
  }

  if (isCustomProduct && customItems.length === 0 && !note) {
    showError("Isi minimal 1 pilihan untuk hampers custom ✨");
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

  await addDoc(collection(db, "orders"), orderData);

  /* ===============================
     WHATSAPP
  ================================ */
  const pesan = `
Halo, saya mau pesan hampers 🎁

Nama: ${name}
Alamat: ${address}
No WA: ${phone}

Produk: ${orderData.product}
Harga: ${orderData.price}

Custom:
${customItems.join(", ") || "-"}

Catatan:
${note || "-"}
`;

  window.open(
    "https://wa.me/62895339847320?text=" + encodeURIComponent(pesan),
    "_blank"
  );

  closeModal();
};
