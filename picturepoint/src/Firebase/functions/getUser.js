const { db } = require('./firebase');

export const getUser = (userID, callback) => {
    db.collection('users').doc(userID).onSnapshot((snapshot) => {
        callback(snapshot.data());
    });
}