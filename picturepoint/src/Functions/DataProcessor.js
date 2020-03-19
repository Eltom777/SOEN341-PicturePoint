
export const getFollowers = () => {
    //Temp data
    return([
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "a-iacampo", name: "Anthony Iacampo"},
        {creationDate: "2020-01-27T20:28:14.512Z", email: "user1@email.com", userID: "AfybjsKWt0TZEKYpXVXfQk0FRVi1", username: "j-hum", name: "Jordan Hum"},
        {creationDate: "2020-01-30T21:05:24.198Z", email: "user2@email.com", userID: "6CMdkh3VA3hERftUeK8EYldU3Yb2", username: "t-flynn", name: "Thomas Flynn"},
        {creationDate: "2020-02-11T21:05:24.198Z", email: "user3@email.com", userID: "6CMdkh3VA3hERftUeK8EYldU3Yb2", username: "h-yang", name: "Haocheng Yang"},
        {creationDate: "2020-02-09T21:05:24.198Z", email: "user4@email.com", userID: "6CMdkh3VA3hERftUeK8EYldU3Yb2", username: "t-tran", name: "Thomas Tran"}
    ]);
}

export const getFollowing = () => {
    //Temp data
    return ([
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "j-tabah", name: "Jason Tabah"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "c-lim", name: "Caleb Lim"},
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "eric77", name: "Eric"}
    ]);
}



/*
    //=============================================*TEMP*============================================================
//Firebase
import { firebaseConfig } from '../Config/config';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const app = require('express')();

//Function to get User from the database
app.get('/getUser', (request, response) => {
    db.collection('users').get().then(data => {
        let users = [];
        data.forEach(doc => {
            users.push({
                userID: doc.id,
                email: doc.data().email,
                username: doc.data().username,
                name: doc.data().name,
                creationDate: doc.data().creationDate
            });
        });
        return response.json(users);
    })
    .catch(err => console.error(err));
});

exports.api = functions.https.onRequest(app);
    //===============================================================================================================
*/