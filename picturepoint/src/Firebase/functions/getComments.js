const { db } = require('./firebase');

//Fetch one post
exports.getComments = (photoID, callback) => {
    db.collection('comments').orderBy('createdAt', 'desc').where('photo_id', '==', photoID).onSnapshot((snapshot) => {
        let comments = [];
        snapshot.forEach((doc) => {
            comments.push({...doc.data()});
        });
        callback(comments);
    })
}