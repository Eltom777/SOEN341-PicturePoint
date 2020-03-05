const admin = require('firebase-admin');
const serviceAccount = require('./../../keys/picturepoint-381cf-firebase-adminsdk-a9cln-a81acf0f10.json');


admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "picturepoint-381cf.appspot.com"
});

const db = admin.firestore();

module.exports = { admin, db }