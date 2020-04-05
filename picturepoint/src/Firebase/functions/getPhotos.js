const { db } = require('./firebase');

export const getPhotos = (username, callback) => {
    db.collection('photos').where("user", '==', username).onSnapshot((snapshot) => {
        let data = [];
        snapshot.forEach((doc) => {
            data.push({...doc.data(), photoID:doc.id});
        })
        callback(data);
    });
}