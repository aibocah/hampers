let selectedProduct = {};

function openProduct(title, price, desc){
  selectedProduct = { title, price };

  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalPrice").innerText = price;
  document.getElementById("modalDesc").innerText = desc;

  document.getElementById("modal").style.display = "flex";
}

function closeModal(){
  document.getElementById("modal").style.display = "none";
}

function orderFromModal(){
  let isi = [];
  document.querySelectorAll('#modal input[type=checkbox]:checked')
    .forEach(c => isi.push(c.value));

  let custom = document.getElementById("customText").value;

  let pesan =
`Halo, saya mau pesan hampers:

Produk: ${selectedProduct.title}
Harga: ${selectedProduct.price}

Custom Isian:
${isi.join(", ") || "-"}

Catatan:
${custom || "-"}

Mohon info total harga & ketersediaan.`;

  window.open(
    "https://wa.me/62895339847320?text=" + encodeURIComponent(pesan),
    "_blank"
  );
}
