const { initializeApp } = require('firebase/app');
const { getAuth, GoogleAuthProvider, signInWithPopup, signOut, FacebookAuthProvider } = require('firebase/auth');
const API_URL = "https://covid-19-management-sys-19tn.herokuapp.com";

const firebaseConfig = {
    apiKey: "AIzaSyD9xiWK7FIWUte_ZSHtHSjgEBpjB6sCsVw",
    authDomain: "ptudw-covid.firebaseapp.com",
    databaseURL: "https://ptudw-covid-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ptudw-covid",
    storageBucket: "ptudw-covid.appspot.com",
    messagingSenderId: "250090458609",
    appId: "1:250090458609:web:d7448c4d1f1e14af458850"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const ggSignin = () => {
    if (!auth.currentUser) {
        let provider = new GoogleAuthProvider(app)
        signInWithPopup(auth, provider).then(result => {
            const user = result.user
            signOut(auth)
            sendFirebaseRequest(user)

        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        })
    } else {
        signOut(auth)
    }
}

const faceSignin = () => {
    if (!auth.currentUser) {
        let provider = new FacebookAuthProvider(app)
        signInWithPopup(auth, provider).then(result => {
            const user = result.user
            signOut(auth)
            sendFirebaseRequest(user)
            
        }).catch(error => {
            const errorMessage = error.message;
            console.log(errorMessage)
        })
    } else {
        signOut(auth)
    }
}

const sendFirebaseRequest = async (user) => {
    fetch(`${API_URL}/api/v1/authentication/firebase`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ user })
    }).then(resp => resp.json())
        .then(res => {
            const { result } = res;
            if (result === "success") {
                location.href = res.page;
            }
            else {
                showToast("Username or password is incorrect!!!");
            }
        });
}

module.exports = {
    ggSignin,
    faceSignin
};
