/* ==================================================
   AUTH.JS — FINAL VERSION (FIREBASE AUTH)
   ================================================== */

import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* ===============================
   LOGIN
================================ */
window.login = async function () {
  const email = username.value.trim();
  const password = passwordInput.value.trim();

  loginError.textContent = "";

  if (!email || !password) {
    loginError.textContent = "Email dan password wajib diisi";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (err) {
    console.error(err);
    loginError.textContent = "❌ Login gagal. Cek email atau password";
  }
};

/* ===============================
   CHECK AUTH (AUTO)
================================ */
onAuthStateChanged(auth, user => {
  const isDashboard = location.pathname.includes("dashboard");

  if (isDashboard && !user) {
    location.href = "login.html";
  }
});

/* ===============================
   LOGOUT
================================ */
window.logout = async function () {
  await signOut(auth);
  window.location.href = "login.html";
};
