/* ==================================================
   ADMIN DASHBOARD — FINAL VERSION
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

/* ELEMENT */
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
   ORDER
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
    const priceNumber = parseInt((o.price || "0").replace(/\D/g, ""));
    totalOmzet += priceNumber;

    orderList.innerHTML += `
      <tr>
        <td>${o.name}</td>
        <td>${o.product}</td>
        <td>${o.price}</td>
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
  totalOmzetEl.textContent = "Rp " + totalOmzet.toLocaleString("id-ID");
});

window.updateStatus = async (id, status) => {
  await updateDoc(doc(db, "orders", id), { status });
};

/* ===============================
   PRODUK
================================ */
productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  await addDoc(collection(db, "products"), {
    title: titleInput.value,
    price: Number(priceInput.value),
    desc: descInput.value,
    image: imageInput.value,
    active: true,
    createdAt: serverTimestamp()
  });

  productForm.reset();
  loadProducts();
  alert("Produk berhasil ditambahkan 🤍");
});

async function loadProducts() {
  productList.innerHTML = "⏳ Loading produk...";
  const snapshot = await getDocs(collection(db, "products"));
  productList.innerHTML = "";

  snapshot.forEach(docSnap => {
    const p = docSnap.data();
    const id = docSnap.id;

    productList.innerHTML += `
      <div class="product-item">
        <img src="${p.image}">
        <input value="${p.title}" id="title-${id}">
        <input type="number" value="${p.price}" id="price-${id}">
        <textarea id="desc-${id}">${p.desc || ""}</textarea>
        <input value="${p.image}" id="image-${id}">

        <div style="display:flex;gap:8px;margin-top:8px">
          <button onclick="updateProduct('${id}')">💾 Update</button>
          <button class="danger" onclick="deleteProduct('${id}')">🗑️ Hapus</button>
        </div>
      </div>
    `;
  });
}

window.updateProduct = async (id) => {
  await updateDoc(doc(db, "products", id), {
    title: document.getElementById(`title-${id}`).value,
    price: Number(document.getElementById(`price-${id}`).value),
    desc: document.getElementById(`desc-${id}`).value,
    image: document.getElementById(`image-${id}`).value
  });

  alert("Produk berhasil diupdate ✨");
};

window.deleteProduct = async (id) => {
  if (!confirm("Yakin hapus produk ini?")) return;
  await deleteDoc(doc(db, "products", id));
  loadProducts();
};

loadProducts();

