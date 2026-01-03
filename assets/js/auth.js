const ADMIN_USER = "Septi";
const ADMIN_PASS = "Cintaneanwar"; // GANTI SENDIRI

function login() {
  const user = username.value;
  const pass = password.value;

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    localStorage.setItem("adminLogin", "true");
    location.href = "dashboard.html";
  } else {
    loginError.innerText = "❌ Username atau password salah";
  }
}

function checkAuth() {
  if (localStorage.getItem("adminLogin") !== "true") {
    location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("adminLogin");
  location.href = "login.html";
}
