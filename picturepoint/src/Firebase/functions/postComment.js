const { db } = require('./firebase')

// Comment on a Post
export const commentOnPost = (newComment, callback) => {
    if (newComment.body.trim() === '') {
        console.log('Must not be empty')
        callback(false)
    } else {
        db.collection('comments').add(newComment)
        callback(true)
    }
}
