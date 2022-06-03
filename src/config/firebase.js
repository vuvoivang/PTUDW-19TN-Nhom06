// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js"
// import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js"


import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, FacebookAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9xiWK7FIWUte_ZSHtHSjgEBpjB6sCsVw",
    authDomain: "ptudw-covid.firebaseapp.com",
    projectId: "ptudw-covid",
    storageBucket: "ptudw-covid.appspot.com",
    messagingSenderId: "250090458609",
    appId: "1:250090458609:web:d7448c4d1f1e14af458850"
};


const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase)

// Google login
const ggProvider = new GoogleAuthProvider(firebase);

function googleLogin() {
    signInWithPopup(auth, ggProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            location.href = "/profile"
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        })
};

// var google = document.getElementById('google')
// if (google) {
//     google.addEventListener('click', (e) => {
//         console.log(google.innerHTML)
//         googleLogin()
//     })
// }

// Facebook login
const fProvider = new FacebookAuthProvider(firebase);

function facebookLogin() {
    signInWithPopup(auth, fProvider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            location.href = '/profile'

            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
        });
}
// var facebook = document.getElementById('facebook')
// if (facebook) {
//     facebook.addEventListener('click', (e) => {
//         console.log(facebook.innerHTML);
//         facebookLogin();
//     });
// }

function logOut() {
    signOut(auth).then(() => {
        location.href = '/';
    });
}

function testing(text) {
    console.log(text)
}

const firebaseService = { googleLogin, facebookLogin, logOut, testing };

export default firebaseService;