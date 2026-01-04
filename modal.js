let selectedProduct = null;

function openModal(id) {
  selectedProduct = PRODUCTS.find(p => p.id === id);
  document.getElementById("orderModal").style.display = "flex";
  renderCustom();
}

function closeModal() {
  orderModal.style.display = "none";
}

function renderCustom() 
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
];{
  const type = document.querySelector("input[name=type]:checked").value;
  const area = document.getElementById("customArea");

  if (type !== "custom") {
    area.innerHTML = "";
    return;
  }
  area.innerHTML = `
    <h4>Pilih Isi Hampers</h4>
    ${selectedProduct.items.map(i =>
      `<label><input type="checkbox" value="${i}"> ${i}</label>`
    ).join("")}

    <h4>Rekomendasi</h4>
    ${selectedProduct.recommendations.map(i =>
      `<label><input type="checkbox" value="${i}"> ${i}</label>`
    ).join("")}
  `;
}

function sendWA() {
  const name = buyerName.value;
  const address = buyerAddress.value;
  const qty = document.getElementById("qty").value;

  let items = selectedProduct.items;
  if (document.querySelector("input[name=type]:checked").value === "custom") {
    items = [...document.querySelectorAll("#customArea input:checked")].map(i => i.value);
  }

  const msg = `PESANAN HAMPERS
Nama: ${name}
Alamat: ${address}
Jumlah: ${qty}
Produk: ${selectedProduct.name}
Isi:
- ${items.join("\n- ")}`;

  window.open(`https://wa.me/62895339847320?text=${encodeURIComponent(msg)}`);
}
