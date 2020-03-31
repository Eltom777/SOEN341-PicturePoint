const { db } = require('./firebase');

exports.usernameExists = (username, callback) => {
    db.collection('users').doc(username).onSnapshot((snapshot) => {
        if(snapshot.exists)
            callback(true);
        else
            callback(false);
    });
}