let selectedProduct = {};

function openProduct(title, price, desc, isCustom){
  selectedProduct = { title, price, isCustom };

  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalPrice").innerText = price;
  document.getElementById("modalDesc").innerText = desc;

  // tampilkan / sembunyikan custom
  document.getElementById("customSection").style.display =
    isCustom ? "block" : "none";

  // reset input
  document.querySelectorAll('#customSection input').forEach(i => i.checked = false);
  let txt = document.getElementById("customText");
  if(txt) txt.value = "";

  document.getElementById("modal").style.display = "flex";
}

function closeModal(){
  document.getElementById("modal").style.display = "none";
}

function orderFromModal(){
  let isi = [];
  let custom = "";

  if(selectedProduct.isCustom){
    document.querySelectorAll('#customSection input:checked')
      .forEach(c => isi.push(c.value));

    custom = document.getElementById("customText").value;
  }

  let pesan =
`Halo, saya mau pesan hampers:

Produk: ${selectedProduct.title}
Harga: ${selectedProduct.price}

${selectedProduct.isCustom ? 
`Custom Isian:
${isi.join(", ") || "-"}
Catatan:
${custom || "-"}` 
: "Isi sesuai paket"}

Mohon info total harga & ketersediaan.`;

  window.open(
    "https://wa.me/62895339847320?text=" + encodeURIComponent(pesan),
    "_blank"
  );
}
