let selectedProduct = null;

/* ===== REKOMENDASI KHUSUS CUSTOM ===== */
const REKOMENDASI = [
  "Sirup Marjan",
  "Kurma Tunisia",
  "Biskuit Kaleng",
  "Nastar Premium",
  "Kastengel",
  "Coklat Silverqueen",
  "Teh Premium",
  "Kopi Sachet",
  "Gula Aren",
  "Madu",
  "Sari Kurma"
];

/* ===== MODAL ===== */
function openModal(id) {
  selectedProduct = PRODUCTS.find(p => p.id === id);
  document.getElementById("orderModal").style.display = "flex";
  renderCustom();
}

function closeModal() {
  document.getElementById("orderModal").style.display = "none";
}

/* ===== CUSTOM LOGIC ===== */
function renderCustom() {
  const type = document.querySelector("input[name=type]:checked").value;
  const area = document.getElementById("customArea");

  // JIKA BUKAN CUSTOM → KOSONGKAN
  if (type !== "custom") {
    area.innerHTML = "";
    return;
  }

  // JIKA CUSTOM → TAMPILKAN ISI + REKOMENDASI
  area.innerHTML = `
    <h4>Pilih Isi Hampers</h4>
    ${selectedProduct.items.map(item => `
      <label>
        <input type="checkbox" value="${item}"> ${item}
      </label>
    `).join("")}

    <h4>Rekomendasi (Opsional)</h4>
    ${REKOMENDASI.map(item => `
      <label>
        <input type="checkbox" value="${item}"> ${item}
      </label>
    `).join("")}
  `;
}

/* ===== VALIDASI + WHATSAPP ===== */
function sendWA() {
  const name = document.getElementById("buyerName").value.trim();
  const address = document.getElementById("buyerAddress").value.trim();
  const qty = document.getElementById("qty").value;
  const type = document.querySelector("input[name=type]:checked").value;

  // ===== VALIDASI FORM =====
  if (!name) {
    alert("Nama wajib diisi");
    return;
  }

  if (!address) {
    alert("Alamat wajib diisi");
    return;
  }

  if (!qty || qty < 1) {
    alert("Jumlah minimal 1");
    return;
  }

  let items = selectedProduct.items;

  if (type === "custom") {
    items = [...document.querySelectorAll("#customArea input:checked")]
      .map(i => i.value);

    if (items.length === 0) {
      alert("Pilih minimal 1 isi hampers untuk custom");
      return;
    }
  }

  const msg = `
🛍️ *PESANAN HAMPERS LEBARAN*

📦 Produk: ${selectedProduct.name}
🔢 Jumlah: ${qty}

🎁 Isi Hampers:
- ${items.join("\n- ")}

👤 Nama: ${name}
📍 Alamat:
${address}

Terima kasih 🙏
`;

  const wa = `https://wa.me/62895339847320?text=${encodeURIComponent(msg)}`;
  window.open(wa);
}

