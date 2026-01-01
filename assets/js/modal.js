let selectedProduct = {};
let isCustomProduct = false;

function openProduct(title, price, desc, custom){
  selectedProduct = { title, price, desc };
  isCustomProduct = custom;

  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalPrice").innerText = price;
  document.getElementById("modalDesc").innerText = desc;

  document.getElementById("customSection").style.display =
    custom ? "block" : "none";

  // reset input
  document.querySelectorAll('#modal input[type=checkbox]').forEach(c => c.checked = false);
  document.getElementById("customText").value = "";
  document.getElementById("buyerName").value = "";
  document.getElementById("buyerAddress").value = "";
  document.getElementById("buyerPhone").value = "";

  document.getElementById("modal").style.display = "flex";
}

function closeModal(){
  document.getElementById("modal").style.display = "none";
}

function orderFromModal() {
  const errorBox = document.getElementById("formError");
  errorBox.style.display = "none";
  errorBox.innerText = "";

  let name = document.getElementById("buyerName").value.trim();
  let address = document.getElementById("buyerAddress").value.trim();
  let phone = document.getElementById("buyerPhone").value.trim();

  if (!name || !address || !phone) {
    showError("Mohon lengkapi nama, alamat, dan nomor WhatsApp");
    return;
  }

  let isi = [];
  if (isCustomProduct) {
    document.querySelectorAll('#modal input[type=checkbox]:checked')
      .forEach(c => isi.push(c.value));
  }

  let customText = document.getElementById("customText").value.trim();

  // 🔒 VALIDASI CUSTOM
  if (isCustomProduct && isi.length === 0 && customText === "") {
    showError("Untuk hampers custom, mohon isi minimal satu pilihan custom");
    return;
  }

  let pesan =
`Halo, saya mau pesan hampers:

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

Apakah masih tersedia ?.`;

  window.open(
    "https://wa.me/62895339847320?text=" + encodeURIComponent(pesan),
    "_blank"
  );
}

function showError(msg) {
  const errorBox = document.getElementById("formError");
  errorBox.innerText = msg;
  errorBox.style.display = "block";
}
