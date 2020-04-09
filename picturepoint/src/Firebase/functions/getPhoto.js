const { db } = require('./firebase')

//Fetch a single photo
export const getPhoto = (photoID, callback) => {
    db.collection('photos')
        .doc(photoID)
        .onSnapshot((snapshot) => {
            callback(snapshot.data())
        })
}
