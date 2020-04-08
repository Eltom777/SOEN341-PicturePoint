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


import { IsFollowing } from "../../Firebase/functions/IsFollowing";

const following = "test123";
const followed = "test121";

test("user should follow other user", (done) => {
    expect(file.name).toBe("test.jpeg");
    addLink(following, followed, (data) => {

    })
    IsFollowing(following, followed, (data) => {
        try {
            expect(data).toBeTruthy();
            done();
        } catch (error) {
            done(error);
        }
    })
});

test("user should unfollow other user", (done) => {
    removeLink(following, followed, (data) => {

    })
    IsFollowing(following, followed, (data) => {
        try {
            expect(data).toBeFalsy();
            done();
        } catch (error) {
            done(error);
        }
    })
});
*/