const { db } = require('./firebase');

exports.getUser = (userID, callback) => {
    db.collection('users').doc(userID).onSnapshot((snapshot) => {
        callback(snapshot.data());
    });
}