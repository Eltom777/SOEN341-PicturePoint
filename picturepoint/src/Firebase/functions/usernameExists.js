const { db } = require('./firebase')

//Search for a valid username
export const usernameExists = (username, callback) => {
    db.collection('users')
        .doc(username)
        .onSnapshot((snapshot) => {
            if (snapshot.exists) callback(true)
            else callback(false)
        })
}
