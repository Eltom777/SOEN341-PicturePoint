import { usernameExists } from "../../Firebase/functions/usernameExists";

const username = "test123";
const invalidUsername = "test456";

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