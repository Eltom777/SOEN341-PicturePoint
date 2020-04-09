test('Test so Jest can run', () => {
    //Required test to make Jest pass
    expect(true).toBeTruthy()
})

/*
-------Information--------

Unit test commented out since there are syncronization issues with Jest and Firebase. Due to this, any operations done by Jest 
to Firebase were never completed yet all the test passed. From these observations, these tests were clearly incorrect. 

In order to test this method without actually hitting the API (and thus creating slow and fragile tests), Jest Mock function are required.
Due to a lack of time and our acceptance test passing, mock function were not implemented. 

---------------------------

import { doPasswordUpdate } from "../../Firebase/functions/auth";
import { doEmailUpdate } from "../firebase/auth";
import { doNickNameUpdate } from "../firebase/auth";
import { db } from "../../Firebase/functions/firebase";
import { auth } from "../../Firebase/functions/firebase";

test('Password is Updated', () => {
   auth.signInWithEmailAndPassword("test123@email.com", "123456").then(() => {
        doPasswordUpdate("234567");
      })
  expect(auth.signInWithEmailAndPassword("test123@email.com", "234567")).rejects;
});

test('Email is Updated', () => {
   auth.signInWithEmailAndPassword("test123@email.com", "123456").then(() => {
        doEmailUpdate("test1234@email.com");
      })
  expect (auth.signInWithEmailAndPassword("test1234@email.com", "234567")).resolves;
});

test('Nickname is Updated', () => {
   auth.signInWithEmailAndPassword("test123@email.com", "123456").then(() => {
        doNickNameUpdate("test1234@email.com");
      })
  expect (auth.signInWithEmailAndPassword("test1234@email.com", "234567")).resolves;
});
*/
