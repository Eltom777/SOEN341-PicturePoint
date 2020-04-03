const { db } = require('./firebase');

//Like a picture
exports.likePost = (newLike, photoID, photo) => {
    db.collection('likes').add(newLike);

    db.collection('photos').doc(photoID).update({
        "likes": (photo.likes + 1)
    })
}