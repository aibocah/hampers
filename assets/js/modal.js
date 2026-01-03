
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

  document.getElementById("customSection").style.display =
    custom ? "block" : "none";

  resetForm();
  hideError();

  document.getElementById("modal").style.display = "flex";

  launchConfetti();
}

/* ===============================
   CLOSE MODAL
================================ */
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

/* ===============================
   ORDER VIA WHATSAPP + SAVE
================================ */
function orderFromModal() {
  hideError();

  const name = buyerName.value.trim();
  const address = buyerAddress.value.trim();
  const phone = buyerPhone.value.trim();
  const customText = document.getElementById("customText").value.trim();

  if (!name || !address || !phone) {
    showError("Mohon lengkapi nama, alamat, dan nomor WhatsApp 🙏");
    return;
  }

  let isi = [];
  if (isCustomProduct) {
    document
      .querySelectorAll('#modal input[type="checkbox"]:checked')
      .forEach(c => isi.push(c.value));
  }

  if (isCustomProduct && isi.length === 0 && customText === "") {
    showError("Untuk hampers custom, mohon isi minimal satu pilihan isian ✨");
    return;
  }

  /* ===============================
     SIMPAN ORDER (ADMIN)
  ================================ */
  const order = {
    id: Date.now(),
    date: new Date().toLocaleString("id-ID"),
    product: selectedProduct.title,
    price: selectedProduct.price,
    desc: selectedProduct.desc,
    customItems: isi.join(", ") || "-",
    note: customText || "-",
    name,
    address,
    phone
  };

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  /* ===============================
     WHATSAPP MESSAGE
  ================================ */
  const pesan = `
Halo, saya mau pesan hampers 🎁

Nama: ${name}
Alamat: ${address}
No WhatsApp: ${phone}

Produk: ${order.product}
Harga: ${order.price}

Isi Produk:
${order.desc}

Custom Isian:
${order.customItems}

Catatan:
${order.note}

Mohon info ketersediaan & total harga 🙏
`;

  window.open(
    "https://wa.me/62895339847320?text=" +
      encodeURIComponent(pesan),
    "_blank"
  );

  closeModal();
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

  customText.value = "";
  buyerName.value = "";
  buyerAddress.value = "";
  buyerPhone.value = "";
}

document.addEventListener("input", hideError);

/* ===============================
   CONFETTI 🎇
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
