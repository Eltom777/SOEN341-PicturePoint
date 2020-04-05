const { db } = require('./firebase');

// Comment on a Post
export const commentOnPost = (newComment) => {
  if(newComment.body.trim() === '') 
    console.log("Must not be empty");

  db.doc(`/photo/${newComment.photo_id}`).get()
      .then( doc => {
          if(!doc.exists){
            console.log('Post not found');
          }
      })
      .then(() =>{
          db.collection('comments').add(newComment);
      })
      .catch(err => {
          console.log("Error: ", err);
      })
}