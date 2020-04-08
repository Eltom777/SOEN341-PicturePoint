//Firebase 
import { db,storage } from "./firebase";

const storageRef = storage.ref();

export const addPhoto = (file,caption, callback) => {
  
  let imageExtension = file.name.split('.')[file.name.split('.').length - 1];
  let photoID;

  generateImageName(imageExtension, (callback) =>{
    photoID = callback+"."+imageExtension;
  });

  console.log(photoID);

  //Upload file to google storage 
  var uploadTask = storageRef.child(photoID).put(file);
  uploadTask.on('state_changed', function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, (error) => {
      // Handle unsuccessful uploads
      console.log("Error", error)
      callback(null)
    }, () => {
      // Handle successful uploads on complete
    uploadTask.snapshot.ref.getDownloadURL().then((imageUrl) => {
      console.log('File available at', imageUrl);
      db.collection('/photos').doc(photoID).set({imageUrl,caption,user: localStorage.getItem("username"), creationDate: new Date().toISOString(), likes:0});
      callback(photoID)
    });
  });
        
};

const generateImageName = (fileExtension, callback) => { //Checks if Image name already exists in DB
  callback(Math.round(Math.random() * 1000000000000).toString());
  
  db.collection('photos').doc(callback+"."+fileExtension).get()
  .then(doc => {
    if(doc.exists){
      console.log("Image already exists, generating a new image name")
      generateImageName(fileExtension, (callbackRec) => {callback(callbackRec)});
  } 
  })
  .catch(function(error) {
  console.log("Error: ", error);
  });
}