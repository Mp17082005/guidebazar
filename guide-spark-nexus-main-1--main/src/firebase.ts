// src/firebase.ts
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ADD THIS LINE

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcVDBULIFybdogDnwS7p0Pxf7On-krW74",
  authDomain: "guidebazaar-d8a2a.firebaseapp.com",
  projectId: "guidebazaar-d8a2a",
  storageBucket: "guidebazaar-d8a2a.firebasestorage.app",
  messagingSenderId: "908029936336",
  appId: "1:908029936336:web:7f8a58b272496b7f1f14d5",
  measurementId: "G-RWMXBV0T3W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service (ADD THIS LINE)
export const db = getFirestore(app);

// You can also export the app and analytics instances if needed elsewhere,
// though typically auth and db are the most frequently used.

// // src/firebase.ts
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth"; // <--- ADD THIS LINE

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBcVDBULIFybdogDnwS7p0Pxf7On-krW74",
//   authDomain: "guidebazaar-d8a2a.firebaseapp.com",
//   projectId: "guidebazaar-d8a2a",
//   storageBucket: "guidebazaar-d8a2a.firebasestorage.app",
//   messagingSenderId: "908029936336",
//   appId: "1:908029936336:web:7f8a58b272496b7f1f14d5",
//   measurementId: "G-RWMXBV0T3W",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // You can keep this if you intend to use Analytics

// // Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app); // <--- ADD THIS LINE AND EXPORT IT

// // You can also export the app and analytics instances if needed elsewhere, though 'auth' is primary for now.
// export { app, analytics };
