// import { usernameExists } from "../../Firebase/functions/usernameExists";

// const username = "test123";
// const invalidUsername = "test456";

// //Test a valid user search
// test('The user exists in the database', (done) => {
//     usernameExists(username, (data) => {
//         try {
//             expect(data).toBeTruthy();
//             done();
//         } catch (error) {
//             done(error);
//         }
//     });
// });

// //Test an invalid user search
// test('The user does not exists in the database', (done) => {
//     usernameExists(invalidUsername, (data) => {
//         try {
//             expect(data).toBeFalsy();
//             done();
//         } catch (error) {
//             done(error);
//         }
//     });
// });