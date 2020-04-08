const { db } = require('./firebase')

//Unlike a photo
export const unlikePost = (photoID, username, photo) => {
    db.collection('likes')
        .where('photo', '==', photoID)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().user === username)
                    db.collection('likes').doc(doc.id).delete()
            })
        })
        .catch((error) => {
            console.log('Error: ', error)
        })

    db.collection('photos')
        .doc(photoID)
        .update({
            likes: photo.likes - 1,
        })
}
