import { addPhoto } from "../../Firebase/functions/addPhoto";
import { deletePhoto } from "../../Firebase/functions/addPhoto";
import regeneratorRuntime from "regenerator-runtime";

test('Test so Jest can run', () => {
    expect(true).toBeTruthy();
});

/*
const file = new File(["Foo"], "test.jpeg", {type: "image/jpeg"});
var photoID;

localStorage.setItem("username", "test123");



test("file upload should be successful", (done) =>{
    try{
        addPhoto(file, "test", 
        (callback) => {
            expect(callback).not.toBeNull(); //check if the function return something
            photoID = callback;
        });
        done();
    }
    catch(error) {
        done(error)
    }
}, 15000);


test("file uploaded should be deleted", (done) => {
    console.log(photoID)
    done();
    
    try{
        deletePhoto(photoID, (callback) => {
            expect(callback).toBe(photoID+" successfully deleted")
        });
        done();
    }
    catch(error) {
        done(error)
    }
    
}, 15000)

*/