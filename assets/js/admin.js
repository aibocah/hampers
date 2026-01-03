// LOGIN CONFIG
const ADMIN_USER = "Septi";
const ADMIN_PASS = "cintaneanwar";

let products = JSON.parse(localStorage.getItem("products")) || [];

// LOGIN
function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  if (u === ADMIN_USER && p === ADMIN_PASS) {
    localStorage.setItem("adminLogin", "true");
    showAdmin();
  } else {
    alert("Login gagal");
  }
}

function logout() {
  localStorage.removeItem("adminLogin");
  location.reload();
}

function showAdmin() {
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("adminPanel").classList.remove("hidden");
  renderProducts();
}

if (localStorage.getItem("adminLogin")) showAdmin();

// IMAGE TO BASE64
function getImageBase64(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

// SAVE PRODUCT
async function saveProduct() {
  const id = document.getElementById("productId").value;
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const desc = document.getElementById("description").value;
  const imgFile = document.getElementById("image").files[0];

  let image = "";

  if (imgFile) image = await getImageBase64(imgFile);

  if (id) {
    const i = products.findIndex(p => p.id == id);
    products[i] = { ...products[i], name, price, description: desc, image };
  } else {
    products.push({
      id: Date.now(),
      name,
      price,
      description: desc,
      image
    });
  }

  localStorage.setItem("products", JSON.stringify(products));
  resetForm();
  renderProducts();
}

// RENDER
function renderProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <div>
        <b>${p.name}</b><br>
        Rp ${p.price}<br>
        <small>${p.description}</small>
      </div>
      <div>
        <img src="${p.image}">
        <br>
        <button onclick="editProduct(${p.id})">Edit</button>
        <button onclick="deleteProduct(${p.id})" style="background:red">Hapus</button>
      </div>
    `;
    list.appendChild(div);
  });
}

function editProduct(id) {
  const p = products.find(p => p.id === id);
  productId.value = p.id;
  name.value = p.name;
  price.value = p.price;
  description.value = p.description;
}

function deleteProduct(id) {
  if (!confirm("Hapus produk?")) return;
  products = products.filter(p => p.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

function resetForm() {
  productId.value = "";
  name.value = "";
  price.value = "";
  description.value = "";
  image.value = "";
}

// EXPORT JSON
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
