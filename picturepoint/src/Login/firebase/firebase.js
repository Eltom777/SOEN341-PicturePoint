import firebase from "firebase/app";
import "firebase/auth";
require("firebase/firestore");

const config = {
  apiKey: "AIzaSyDTSp-jysKsVYkvrlOjAJBqZoU4GsjG-nk",
  authDomain: "picturepoint-381cf.firebaseapp.com",
  databaseURL: "https://picturepoint-381cf.firebaseio.com",
  projectId: "picturepoint-381cf",
  storageBucket: "picturepoint-381cf.appspot.com",
  messagingSenderId: "370534118114",
  appId: "1:370534118114:web:5025cb108da80915c564bb",
  measurementId: "G-8LPREMPPKG"
};

firebase.initializeApp(config);

const auth = firebase.auth();
const db= firebase.firestore();
export { auth,db };
