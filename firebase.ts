import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBjjnmUzJQVB1SUBybqOKI6iEXh9cxLGEQ",
  authDomain: "flashcard-app-saas.firebaseapp.com",
  projectId: "flashcard-app-saas",
  storageBucket: "flashcard-app-saas.appspot.com",
  messagingSenderId: "206922780034",
  appId: "1:206922780034:web:b395542b5840062fc1939b",
  measurementId: "G-HTMXD73QVV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);