/* ==================================================
   AUTH.JS — FINAL (FIREBASE AUTH)
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
  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("passwordInput").value.trim();
  const errorBox = document.getElementById("loginError");

  errorBox.textContent = "";

  if (!email || !password) {
    errorBox.textContent = "❌ Email dan password wajib diisi";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (err) {
    console.error(err);
    errorBox.textContent = "❌ Login gagal. Email atau password salah";
  }
};

/* ===============================
   PROTECT DASHBOARD
================================ */
onAuthStateChanged(auth, user => {
  const isDashboard = location.pathname.includes("dashboard");
  if (isDashboard && !user) {
    window.location.href = "login.html";
  }
});

/* ===============================
   LOGOUT
================================ */
window.logout = async function () {
  await signOut(auth);
  window.location.href = "login.html";
};

