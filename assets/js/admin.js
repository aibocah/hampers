const ADMIN_USER = "septi";
const ADMIN_PASS = "cintaneanwar";

// Ambil elemen-elemen DOM
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBox = document.getElementById("loginBox");
const adminPanel = document.getElementById("adminPanel");
const productListEl = document.getElementById("productList");
const productIdField = document.getElementById("productId");
const nameField = document.getElementById("name");
const priceField = document.getElementById("price");
const descriptionField = document.getElementById("description");
const imageField = document.getElementById("image");

// Load produk dari localStorage
let products = JSON.parse(localStorage.getItem("products")) || [];

// Cek login admin
if (localStorage.getItem("adminLogin")) {
  showAdmin();
}

// Fungsi login
function login() {
  const u = usernameInput.value;
  const p = passwordInput.value;

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

// Konversi file gambar ke base64
function toBase64(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

async function saveProduct() {
  const id = productIdField.value;
  const prodName = nameField.value.trim();
  const prodPrice = Number(priceField.value);
  const prodDesc = descriptionField.value.trim();
  const files = imageField.files;

  if (!prodName || !prodPrice || !prodDesc) {
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
    // Edit produk
    const i = products.findIndex(p => p.id == id);
    products[i] = {
      ...products[i],
      name: prodName,
      price: prodPrice,
      description: prodDesc,
      images: images.length ? images : products[i].images
    };
  } else {
    // Tambah produk baru
    products.push({
      id: Date.now(),
      name: prodName,
      price: prodPrice,
      description: prodDesc,
      images
    });
  }

  localStorage.setItem("products", JSON.stringify(products));
  resetForm();
  renderProducts();
}

function renderProducts() {
  productListEl.innerHTML = "";

  if (products.length === 0) {
    productListEl.innerHTML = "<p>Belum ada produk</p>";
    return;
  }

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";

    const imgSrc = (p.images && p.images.length) ? p.images[0] : "";

    div.innerHTML = `
      <div>
        <b>${p.name}</b><br>
        Rp ${p.price.toLocaleString("id-ID")}<br>
        <small>${p.description}</small>
      </div>
      <div>
        <img src="${imgSrc}" style="max-width:80px;"><br>
        <button onclick="editProduct(${p.id})">Edit</button>
        <button onclick="deleteProduct(${p.id})" style="background:red">Hapus</button>
      </div>
    `;

    productListEl.appendChild(div);
  });
}

function editProduct(id) {
  const p = products.find(p => p.id === id);
  productIdField.value = p.id;
  nameField.value = p.name;
  priceField.value = p.price;
  descriptionField.value = p.description;
  // Perubahan gambar tidak diisi ulang
}

function deleteProduct(id) {
  if (!confirm("Hapus produk ini?")) return;
  products = products.filter(p => p.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

function resetForm() {
  productIdField.value = "";
  nameField.value = "";
  priceField.value = "";
  descriptionField.value = "";
  imageField.value = "";
}

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
