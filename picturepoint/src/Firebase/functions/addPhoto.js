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

export const deletePhoto = (photoID) => {
  // delete photo document
  db.collection('photo').doc(photoID).delete(); 

  // delete all comment document related to this picture
  db.collection('comments').where('photo_id', '==', photoID).get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching comment documents.');
    }
    else{
    //start batch
    let batch = db.batch(); 
    snapshot.forEach(doc => {
      batch.delete(doc.ref); // can only delete up to 500 documents with one batch
    });
    // Commit the batch
    batch.commit();
    }
  })
  .catch(err => {
    console.log('Error getting comment documents', err);
  });
  
  // delete all likes document related to this picture
  db.collection('likes').where('photo', '==', photoID).get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching likes documents.');
    }
    else{
    //start batch
    let batch = db.batch(); 
    snapshot.forEach(doc => {
      batch.delete(doc.ref); // can only delete up to 500 documents with one batch
    });
    // Commit the batch
    batch.commit();
    }
  })
  .catch(err => {
    console.log('Error getting likes documents', err);
  });
  //final step, remove picture from google storage
  
  let desertRef = storageRef.child(photoID)
  desertRef.delete(photoID)
  .then(()=>{
    console.log("Image successfully deleted")
  }).catch(err =>{ //throw an error if file was not deleted successfully 
    console.log(err)
  });
  
}

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



