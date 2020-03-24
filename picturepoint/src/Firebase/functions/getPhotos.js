const { db } = require('./firebase');

exports.getPhotos = (username, callback) => {
    db.collection('photos').where("user", '==', username)
    .get()
    .then(function(querySnapshot) {
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({...doc.data(), photoID:doc.id});
        })
        callback(data);
    })
    .catch(function(error) {
        console.log("Error: ", error);
    });
};