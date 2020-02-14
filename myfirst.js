var express = require('express');
const firebase = require('firebase');
const { admin, db } = require('./functions/util/admin');
const config = require('./functions/util/FirebaseConfig');
const Busboy = require('busboy');

firebase.initializeApp(config);
var server = express();

server.set('view engine','ejs');

server.get('/',function(req,res){
  res.render('index');
});

server.get('/add.ejs',function(req,res){
  res.render('add');
});
server.post('/add.ejs',function(req,res){
  const Busboy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');

  const busboy = new Busboy({headers: req.headers});
  
  let imageToBeUploaded = {};
  let imageFileName;
  
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      console.log(mimetype);
      
      // my.image.png => ['my', 'image', 'png']
      const imageExtension = filename.split('.')[filename.split('.').length - 1];
      
      // generate randome file id
      imageFileName = `${Math.round(Math.random() * 1000000000000).toString()}.${imageExtension}`;

      const filepath = path.join(os.tmpdir(), imageFileName);
      imageToBeUploaded = { filepath, mimetype,imageFileName };
      file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
      console.log(val);
  });
  busboy.on('finish', () => {
	  console.log(imageToBeUploaded.filepath);
      const storage = admin.storage();
      console.log(JSON.stringify(storage.appInternal.options));
      admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
          resumable: false,
          metadata: {
          metadata: {
              contentType: imageToBeUploaded.mimetype
          }
          }
      })
      .then(() => {
          const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
          config.storageBucket
          }/o/${imageFileName}?alt=media`;
          return db.doc(`/users/t-flynn`).update({ imageUrl });
      })
      .then(() => {
          return res.json({ message: 'image uploaded successfully' });
      })
      .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: 'something went wrong' });
      });
  });
  req.pipe(busboy);
});
server.listen(8080);
