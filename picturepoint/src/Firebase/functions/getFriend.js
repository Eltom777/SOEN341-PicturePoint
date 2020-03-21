const { db } = require('./firebase');

exports.getFriend = (userID, callback) => {
    db.collection('users').doc(userID)
    .get()
    .then(function(querySnapshot) {
        callback(querySnapshot.data());
    })
    .catch(function(error) {
        console.log("Error: ", error);
    });
};