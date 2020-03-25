const { db } = require('./firebase');

// Comment on a Post
exports.commentOnPost = (photoID, userID, res) => {
  if(req.body.body.trim() === '') return res.status(400).json({ error: 'Must not be empty'});

  const newComment = {
      body: req.body.body,
      createdAt: new Date().toISOString(),
      photo_id: photoID,
      username: userID
  }

  db.doc(`/photo/${req.params.photo_id}`).get()
      .then( doc => {
          if(!doc.exists){
              return res.status(404).json({error: 'Post not found'})
          }
          return doc.ref.update({ commentCount: doc.data().commentCount + 1});
      })
      .then(() =>{
          return db.collection('comments').add(newComment);
      })
      .then( () => {
          res.json(newComment);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({error: 'Something went wrong'});
      })
}