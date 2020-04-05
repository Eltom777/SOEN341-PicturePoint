const { db } = require('./firebase');

//Fetch one post
export const getComments = (photoID, callback) => {
    db.collection('comments').orderBy('createdAt', 'desc').where('photo_id', '==', photoID).onSnapshot((snapshot) => {
        let comments = [];
        snapshot.forEach((doc) => {
            comments.push({...doc.data()});
        });
        callback(comments);
    })
}