import { db,storage } from "./firebase";
const firebaseConfig = require('../config/config');

const storageRef = storage.ref();

export const addPhoto = (file,caption,progress) => {

    let imageExtension = file.name.split('.')[file.name.split('.').length - 1];
    let newImageName;
    generateImageName(imageExtension, newImageName);
  
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

export const deletePhoto = (imageId) => {
  var desertRef = storageRef.child(imageId)
  desertRef.delete()
  .then(()=>{
    console.log("Image successfully deleted")
  }).catch(err =>{ //throw an error if file was not deleted successfully 
    console.log(err)
  });
}

const generateImageName = (fileExtension, newName) => {
  newName = `${Math.round(Math.random() * 1000000000000).toString()}.${fileExtension}`;
  db.doc(`/users/${newName}`).get()
  .then(doc => {
    if(doc.exists){
      console.log("Image already exists, generating a new image name")
      generateImageName(fileExtension, newName);
   } 
  })
  .catch(function(error) {
  console.log("Error: ", error);
  });
}



