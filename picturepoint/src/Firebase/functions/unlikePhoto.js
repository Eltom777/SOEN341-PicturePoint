const { db } = require('./firebase');

//Unlike a photo
exports.unlikePost = (req, res) => {
  const likeDocument = db.collection('likes').where('username', '==', req.user.username)
      .where('photo_id', '==', req.params.photo_id).limit(1);
  const postDocument = db.doc(`/photo/${req.params.photo_id}`);
  let photoData;

  postDocument.get()
      .then(doc => {
          if(doc.exists){
              photoData = doc.data();
              photoData.photo_id = doc.id;
              return likeDocument.get();
          }else{
              return res.status(404).json({ error: 'Photo not found'});
          }
      })
      .then(data => {
          if(data.empty){
              return res.status(400).json({error: 'Photo not liked'});
          } else {
              return db.collection(`/likes/${data.docs[0].id}`).delete()
                  .then(() => {
                      photoData.likeCount--;
                      return postDocument.update({ likeCount: photoData.likeCount})
                  })
                  .then(() => {
                      res.json(photoData);
                  })
          }
      })
  .catch(err => {
      res.status(500).json({ error: err.code});
  })
}