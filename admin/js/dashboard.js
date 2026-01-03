/* ==================================================
   ADMIN DASHBOARD — FINAL VERSION (PRODUCTION READY)
   ================================================== */

import { db } from "./firebase.js";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ===============================
   ELEMENT
================================ */
const orderList = document.getElementById("orderList");
const totalOrderEl = document.getElementById("totalOrder");
const totalOmzetEl = document.getElementById("totalOmzet");

const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");

const titleInput = document.getElementById("title");
const priceInput = document.getElementById("price");
const descInput = document.getElementById("desc");
const imageInput = document.getElementById("image");

/* ===============================
   ORDER SECTION
================================ */
const orderQuery = query(
  collection(db, "orders"),
  orderBy("createdAt", "desc")
);

onSnapshot(orderQuery, snapshot => {
  orderList.innerHTML = "";

  let totalOrder = snapshot.size;
  let totalOmzet = 0;

  snapshot.forEach(docSnap => {
    const o = docSnap.data();
    const priceNumber = Number(o.price) || 0;
    totalOmzet += priceNumber;

    orderList.innerHTML += `
      <tr>
        <td>${o.name}</td>
        <td>${o.product}</td>
        <td>Rp ${priceNumber.toLocaleString("id-ID")}</td>
        <td>${o.phone}</td>
        <td>
          <select onchange="updateStatus('${docSnap.id}', this.value)">
            <option value="baru" ${o.status === "baru" ? "selected" : ""}>Baru</option>
            <option value="diproses" ${o.status === "diproses" ? "selected" : ""}>Diproses</option>
            <option value="selesai" ${o.status === "selesai" ? "selected" : ""}>Selesai</option>
            <option value="batal" ${o.status === "batal" ? "selected" : ""}>Batal</option>
          </select>
        </td>
      </tr>
    `;
  });

  totalOrderEl.textContent = totalOrder;
  totalOmzetEl.textContent =
    "Rp " + totalOmzet.toLocaleString("id-ID");
});

/* UPDATE STATUS ORDER */
window.updateStatus = async (id, status) => {
  try {
    await updateDoc(doc(db, "orders", id), { status });
  } catch (err) {
    alert("Gagal update status");
    console.error(err);
  }
};

/* ===============================
   PRODUCT SECTION
================================ */

/* TAMBAH PRODUK */
productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "products"), {
      title: titleInput.value,
      price: Number(priceInput.value),
      desc: descInput.value,
      image: imageInput.value,
      active: true,
      custom: false,
      createdAt: serverTimestamp()
    });

    productForm.reset();
    loadProducts();
    alert("Produk berhasil ditambahkan 🤍");

  } catch (err) {
    alert("Gagal menambahkan produk");
    console.error(err);
  }
});

/* LOAD PRODUK */
async function loadProducts() {
  productList.innerHTML = "⏳ Loading produk...";

  const snapshot = await getDocs(collection(db, "products"));
  productList.innerHTML = "";

  snapshot.forEach(docSnap => {
    const p = docSnap.data();
    const id = docSnap.id;

    productList.innerHTML += `
      <div class="product-item">
        <img src="${p.image}" alt="${p.title}">

        <input id="title-${id}" value="${p.title}">
        <input id="price-${id}" type="number" value="${p.price}">
        <textarea id="desc-${id}">${p.desc || ""}</textarea>
        <input id="image-${id}" value="${p.image}">

        <div style="display:flex;gap:8px;margin:6px 0">
          <label>
            <input type="checkbox"
              ${p.active ? "checked" : ""}
              onchange="toggleActive('${id}', this.checked)">
            Aktif
          </label>

          <label>
            <input type="checkbox"
              ${p.custom ? "checked" : ""}
              onchange="toggleCustom('${id}', this.checked)">
            Custom
          </label>
        </div>

        <div style="display:flex;gap:8px">
          <button onclick="updateProduct('${id}')">💾 Update</button>
          <button class="danger" onclick="deleteProduct('${id}')">🗑️ Hapus</button>
        </div>
      </div>
    `;
  });
}

/* UPDATE PRODUK */
window.updateProduct = async (id) => {
  try {
    await updateDoc(doc(db, "products", id), {
      title: document.getElementById(`title-${id}`).value,
      price: Number(document.getElementById(`price-${id}`).value),
      desc: document.getElementById(`desc-${id}`).value,
      image: document.getElementById(`image-${id}`).value
    });

    alert("Produk berhasil diupdate ✨");

  } catch (err) {
    alert("Gagal update produk");
    console.error(err);
  }
};

/* TOGGLE AKTIF */
window.toggleActive = async (id, value) => {
  await updateDoc(doc(db, "products", id), { active: value });
};

/* TOGGLE CUSTOM */
window.toggleCustom = async (id, value) => {
  await updateDoc(doc(db, "products", id), { custom: value });
};

/* HAPUS PRODUK */
window.deleteProduct = async (id) => {
  if (!confirm("Yakin hapus produk ini?")) return;

  try {
    await deleteDoc(doc(db, "products", id));
    loadProducts();
    alert("Produk berhasil dihapus 🗑️");

  } catch (err) {
    alert("Gagal hapus produk");
    console.error(err);
  }
};

/* INIT */
loadProducts();

