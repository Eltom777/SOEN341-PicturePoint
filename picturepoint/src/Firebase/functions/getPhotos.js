const { db } = require('./firebase');

exports.getPhotos = (username, callback) => {
    db.collection('photos').where("user", '==', username).onSnapshot((snapshot) => {
        let data = [];
        snapshot.forEach((doc) => {
            data.push({...doc.data(), photoID:doc.id});
        })
        callback(data);
    });
}