import React, { useState } from 'react';
import Profile from './UserProfile/Profile';
import Header from './Layouts/Header';
import Footer from './Layouts/Footer';

//Firebase
import { firebaseConfig } from './Config/config';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function App() {
  //=============================================*TEMP*============================================================
  //Accessing firebase database
  db.collection('users').get().then(data => {
    //Array of users
    let users = [];

    data.forEach(doc => {
      //Stores a user object into the array
      users.push({
        creationDate: doc.data().creationDate,
        email: doc.data().email,
        userID: doc.data().userID,
        username: doc.data().username
      });
    });
    console.log(users);
  });
  //users = [{creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user"}, {...}, {...}]
  //===============================================================================================================

  //Using state
  const [users, setUsers] = useState([
    {creationDate: "2020-01-23T20:22:39.616Z", email: "a.iacampo@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "a-iacampo", name: "Anthony Iacampo"}
    //{creationDate: "2020-01-23T20:28:14.512Z", email: "user1@email.com", userID: "AfybjsKWt0TZEKYpXVXfQk0FRVi1", username: "user1", name: "Jordan Hum"},
    //{creationDate: "2020-01-23T21:05:24.198Z", email: "user2@email.com", userID: "6CMdkh3VA3hERftUeK8EYldU3Yb2", username: "user2", name: "Thomas Flynn"}
  ]);

  return (
    <div>
      <Header />
      {users.map(user => (
        <Profile username={user.username} email={user.email} name={user.name} creationDate={user.creationDate} />
      ))}
      <Footer />
    </div>
  );
}

export default App;