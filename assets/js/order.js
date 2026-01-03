function orderFromModal() {
  if (!selectedProduct) return;

  const name = document.getElementById("buyerName").value.trim();
  const address = document.getElementById("buyerAddress").value.trim();
  const phone = document.getElementById("buyerPhone").value.trim();

  const error = document.getElementById("formError");
  error.innerText = "";
  error.style.display = "none";

  if (!name || !address || !phone) {
    error.innerText = "⚠️ Lengkapi semua data";
    error.style.display = "block";
    return;
  }

  const message = `
*PESAN HAMPERS LEBARAN*
----------------------
*Produk:* ${selectedProduct.name}
*Harga:* Rp ${Number(selectedProduct.price).toLocaleString("id-ID")}

*Nama:* ${name}
*Alamat:* ${address}
*No HP:* ${phone}
  `;

  const whatsappNumber = "62895339847320"; // GANTI NOMOR KAMU
  const url =
    "https://wa.me/" +
    whatsappNumber +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank");
}
