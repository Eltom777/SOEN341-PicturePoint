import React, { useState } from 'react';
import Profile from './UserProfile/Profile';
import Friend from './UserProfile/Friend';
import Header from './Layouts/Header';
import Taskbar from './Layouts/Taskbar';

//Firebase
import { firebaseConfig } from './Config/config';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


function App() {
    //=============================================*TEMP*============================================================
    //Array of users
    var users = [];

    //Accessing firebase database
    db.collection('users').get().then(data => {
        data.forEach(doc => {
            //Stores a user object into the array
            users.push({
                creationDate: doc.data().creationDate,
                email: doc.data().email,
                userID: doc.data().userID,
                username: doc.data().username
            });
        });
        //console.log(users);
    });
    //users = [{creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user"}, {...}, {...}]
    //===============================================================================================================

    //Temp data
    const [currentUser] = useState([
        {creationDate: "2020-01-23T20:22:39.616Z", email: "a.iacampo@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "a-iacampo", name: "Anthony Iacampo"}
    ]);
    
    //Temp data
    const [followers] = useState([
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Anthony Iacampo"},
        {creationDate: "2020-01-27T20:28:14.512Z", email: "user1@email.com", userID: "AfybjsKWt0TZEKYpXVXfQk0FRVi1", username: "user1", name: "Jordan Hum"},
        {creationDate: "2020-01-30T21:05:24.198Z", email: "user2@email.com", userID: "6CMdkh3VA3hERftUeK8EYldU3Yb2", username: "user2", name: "Thomas Flynn"},
        {creationDate: "2020-02-11T21:05:24.198Z", email: "user3@email.com", userID: "6CMdkh3VA3hERftUeK8EYldU3Yb2", username: "user3", name: "Haocheng Yang"},
        {creationDate: "2020-02-09T21:05:24.198Z", email: "user4@email.com", userID: "6CMdkh3VA3hERftUeK8EYldU3Yb2", username: "user4", name: "Thomas Tran"}
    ]);

    //Temp data
    const [following] = useState([
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Jason Tabah"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Caleb Lim"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Eric"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Eric"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Eric"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Eric"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Eric"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Eric"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Eric"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Eric"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Eric"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Eric"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Eric"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Eric"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Eric"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Eric"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Eric"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Eric"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Eric"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Eric"},
    ]);

    return (
        <div>
            <Header />
            {currentUser.map(user => (
                <Profile username={user.username} email={user.email} name={user.name} creationDate={user.creationDate} />
            ))}
            <Taskbar />
            <Friend followers={followers} following={following} />
        </div>
    );
}

export default App;