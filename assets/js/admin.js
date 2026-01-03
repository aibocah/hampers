/* ==================================================
   ADMIN.JS — FINAL (LOGIN + CRUD + EXPORT JSON)
================================================== */

/* ===============================
   CONFIG LOGIN
================================ */
const ADMIN_USER = "septi";
const ADMIN_PASS = "cintaneanwar";

/* ===============================
   ELEMENT
================================ */
const loginBox = document.getElementById("loginBox");
const adminPanel = document.getElementById("adminPanel");
const loginError = document.getElementById("loginError");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const productList = document.getElementById("productList");

const titleInput = document.getElementById("pTitle");
const priceInput = document.getElementById("pPrice");
const descInput = document.getElementById("pDesc");
const imageInput = document.getElementById("pImage");
const customInput = document.getElementById("pCustom");

/* ===============================
   STATE
================================ */
let editIndex = null;

/* ===============================
   LOGIN
================================ */
function login() {
  if (
    usernameInput.value === ADMIN_USER &&
    passwordInput.value === ADMIN_PASS
  ) {
    localStorage.setItem("adminLogin", "true");
    showAdmin();
  } else {
    loginError.textContent = "Username atau password salah";
  }
}

function logout() {
  localStorage.removeItem("adminLogin");
  location.reload();
}

function showAdmin() {
  loginBox.style.display = "none";
  adminPanel.style.display = "block";
  renderProducts();
}

if (localStorage.getItem("adminLogin")) {
  showAdmin();
}

/* ===============================
   STORAGE
================================ */
function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(data) {
  localStorage.setItem("products", JSON.stringify(data));
}

/* ===============================
   CRUD PRODUK
================================ */
function saveProduct() {
  if (!titleInput.value || !imageInput.value) {
    alert("Nama produk & gambar wajib diisi");
    return;
  }

  const product = {
    title: titleInput.value,
    price: priceInput.value ? Number(priceInput.value) : null,
    desc: descInput.value,
    image: imageInput.value,
    custom: customInput.checked
  };

  const products = getProducts();

  if (editIndex !== null) {
    products[editIndex] = product;
    editIndex = null;
  } else {
    products.push(product);
  }

  saveProducts(products);
  resetForm();
  renderProducts();
}

function renderProducts() {
  const products = getProducts();
  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML = "<p>Belum ada produk</p>";
    return;
  }

  products.forEach((p, i) => {
    productList.innerHTML += `
      <div class="product-item">
        <img src="${p.image}">
        <strong>${p.title}</strong>
        <p>
          ${
            p.price
              ? "Rp " + p.price.toLocaleString("id-ID")
              : "Harga Menyesuaikan"
          }
        </p>
        <small>${p.custom ? "Custom" : "Normal"}</small>

        <div style="display:flex;gap:8px;margin-top:8px">
          <button onclick="editProduct(${i})">✏️ Edit</button>
          <button class="danger" onclick="deleteProduct(${i})">🗑️ Hapus</button>
        </div>
      </div>
    `;
  });
}

function editProduct(index) {
  const product = getProducts()[index];

  titleInput.value = product.title;
  priceInput.value = product.price || "";
  descInput.value = product.desc;
  imageInput.value = product.image;
  customInput.checked = product.custom;

  editIndex = index;
}

function deleteProduct(index) {
  if (!confirm("Yakin hapus produk ini?")) return;

  const products = getProducts();
  products.splice(index, 1);
  saveProducts(products);
  renderProducts();
}

function resetForm() {
  titleInput.value = "";
  priceInput.value = "";
  descInput.value = "";
  imageInput.value = "";
  customInput.checked = false;
}

/* ===============================
   EXPORT JSON
================================ */
function exportJSON() {
  const data = JSON.stringify(getProducts(), null, 2);
  const blob = new Blob([data], { type: "application/json" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "products.json";
  a.click();
}
