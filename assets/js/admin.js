const ADMIN_USER = "admin";
const ADMIN_PASS = "12345";

let products = JSON.parse(localStorage.getItem("products")) || [];

/* ================= LOGIN ================= */
function login() {
  const u = username.value;
  const p = password.value;

  if (u === ADMIN_USER && p === ADMIN_PASS) {
    localStorage.setItem("adminLogin", "1");
    showAdmin();
  } else {
    alert("Login salah");
  }
}

function logout() {
  localStorage.removeItem("adminLogin");
  location.reload();
}

function showAdmin() {
  loginBox.classList.add("hidden");
  adminPanel.classList.remove("hidden");
  renderProducts();
}

if (localStorage.getItem("adminLogin")) showAdmin();

/* ================= IMAGE ================= */
function toBase64(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

/* ================= SAVE ================= */
async function saveProduct() {
  const id = productId.value;
  const name = document.getElementById("name").value.trim();
  const price = Number(document.getElementById("price").value);
  const description = document.getElementById("description").value.trim();
  const files = image.files;

  if (!name || !price || !description) {
    alert("Lengkapi data produk");
    return;
  }

  let images = [];

  if (files.length > 0) {
    for (const file of files) {
      images.push(await toBase64(file));
    }
  }

  if (id) {
    const i = products.findIndex(p => p.id == id);
    products[i] = {
      ...products[i],
      name,
      price,
      description,
      images: images.length ? images : products[i].images
    };
  } else {
    products.push({
      id: Date.now(),
      name,
      price,
      description,
      images
    });
  }

  localStorage.setItem("products", JSON.stringify(products));
  resetForm();
  renderProducts();
}


/* ================= RENDER ================= */
function renderProducts() {
  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML = "<p>Belum ada produk</p>";
    return;
  }

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <div>
        <b>${p.name}</b><br>
        Rp ${p.price.toLocaleString("id-ID")}<br>
        <small>${p.description}</small>
      </div>
      <div>
        <img src="${p.image}" style="max-width:80px"><br>
        <button onclick="editProduct(${p.id})">Edit</button>
        <button onclick="deleteProduct(${p.id})" style="background:red">Hapus</button>
      </div>
    `;

    productList.appendChild(div);
  });
}

/* ================= EDIT ================= */
function editProduct(id) {
  const p = products.find(p => p.id === id);
  productId.value = p.id;
  name.value = p.name;
  price.value = p.price;
  description.value = p.description;
}

/* ================= DELETE ================= */
function deleteProduct(id) {
  if (!confirm("Hapus produk ini?")) return;
  products = products.filter(p => p.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

/* ================= UTIL ================= */
function resetForm() {
  productId.value = "";
  name.value = "";
  price.value = "";
  description.value = "";
  image.value = "";
}

/* ================= EXPORT ================= */
function exportJSON() {
  const blob = new Blob(
    [JSON.stringify(products, null, 2)],
    { type: "application/json" }
  );

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "products.json";
  a.click();
}

