async function loadProducts() {
  productList.innerHTML = "⏳ Memuat produk...";

  const q = query(
    collection(db, "products"),
    where("active", "==", true)
  );

  const snapshot = await getDocs(q);
  productList.innerHTML = "";

  if (snapshot.empty) {
    productList.innerHTML = "❌ Belum ada produk aktif";
    return;
  }

  snapshot.forEach(docSnap => {
    const p = docSnap.data();

    const card = document.createElement("div");
    card.className = "card product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p class="price">
        Rp ${Number(p.price).toLocaleString("id-ID")}
      </p>
    `;

    card.onclick = () => openProduct({
      ...p,
      custom: p.custom || false
    });

    productList.appendChild(card);
  });
}
