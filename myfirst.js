var express = require('express');
var router = express.Router();
const firebase = require('firebase');
const config = require('./functions/util/FirebaseConfig');
const addPhoto = require('./functions/addPhoto');

firebase.initializeApp(config);
var server = express();

server.set('view engine','ejs');

server.get('/',function(req,res){
  res.render('index');
});

server.get('/add.ejs',function(req,res){
  res.render('add');
});

server.post('/add.ejs', addPhoto.UploadImage());

server.listen(8080);
