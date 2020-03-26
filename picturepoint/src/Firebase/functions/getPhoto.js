const { db } = require('./firebase');

exports.getPhoto = (photoID, callback) => {
    db.collection('photos').doc(photoID)
    .onSnapshot((snapshot) => {
        callback(snapshot.data());
    });
}