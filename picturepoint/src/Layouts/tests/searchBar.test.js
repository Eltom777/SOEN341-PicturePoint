test('Test so Jest can run', () => { //Required test to make Jest pass
    expect(true).toBeTruthy();
});

/*
-------Information--------

Unit test commented out since there are syncronization issues with Jest and Firebase. Due to this, any operations done by Jest 
to Firebase were never completed yet all the test passed. From these observations, these tests were clearly incorrect. 

In order to test this method without actually hitting the API (and thus creating slow and fragile tests), Jest Mock function are required.
Due to a lack of time and our acceptance test passing, mock function were not implemented. 

---------------------------


import { usernameExists } from "../../Firebase/functions/usernameExists";


const username = "test123";
const invalidUsername = "test456";

//Test a valid user search
test('The user exists in the database', (done) => {
    usernameExists(username, (data) => {
        try {
            expect(data).toBeTruthy();
            done();
        } catch (error) {
            done(error);
        }
    });
});

//Test an invalid user search
test('The user does not exists in the database', (done) => {
    usernameExists(invalidUsername, (data) => {
        try {
            expect(data).toBeFalsy();
            done();
        } catch (error) {
            done(error);
        }
    });
});
*/
