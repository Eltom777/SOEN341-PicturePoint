import { auth } from "./firebase";
import { db } from "./firebase";

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password, n, u) =>
  
  auth.createUserWithEmailAndPassword(email, password).then(resp => {
    return db
      .collection("users")
      .doc(u)
      .set({
        name: n,
        username: u,
        email: email,
        creationDate:new Date().toISOString(),
      });
  });

  // db.doc(`/users/${newUser.username}`).get()
  // .then(doc => {
  //     if(doc.exists){
  //         return response.status(400).json({ username: 'This username is already taken'});
  //     } else {
  //         return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
  //     }
  // })
// .then(resp.user.uid => {
//   return db
//     .collection("/users")
//     .doc(u)
//     .set({
//       name: n,
//       username: u,
//       email:email

//     });

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign Out
export const doSignOut = () => auth.signOut();

// Password Reset
export const doPasswordReset = email =>
  auth
    .sendPasswordResetEmail(email)
    .then(function() {
      // Password reset email sent.
    })
    .catch(function(error) {
      // Error occurred. Inspect error.code.
    });

// Password Change
export const doPasswordUpdate = password =>
  auth.currentUser.updatePassword(password);
