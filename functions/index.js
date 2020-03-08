//Import
const firebaseConfig = require('./Config/config');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
const Busboy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');
const serviceAccount = require('./keys/picturepoint-381cf-firebase-adminsdk-a9cln-a81acf0f10.json');

//Enable CORS
const cors = require('cors');
app.use(cors());

//Initialize the app
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "picturepoint-381cf.appspot.com"
});
const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);
const db = admin.firestore();

//Function to get User from the database
app.get('/getUser', (request, response) => {
    db.collection('users').get().then(data => {
        let users = [];
        data.forEach(doc => {
            users.push({
                userID: doc.id,
                email: doc.data().email,
                username: doc.data().username,
                name: doc.data().name,
                creationDate: doc.data().creationDate
            });
        });
        return response.json(users);
    })
    .catch(err => console.error(err));
});

//Function to get Photo from the database
app.get('/getPhoto', (request, response) => {
    db.collection('photos').orderBy('creationDate', 'desc').get().then(data => {
        let photos = [];
        data.forEach(doc => {
            photos.push({
                photoID: doc.id,
                caption: doc.data().caption,
                imageUrl: doc.data().imageUrl,
                username: doc.data().user,
                creationDate: doc.data().creationDate
            });
        });
        return response.json(photos);
    })
    .catch(err => console.error(err));
});

//Function to get Friends from the database
app.get('/getFriend', (request, response) => {
    db.collection('links').get().then(data => {
        let friends = [];
        data.forEach(doc => {
            friends.push({
                linkID: doc.id,
                followed: doc.data().followed,
                following: doc.data().following
            });
        });
        return response.json(friends);
    })
    .catch(err => console.error(err));
});

//route to post 
app.post('/AddPhoto', (request,response) => {
    
    const busboy = new Busboy({headers: request.headers});

    let imageToBeUploaded = {};
    let imageFileName;
    let caption;

    busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
        console.log(fieldname);
        caption = val;
    });
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        console.log(fieldname, file, filename, encoding, mimetype);
        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
            return response.status(400).json({ error: 'Wrong file type submitted' });
        }
        // my.image.png => ['my', 'image', 'png']
        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        // 32756238461724837.png
        imageFileName = `${Math.round(
            Math.random() * 1000000000000
        ).toString()}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = { filepath, mimetype };
        file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
         caption = val;
    });
    busboy.on('finish', () => {
        const storage = admin.storage();
        admin
        .storage()
        .bucket()
        .upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata: {
            metadata: {
                contentType: imageToBeUploaded.mimetype
            }
            }
        })
        .then(() => {
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
            firebaseConfig.storageBucket
            }/o/${imageFileName}?alt=media`;
            //creating a new document inside  collection photo
            return db.collection('/photos').doc(imageFileName).set({imageUrl,caption,user: 't-flynn', creationDate: new Date().toISOString()}); 
        })
        .then(() => {
            return response.json({ message: 'image uploaded successfully' });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: 'something went wrong' });
        });

    });
    busboy.end(request.rawBody); 
});

//==========================================================================================================================================

//Authentication
const FBAuth = (request, response, next) => {
    let idToken;
    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
        idToken = request.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No token found');
        return response.status(403).json({ error: 'Unauthorized'});
    }

    admin.auth().verifyIdToken(idToken).then(decodedToken => {
        request.user = decodedToken;
        return db.collection('users').where('userID', '==', request.user.uid).limit(1).get();
    })
    .then(data => {
        request.user.username = data.docs[0].data().username;
        return next();
    })
    .catch(err => {
        console.error('Error while verifying token ', err);
        return response.status(403).json(err);
    })
};

//Helper functions
const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(emailRegEx)) return true;
    else return false;
}

const isEmpty = (string) => {
    if(string.trim() === '') return true;
    else return false;
}

//Signup route
app.post('/signup', (request, response) => {
    const newUser = {
        email: request.body.email,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword,
        username: request.body.username,
        name: request.body.name
    };

    //Validate login information
    let errors = {};

    if(isEmpty(newUser.email)) {
        errors.email = 'Must not be empty';
    } else if(!isEmail(newUser.email)) {
        errors.email = 'Must enter a valid email';
    }

    if(isEmpty(newUser.password)) {
        errors.password = 'Must not be empty';
    }else if(newUser.password !== newUser.confirmPassword) {
        errors.confirmPassword = 'Passwords must match'
    }
    if(isEmpty(newUser.username)) {
        errors.username = 'Must not be empty'
    }

    if(Object.keys(errors).length > 0) {
        return response.status(400).json(errors);
    }

    //Validate data
    let token, userID;

    db.doc(`/users/${newUser.username}`).get()
    .then(doc => {
        if(doc.exists){
            return response.status(400).json({ username: 'This username is already taken'});
        } else {
            return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
    })
    .then(data => {
        userID = data.user.uid;
        return data.user.getIdToken();
    })
    .then(tokenID => {
        token = tokenID;
        const userCredentials = {
            username: newUser.username,
            name: newUser.name,
            email: newUser.email,
            creationDate: new Date().toISOString(),
            userID: userID
        };
        return db.doc(`/users/${newUser.username}`).set(userCredentials);
    })
    .then(() => {
        return response.status(201).json({ token });
    })
    .catch(err => {
        console.error(err);
        if(err.code === 'auth/email-already-in-use') {
            return response.status(400).json({ email: 'Email is already in use'})
        } else {
            return response.status(500).json({ error: err.code });
        }
    });
});

//Login route
app.post('/login', (request, response) => {
    const user = {
        email: request.body.email,
        password: request.body.password
    };

    let errors = {};

    if(isEmpty(user.email)) {
        errors.email = 'Must not be empty';
    }
    if(isEmpty(user.password)) {
        errors.password = 'Must not be empty';
    }

    if(Object.keys(errors).length > 0) {
        return response.status(400).json(errors);
    }

    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(data => {
        return data.user.getIdToken();
    })
    .then( token => {
        return response.json({ token });
    })
    .catch(err => {
        console.error(err);
        if(err.code === 'auth/wrong-password' || 'auth/user-not-found') {
            return response.status(403).json({ general: 'Incorrect email or password'});
        } else {
            return response.status(500).json({ error: err.code });
        }
    });
});

//Function to get documents from the database
app.get('/getPhoto', (request, response) => {
    db.collection('photos').orderBy('creationDate', 'desc').get().then(data => {
        let posts = [];
        data.forEach(doc => {
            posts.push({
                photoID: doc.id,
                caption: doc.data().caption,
                userID: doc.data().userID,
                creationDate: doc.data().creationDate
            });
        });
        return response.json(posts);
    })
    .catch(err => console.error(err));
});

//API
exports.api = functions.https.onRequest(app);