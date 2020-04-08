const { db } = require('./firebase');

//Fetch user's info with username
export const getUser = (userID, callback) => {
    db.collection('users').doc(userID).onSnapshot((snapshot) => {
        callback(snapshot.data());
    });
}