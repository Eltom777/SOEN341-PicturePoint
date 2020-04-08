import { commentOnPost } from "../../Firebase/functions/postComment";
import { getComments } from '../../Firebase/functions/getComments';

const newComment = {
    body: "test",
    username: "test123",
    photo_id: "test.jpeg",
    createdAt: "2010-04-06T22:07:39.198Z"
  };

/* test("Comment posted successfully", done => {
    commentOnPost(newComment, data => {
        try {
            expect(data).toBeTruthy();
            done();
        } 
        catch (error) {
            done(error);
        }
    });
}) */