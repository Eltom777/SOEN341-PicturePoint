import { db,storage } from "./firebase";

const storageRef = storage.ref();

export const deletePhoto = (photoID) => {
    // delete photo document
    db.collection('photos').doc(photoID).delete(); 
  
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
    desertRef.delete()
    .then(()=>{
      console.log(photoID+" successfully deleted")
    }).catch(err =>{ //throw an error if file was not deleted successfully 
      console.log(err)
    });
  }