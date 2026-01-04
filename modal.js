let selectedProduct = null;

/* ================= REKOMENDASI ISI ================= */
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

/* ================= MODAL CONTROL ================= */
function openModal(id) {
  selectedProduct = PRODUCTS.find(p => p.id === id);
  document.getElementById("orderModal").style.display = "flex";
  renderCustom();
}

function closeModal() {
  document.getElementById("orderModal").style.display = "none";
}

/* ================= CUSTOM HAMPERS ================= */
function renderCustom() {
  const type = document.querySelector("input[name=type]:checked").value;
  const area = document.getElementById("customArea");

  if (type !== "custom") {
    area.innerHTML = "";
    return;
  }

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

/* ================= WHATSAPP ================= */
function sendWA() {
  const name = document.getElementById("buyerName").value;
  const address = document.getElementById("buyerAddress").value;
  const qty = document.getElementById("qty").value;
  const type = document.querySelector("input[name=type]:checked").value;

  let items = selectedProduct.items;

  if (type === "custom") {
    items = [...document.querySelectorAll("#customArea input:checked")]
      .map(i => i.value);
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

