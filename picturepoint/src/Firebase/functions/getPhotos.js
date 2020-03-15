const { db } = require('./firebase');

exports.getPhotos = (username) => {
    db.collection('photos').where("user", '==', username)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.data());
            return doc.data();
        });
    })
    .catch(function(error) {
        console.log("Error: ", error);
    });
};