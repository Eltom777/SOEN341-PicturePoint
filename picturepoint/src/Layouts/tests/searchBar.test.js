import { usernameExists } from "../../Firebase/functions/usernameExists";

let username = "test123";

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