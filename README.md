# SOEN341-PicturePoint

## Description
PicturePoint is a photo-sharing web application. Similar to [Instagram](https://help.instagram.com/424737657584573), users may upload pictures to their profile, follow other users' and like/comment published picutres. This application lets PicturePointers create and be part of groups. Members within these groups will be able to upload and download pictures from this shared space. 
## Objective
PicturePoint focuses on providing a platform to share pictures within a group. This application can be viewed as a shared cloud for images. Each storage space will be controlled by a group of users. The privacy of these shared pictures can also be configured by it's creator. This security measure will be controlled by the Google Authentication service provided in the development plateform: [Firebase](https://firebase.google.com/).
## Core Features
- Login page for users to access their profile
- Signup page allows a user to create a new profile
- Allows the user to create a dynamic network of other users called followers
- Allow users to post pictures with captions
- Allow users to comment and like posts
- Profile page which displays your followers/following, collection of pictures, collection of events, edit profile settings
- Upload pictures to groups and personal profile
### Extra Features
- Create a group/event that store a collection of pictures uploaded by users within that group
- Add/display a collection of events on the profile page
- Allowing only followers to comment and like user's posts
- Feed page that will display all new posts
## Languages/Technologies
- Javascript
- Firebase
- React
- React Router
- Node js
- Material UI
## Contributors
- Liam-Thomas Flynn (Eltom777) - 40034877 (Team leader)
- Jordan Hum (Jordan-Hum) - 40095876
- Anthony Iacampo (a-iacampo) - 40096683
- Thomas Tran (digathomas) - 40095654
- Haocheng Yang (Swnoob) - 40031815
## Features
### SignIn and SignUp
- For the SignIn function, a user needs to input a valid email address and the corresponding password to that email in order to authenticate. If the login information are wrong, an error would show and state the reason.
- SignIn appearence
![SignIn appearence](https://github.com/Eltom777/SOEN341-PicturePoint/blob/dev/sprint4/Documentation/Sign%20In/button%20activated.png)
-SignIn with invalid inputs
![SignIn with invalid inputs](https://github.com/Eltom777/SOEN341-PicturePoint/blob/dev/sprint4/Documentation/Sign%20In/wrong%20input%20information.png)
-SignIn with invalid password
![SignIn with invalid password](https://github.com/Eltom777/SOEN341-PicturePoint/blob/dev/sprint4/Documentation/Sign%20In/wrong%20corresponding%20password.png)
- For the SignUp, a user will have to put a unique user name, a nickname, a email address with the right format and two identical passwords in order to activate the sign up button, any error such as: user name has been taken, email has been taken would stop the signup and is showed by a popup alert.
- SignUp Appearence]
![SignUp Appearence](https://github.com/Eltom777/SOEN341-PicturePoint/blob/dev/sprint4/Documentation/Sign%20Up/Appearence.png)
- SignUp with email error
![SignUp with email error](https://github.com/Eltom777/SOEN341-PicturePoint/blob/dev/sprint4/Documentation/Sign%20Up/sign%20up%20with%20email%20error.png)
- SignUp with password error
![SignUp with password error](https://github.com/Eltom777/SOEN341-PicturePoint/blob/dev/sprint4/Documentation/Sign%20Up/sign%20up%20with%20password%20error.png)
- SignUp with username error
![SignUp with username error](https://github.com/Eltom777/SOEN341-PicturePoint/blob/dev/sprint4/Documentation/Sign%20Up/sign%20up%20with%20username%20error.png)
### Follow and Unfollow
- A user can follow any other user
- A user can't follow twice a user
- A user can unfollow any user he has followed
- A user can't follow himself
- A user sees a list of followers and following
### Likes and Comments
- This feature allows the user to like and unlike a post as well as comment on a post
- Liking a post
![User can like a post](https://github.com/Eltom777/SOEN341-PicturePoint/blob/acceptance_test/likes_comments/Documentation/Likes%20and%20Comments/liked.png)
- Unliking a post
![User can unlike a post](https://github.com/Eltom777/SOEN341-PicturePoint/blob/acceptance_test/likes_comments/Documentation/Likes%20and%20Comments/unliked.png)
- Commenting on a post
![User can comment on a post](https://github.com/Eltom777/SOEN341-PicturePoint/blob/acceptance_test/likes_comments/Documentation/Likes%20and%20Comments/comments.png)
### Update Profile Information
- Change password: in order to change the password, a user needs to input two identical password with at least 6 characters, otherwise, either the button is not activated or it will show an error.
- Change email: in order to change the email, a user needs to input a unique email with the right email format, otherwise there would be some errors that pop out. If the email address is updated successfully, the information would be updated on firebase authentication and on firebase database in the same time.
- Change Nickname: In order to change the nickname, the user need to input a string.
- Change Bio: In order to change the bio, the user need to input a string.
- Update User Info Appearence
![Appearence](https://github.com/Eltom777/SOEN341-PicturePoint/blob/dev/sprint4/Documentation/Profile%20Update/appearence.png)
- password Update with wrong input
![password Update with wrong input](https://github.com/Eltom777/SOEN341-PicturePoint/blob/dev/sprint4/Documentation/Profile%20Update/password%20update(error).png)
- email Update with wrong input 1
![email Update with wrong input 1](https://github.com/Eltom777/SOEN341-PicturePoint/blob/dev/sprint4/Documentation/Profile%20Update/email%20update(fail).png)
- email Update with wrong input 2
[email Update with wrong input 2](https://github.com/Eltom777/SOEN341-PicturePoint/blob/dev/sprint4/Documentation/Profile%20Update/email%20update(fail2.0).png)
