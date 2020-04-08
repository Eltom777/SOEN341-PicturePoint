import { likePost } from "../../Firebase/functions/likePhoto";
import { unlikePost } from "../../Firebase/functions/unlikePhoto";
import { checkLike } from "../../Firebase/functions/checkLike";

const newLike = {
    photo: "581396766658.jpg",
    user: "test123"
};

const likephoto = {
    caption: "Test",
    creationDate: "2010-04-06T17:59:08.986Z",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/picturepoint-381cf.appspot.com/o/undefined.jpg?alt=media&token=5b3fcff3-f725-4029-bd7f-b7c9bbef0b25",
    likes: 0,
    user: "test123"
}

const unlikephoto = {
    caption: "Test",
    creationDate: "2010-04-06T17:59:08.986Z",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/picturepoint-381cf.appspot.com/o/undefined.jpg?alt=media&token=5b3fcff3-f725-4029-bd7f-b7c9bbef0b25",
    likes: 1,
    user: "test123"
}

test("photo liked successfully", done => {
    likePost(newLike, "581396766658.jpg", likephoto);
    checkLike("581396766658.jpg", "test123", data => {
        try{
            expect(data).toBeTruthy();
            done();
        }
        catch(error){
            done(error);
        }
    });
});

test("photo unliked successfully", done => {
    unlikePost("581396766658.jpg", "test123", unlikephoto);
    checkLike("581396766658.jpg", "test123", data => {
        try{
            expect(data).toBeFalsy();
            done();
        }
        catch(error){
            done(error);
        }
    })
});
