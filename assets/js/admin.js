/* ==================================================
   ADMIN EDITOR (LOCALSTORAGE)
================================================== */

const form = document.getElementById("productForm");
const list = document.getElementById("productList");

/* ===============================
   LOAD & SAVE
================================ */
function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(data) {
  localStorage.setItem("products", JSON.stringify(data));
}

/* ===============================
   RENDER
================================ */
function renderProducts() {
  const products = getProducts();
  list.innerHTML = "";

  if (products.length === 0) {
    list.innerHTML = "<p>Belum ada produk</p>";
    return;
  }

  products.forEach((p, i) => {
    list.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <input value="${p.title}" onchange="update(${i}, 'title', this.value)">
        <input type="number" value="${p.price || ''}" onchange="update(${i}, 'price', this.value)">
        <textarea onchange="update(${i}, 'desc', this.value)">${p.desc}</textarea>
        <input value="${p.image}" onchange="update(${i}, 'image', this.value)">
        
        <label>
          <input type="checkbox" ${p.custom ? "checked" : ""} 
          onchange="update(${i}, 'custom', this.checked)">
          Custom
        </label>

        <button onclick="remove(${i})" style="background:#dc2626">Hapus</button>
      </div>
    `;
  });
}

/* ===============================
   CRUD
================================ */
form.onsubmit = e => {
  e.preventDefault();

  const products = getProducts();
  products.push({
    title: title.value,
    price: price.value ? Number(price.value) : null,
    desc: desc.value,
    image: image.value,
    custom: custom.checked
  });

  saveProducts(products);
  form.reset();
  renderProducts();
};

window.update = (i, key, val) => {
  const products = getProducts();
  products[i][key] = key === "price" && val ? Number(val) : val;
  saveProducts(products);
};

window.remove = i => {
  if (!confirm("Hapus produk?")) return;
  const products = getProducts();
  products.splice(i, 1);
  saveProducts(products);
  renderProducts();
};

renderProducts();
