import { auth } from "./firebase";
import { db } from "./firebase";

// Sign Up
/*
export const doCreateUserWithEmailAndPassword = (email, passwordone, n, u) =>
  auth.createUserWithEmailAndPassword(email, passwordone).then(resp => {
    return db
      .collection("users")
      .doc(u)
      .set({
        name: n,
        username: u,
        email: email,
        creationDate:new Date().toISOString(),
        userID:resp.user.uid,
      });
  });
*/

export const doCreateUserWithEmailAndPassword = (email, passwordone, n, u) =>
  db.doc(`/users/${u}`).get()
  .then(doc => {
       if(doc.exists){
          return alert("user name already taken");
      } else {
            auth().createUserWithEmailAndPassword(email, passwordone, n, u).then(resp => {
                  return db
                   .collection("users")
                   .doc(u)
                   .set({
                     name: n,
                     username: u,
                     email: email,
                     creationDate:new Date().toISOString(),
                    userID:resp.user.uid,
                   });
              })
      }
   });

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign Out
export const doSignOut = () => auth.signOut().then(() => localStorage.removeItem("username"));

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
