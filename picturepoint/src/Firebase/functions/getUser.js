const { admin, db } = require('./firebase');

exports.getUser = (email) => {
    db.collection('users').where("email", '==', email)
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