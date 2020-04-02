const { db } = require('./firebase');

exports.checkLike = (photoID, username, callback) => {
    db.collection('likes').where("photo", '==', photoID).onSnapshot((snapshot) => {
        let isLiked;
        snapshot.forEach((doc) => {
            if(doc.data().user === username)
                isLiked = true;
            else
                isLiked = false;
        });
        callback(isLiked);
    });
}