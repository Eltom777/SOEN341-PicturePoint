const { db } = require('./firebase');

export const getPhoto = (photoID, callback) => {
    db.collection('photos').doc(photoID)
    .onSnapshot((snapshot) => {
        callback(snapshot.data());
    });
}