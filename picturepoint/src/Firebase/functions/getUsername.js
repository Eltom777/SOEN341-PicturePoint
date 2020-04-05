const { db } = require('./firebase');

export const getUsername = (email, callback) => {
    db.collection('users').where("email", '==', email)
    .get()
    .then(function(querySnapshot) {
        callback(querySnapshot.docs[0].data());
    })
    .catch(function(error) {
        console.log("Error: ", error);
    });
};