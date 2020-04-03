const { db } = require('./firebase');

exports.checkLike = (photoID, username, callback) => {
    db.collection('likes').where("photo", '==', photoID).get().then((querySnapshot) => {
        let isLiked = false;
        querySnapshot.forEach((doc) => {
            if(doc.data().user === username) {
                isLiked = true;
            }
        });
        callback(isLiked);
    })
    .catch((error) => {
        console.log("Error: ", error);
    });
}