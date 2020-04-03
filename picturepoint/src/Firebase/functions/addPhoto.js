import { db,storage } from "./firebase";
const firebaseConfig = require('../config/config');

const storageRef = storage.ref();

export const addPhoto = (file,caption,progress) => {

    let imageExtension = file.name.split('.')[file.name.split('.').length - 1];
    let newImageName;
    generateImageName(imageExtension, newImageName);
  
    //Upload file to google storage 
    var uploadTask = storageRef.child(newImageName+"."+imageExtension).put(file);
    uploadTask.on('state_changed', function(snapshot){
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then(function(imageUrl) {
            db.collection('/photos').doc(newImageName+"."+imageExtension).set({imageUrl,caption,user: localStorage.getItem("username"), creationDate: new Date().toISOString(), likes:0});
            console.log('File available at', imageUrl);
        });
      });
};


const generateImageName = (fileExtension, newName) => { //Checks if Image name already exists in DB
  newName = `${Math.round(Math.random() * 1000000000000).toString()}.${fileExtension}`;
  
  db.collection('photos').doc(newName+"."+fileExtension).get()
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



