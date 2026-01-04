function orderProduct(name, price) {
  const phone = "62895339847320"; // GANTI DENGAN NOMOR KAMU

  const message =
    `Halo kak 👋%0A%0A` +
    `Saya ingin pesan:%0A` +
    `📦 *${name}*%0A` +
    `💰 Rp ${price.toLocaleString("id-ID")}%0A%0A` +
    `Mohon info selanjutnya 🙏`;

  const url = `https://wa.me/${phone}?text=${message}`;
  window.open(url, "_blank");
}
