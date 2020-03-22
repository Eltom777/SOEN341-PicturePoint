const { db } = require('./firebase');

//Fetch one post
exports.getComments = (photoID, callback) => {
    db.collection('comments').orderBy('createdAt', 'desc').where('photo_id', '==', photoID).get()
    .then(data => {
    let comments = [];
      data.forEach((doc) => {
          comments.push({...doc.data()});
      });
      console.log(comments);
      callback(comments);
  })
  .catch((err) => {
      console.error("Error", err);
  });
}