function openModal(title, price, desc){
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalPrice").innerText = price;
  document.getElementById("modalDesc").innerText = desc;
  document.getElementById("modal").style.display = "flex";
}

function closeModal(){
  document.getElementById("modal").style.display = "none";
}

function orderWA(){
  let text = "Halo, saya tertarik memesan hampers. Mohon info detail & harga custom.";
  window.open(
    "https://wa.me/62895339847320?text=" + encodeURIComponent(text),
    "_blank"
  );
}
