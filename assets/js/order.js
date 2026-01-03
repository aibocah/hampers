/* ==================================================
   ORDER.JS — FINAL (WHATSAPP)
================================================== */

const buyerName = document.getElementById("buyerName");
const buyerAddress = document.getElementById("buyerAddress");
const buyerPhone = document.getElementById("buyerPhone");
const customText = document.getElementById("customText");
const formError = document.getElementById("formError");

function orderFromModal() {
  formError.style.display = "none";

  const name = buyerName.value.trim();
  const address = buyerAddress.value.trim();
  const phone = buyerPhone.value.trim();
  const note = customText.value.trim();
  const product = window.selectedProduct;

  if (!name || !phone) {
    formError.textContent = "Nama & WhatsApp wajib diisi 🙏";
    formError.style.display = "block";
    return;
  }

  let customItems = [];
  if (product.custom) {
    document
      .querySelectorAll('#modal input[type="checkbox"]:checked')
      .forEach(el => customItems.push(el.value));

    if (!customItems.length && !note) {
      formError.textContent = "Pilih minimal 1 isian custom ✨";
      formError.style.display = "block";
      return;
    }
  }

  const message = `
Halo, saya mau pesan hampers 🎁

Nama: ${name}
Alamat: ${address || "-"}
No WhatsApp: ${phone}

Produk: ${product.title}
Harga: ${
    product.price
      ? "Rp " + product.price.toLocaleString("id-ID")
      : "Menyesuaikan"
  }

Isi:
${product.desc || "-"}

Custom:
${customItems.join(", ") || "-"}

Catatan:
${note || "-"}
`;

  window.open(
    "https://wa.me/62895339847320?text=" +
      encodeURIComponent(message),
    "_blank"
  );

  closeModal();
}

