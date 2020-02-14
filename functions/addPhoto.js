const { admin, db } = require('./util/admin');
const config = require('./util/FirebaseConfig');


exports.UploadImage = (res,req) => {
    const Busboy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = new Busboy({headers: req.headers});
    /*
    let imageToBeUploaded = {};
    let imageFileName;
    console.log('here');
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        console.log(fieldname, file, filename, encoding, mimetype);
        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
            return res.status(400).json({ error: 'Wrong file type submitted' });
        }
        // my.image.png => ['my', 'image', 'png']
        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        // 32756238461724837.png
        imageFileName = `${Math.round(
            Math.random() * 1000000000000
        ).toString()}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = { filepath, mimetype };
        file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
        console.log(val);
    });
    busboy.on('finish', () => {
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
            return db.doc(`/users/FlynnTest`).update({ imageUrl });
        })
        .then(() => {
            return res.json({ message: 'image uploaded successfully' });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: 'something went wrong' });
        });
    });
    busboy.end(req.rawBody);
    */
};