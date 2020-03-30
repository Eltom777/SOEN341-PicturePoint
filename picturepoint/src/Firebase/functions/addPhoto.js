import { db,storage } from "./firebase";
const firebaseConfig = require('../config/config');

export const addPhoto = (file,caption,progress) => {

    const imageExtension = file.name.split('.')[file.name.split('.').length - 1];
    const newImageFileName = `${Math.round(
        Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    
    var storageRef = storage.ref();
    //Upload file to google storage 
    var uploadTask = storageRef.child(newImageFileName).put(file);
    uploadTask.on('state_changed', function(snapshot){
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then(function(imageUrl) {
            db.collection('/photos').doc(newImageFileName).set({imageUrl,caption,user: localStorage.getItem("username"), creationDate: new Date().toISOString(), likes:0});
            console.log('File available at', imageUrl);
        });
      });
};