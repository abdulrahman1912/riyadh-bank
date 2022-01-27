// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-analytics.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js';
import { getFirestore, getDoc, setDoc, updateDoc, collection, doc } from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js';
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

const users = collection(db, 'users');

//Getting input from HTML fieldset
export const name = document.querySelector('#name');
export const email = document.querySelector('#email');
export const password = document.querySelector('#password');
export const confirmPassword = document.querySelector('#password1');
export const phone = document.querySelector('#phone');
export const account_number = document.querySelector('#account-number');


//Getting Buttons from HTML file
const signUpBtn = document.getElementById('signup-btn');
signUpBtn.addEventListener('click', async() => {

  if(password.value === confirmPassword.value){
  
    //New user object
    const newUser = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      account_number: account_number.value,
      account_balance: 100000
    };
    localStorage.setItem('user', JSON.stringify(newUser));
    
    console.log(email.value)
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(cred => {
      console.log(cred)
      const userId = cred.user.uid;
      console.log(userId);
      setDoc(doc(db, "users", userId), {
        name: name.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
        account_number: account_number.value,
        account_balance: 10000
      });
    })
    .then(() => window.location.pathname = '/bank.html')
    .catch(err => {
      const error = err.code;
      if(error == 'auth/email-already-in-use'){
        alert('Email already in use');
      } else if(error == 'auth/invalid-email'){
        alert('Invalid Email');
      } else if(error == 'auth/weak-password'){
        alert('Password is too weak');
      } else {
        alert('Error creating user');
        console.error(error);
      }
    })
  
  } else {
    alert('Passwords do not match');
  }
  
})

