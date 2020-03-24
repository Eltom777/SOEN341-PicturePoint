//Import firebase
const firebase = require('firebase');
const firebaseConfig = require('../config/config');

//Initialize firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
