const { db } = require('./firebase');

exports.getPhoto = (photoID, callback) => {
    db.collection('photos').doc(photoID)
    .get()
    .then(function(querySnapshot) {
        callback(querySnapshot.data());
    })
    .catch(function(error) {
        console.log("Error: ", error);
    });
};