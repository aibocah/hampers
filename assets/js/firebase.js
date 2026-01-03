/* ==================================================
   FIREBASE.JS — FINAL & CLEAN
================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ===============================
   FIREBASE CONFIG
================================ */
const firebaseConfig = {
  apiKey: "AIzaSyCko_6X8U6hLuaYael4qvLWxiZEBasz2Cc",
  authDomain: "hampers-eabac.firebaseapp.com",
  projectId: "hampers-eabac",
  storageBucket: "hampers-eabac.appspot.com",
  messagingSenderId: "379579774696",
  appId: "1:379579774696:web:ab2122ef3acc6fb034fb5d"
};

/* ===============================
   INIT
================================ */
const app = initializeApp(firebaseConfig);

/* ===============================
   EXPORTS
================================ */
export const auth = getAuth(app);
export const db = getFirestore(app);
