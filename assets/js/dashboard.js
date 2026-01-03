/* ==================================================
   ADMIN DASHBOARD — FINAL VERSION
   ================================================== */

import { db } from "../assets/js/firebase.js";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ===============================
   ELEMENT
================================ */
const orderList = document.getElementById("orderList");
const totalOrderEl = document.getElementById("totalOrder");
const totalOmzetEl = document.getElementById("totalOmzet");

/* ===============================
   REALTIME LISTENER
================================ */
const q = query(
  collection(db, "orders"),
  orderBy("createdAt", "desc")
);

onSnapshot(q, snapshot => {
  orderList.innerHTML = "";

  let totalOrder = snapshot.size;
  let totalOmzet = 0;

  snapshot.forEach(docSnap => {
    const o = docSnap.data();

    // hitung omzet (ambil angka saja)
    const priceNumber = parseInt(
      (o.price || "0").replace(/\D/g, "")
    );
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
  totalOmzetEl.textContent =
    "Rp " + totalOmzet.toLocaleString("id-ID");
});

/* ===============================
   UPDATE STATUS
================================ */
window.updateStatus = async function (id, status) {
  try {
    await updateDoc(doc(db, "orders", id), { status });
  } catch (err) {
    console.error("Gagal update status:", err);
    alert("Gagal update status");
  }
};
