// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-analytics.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js';
import { getFirestore, getDoc, setDoc, updateDoc, collection, doc, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6eduLQrq7r7BkPE8hyEPFgk5AG0sdOGE",
  authDomain: "riyadhbank-13ec3.firebaseapp.com",
  projectId: "riyadhbank-13ec3",
  storageBucket: "riyadhbank-13ec3.appspot.com",
  messagingSenderId: "562075965341",
  appId: "1:562075965341:web:0818931e8efe100b18c174",
  measurementId: "G-JWSTXYT9Z1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(); //for authentication
const db = getFirestore(); //For the database

const userDoc  = collection(db, 'users');

//Getting input from HTML fieldset
const email = document.querySelector('#email');
const password = document.querySelector('#password');
let users = [];
export let userDetails = {};

const data = await getDocs(userDoc).then(user => {
    user.forEach(userDoc => { 
        users = [...users, userDoc.data()]
    });
    console.log(users)
})

const loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', () =>{
    let found = false;
    users.map(user => {
        if(user.email === email.value && user.password === password.value){
            found = true;
            window.location.replace = '/bank.html';
            userDetails = user;
            console.log(user)
        }
    })
    if(found!=true){
        alert("User not found");
    }

})