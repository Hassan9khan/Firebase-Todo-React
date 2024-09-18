import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 


const firebaseConfig = {
  apiKey: "AIzaSyDCuNKm-0g7flTkNTQVbT4FwsmUwZv7yF8",
  authDomain: "react-todo-firebase-7.firebaseapp.com",
  projectId: "react-todo-firebase-7",
  storageBucket: "react-todo-firebase-7.appspot.com",
  messagingSenderId: "1096273575989",
  appId: "1:1096273575989:web:a03140fef922f76ffdb17c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
