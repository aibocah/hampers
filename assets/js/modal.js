let selectedProduct = {};
let isCustomProduct = false;

/* ===============================
   OPEN MODAL
================================ */
function openProduct(title, price, desc, custom) {
  selectedProduct = { title, price, desc };
  isCustomProduct = custom;

  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalPrice").innerText = price;
  document.getElementById("modalDesc").innerText = desc;

  // tampilkan custom hanya jika produk custom
  document.getElementById("customSection").style.display =
    custom ? "block" : "none";

  resetForm();
  hideError();

  document.getElementById("modal").style.display = "flex";

  // 🎇 confetti halus
  launchConfetti();
}

/* ===============================
   CLOSE MODAL
================================ */
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

/* ===============================
   ORDER VIA WHATSAPP
================================ */
function orderFromModal() {
  hideError();

  const name = document.getElementById("buyerName").value.trim();
  const address = document.getElementById("buyerAddress").value.trim();
  const phone = document.getElementById("buyerPhone").value.trim();
  const customText = document.getElementById("customText").value.trim();

  // validasi data pembeli
  if (!name || !address || !phone) {
    showError("Mohon lengkapi nama, alamat, dan nomor WhatsApp 🙏");
    return;
  }

  // ambil isian custom
  let isi = [];
  if (isCustomProduct) {
    document
      .querySelectorAll('#modal input[type="checkbox"]:checked')
      .forEach(c => isi.push(c.value));
  }

  // validasi wajib custom
  if (isCustomProduct && isi.length === 0 && customText === "") {
    showError("Untuk hampers custom, mohon isi minimal satu pilihan isian ✨");
    return;
  }

  const pesan = `
Halo, saya mau pesan hampers 🎁

Nama: ${name}
Alamat: ${address}
No WhatsApp: ${phone}

Produk: ${selectedProduct.title}
Harga: ${selectedProduct.price}

Isi Produk:
${selectedProduct.desc}

Custom Isian:
${isi.join(", ") || "-"}

Catatan Tambahan:
${customText || "-"}

Mohon info ketersediaan & total harga 🙏
`;

  window.open(
    "https://wa.me/62895339847320?text=" + encodeURIComponent(pesan),
    "_blank"
  );
}

/* ===============================
   UI HELPER
================================ */
function showError(message) {
  const box = document.getElementById("formError");
  box.innerText = message;
  box.style.display = "block";
}

function hideError() {
  const box = document.getElementById("formError");
  if (box) box.style.display = "none";
}

function resetForm() {
  document
    .querySelectorAll('#modal input[type="checkbox"]')
    .forEach(c => (c.checked = false));

  document.getElementById("customText").value = "";
  document.getElementById("buyerName").value = "";
  document.getElementById("buyerAddress").value = "";
  document.getElementById("buyerPhone").value = "";
}

// sembunyikan error saat user mulai mengetik
document.addEventListener("input", hideError);

/* ===============================
   CONFETTI LEBARAN 🎇
================================ */
function launchConfetti() {
  for (let i = 0; i < 20; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";

    const colors = ["#f5c46c", "#25D366", "#0b7a3e", "#ffffff"];
    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.animationDuration =
      0.8 + Math.random() * 0.7 + "s";

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 1600);
  }
}
