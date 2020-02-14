var express = require('express');
const firebase = require('firebase');

firebase.initializeApp(config);
var server = express();

server.set('view engine','ejs');

server.get('/',function(req,res){
  res.render('index');
});

server.get('/add.ejs',function(req,res){
  res.render('add');
})
server.post('/add.ejs',function(req,res){
	
)}
server.listen(8080);
