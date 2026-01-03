// Firebase core
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// Firestore (order, omzet, status)
import { getFirestore } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Auth (login admin)
import { getAuth } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCko_6X8U6hLuaYael4qvLWxiZEBasz2Cc",
  authDomain: "hampers-eabac.firebaseapp.com",
  projectId: "hampers-eabac",
  storageBucket: "hampers-eabac.appspot.com",
  messagingSenderId: "379579774696",
  appId: "1:379579774696:web:ab2122ef3acc6fb034fb5d"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
