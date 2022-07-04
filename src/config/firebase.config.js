const { initializeApp } = require('firebase/app');
const {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    FacebookAuthProvider,
    onAuthStateChanged,
} = require('firebase/auth');
const axios = require('axios');

const firebaseConfig = {
    apiKey: 'AIzaSyD9xiWK7FIWUte_ZSHtHSjgEBpjB6sCsVw',
    authDomain: 'ptudw-covid.firebaseapp.com',
    databaseURL: 'https://ptudw-covid-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'ptudw-covid',
    storageBucket: 'ptudw-covid.appspot.com',
    messagingSenderId: '250090458609',
    appId: '1:250090458609:web:d7448c4d1f1e14af458850',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const ggSignup = () => {
    if (!auth.currentUser) {
        let provider = new GoogleAuthProvider(app);
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                signOut(auth);
                sendFirebaseRequest(user, 'signup');
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    } else {
        signOut(auth);
    }
};

const faceSignup = () => {
    if (!auth.currentUser) {
        let provider = new FacebookAuthProvider(app);
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                signOut(auth);
                sendFirebaseRequest(user, 'signup');
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    } else {
        signOut(auth);
    }
};

const ggSignin = () => {
    if (!auth.currentUser) {
        let provider = new GoogleAuthProvider(app);
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                signOut(auth);
                sendFirebaseRequest(user, 'signin');
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    } else {
        signOut(auth);
    }
};

const faceSignin = () => {
    if (!auth.currentUser) {
        let provider = new FacebookAuthProvider(app);
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                signOut(auth);
                sendFirebaseRequest(user, 'signin');
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    } else {
        signOut(auth);
    }
};

const sendFirebaseRequest = async (user, action) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `https://covid-19-management-sys-19tn.herokuapp.com//api/v1/authentication/${action}/firebase`,
            data: {
                user,
            },
        });
        if (res.data.page) {
            window.location.href = res.data.page;
        }
    } catch (error) {
        alert(error);
    }
};

module.exports = {
    ggSignup,
    faceSignup,
    ggSignin,
    faceSignin,
};
