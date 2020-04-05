//Import firebase
import 'firebase/storage'
const firebase = require('firebase');
const firebaseConfig = require('../config/config');

//Initialize firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
