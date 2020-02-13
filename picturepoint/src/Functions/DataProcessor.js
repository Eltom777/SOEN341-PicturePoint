//Firebase
import { firebaseConfig } from '../Config/config';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/*
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
*/

export const getUser = () => {
    //Temp data
    return([
        {creationDate: "2020-01-23T20:22:39.616Z", email: "a.iacampo@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "a-iacampo", name: "Anthony Iacampo"}
    ]);
}

export const getFollowers = () => {
    //Temp data
    return([
        {creationDate: "2020-01-23T20:22:39.616Z", email: "user@email.com", userID: "7at02dmw3JNMgaLHiST7D5HBrpy2", username: "user", name: "Anthony Iacampo"},
        {creationDate: "2020-01-27T20:28:14.512Z", email: "user1@email.com", userID: "AfybjsKWt0TZEKYpXVXfQk0FRVi1", username: "user1", name: "Jordan Hum"},
        {creationDate: "2020-01-30T21:05:24.198Z", email: "user2@email.com", userID: "6CMdkh3VA3hERftUeK8EYldU3Yb2", username: "user2", name: "Thomas Flynn"},
        {creationDate: "2020-02-11T21:05:24.198Z", email: "user3@email.com", userID: "6CMdkh3VA3hERftUeK8EYldU3Yb2", username: "user3", name: "Haocheng Yang"},
        {creationDate: "2020-02-09T21:05:24.198Z", email: "user4@email.com", userID: "6CMdkh3VA3hERftUeK8EYldU3Yb2", username: "user4", name: "Thomas Tran"}
    ]);
}

export const getFollowing = () => {
    //Temp data
    return ([
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
}