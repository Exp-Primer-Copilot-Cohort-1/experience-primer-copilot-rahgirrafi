//create web server
var express = require('express');
var app = express();
var port = 3000;
var fs = require('fs');
var bodyParser = require('body-parser');
var comments = require('./comments.json');
var path = require('path');

//set up the template engine
app.set('view engine', 'ejs');

//set up the static files
app.use(express.static('./public'));

//fire body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//listen to the port
app.listen(port);
console.log('You are listening to port ' + port);

//Routes
//get the home page
app.get('/', function(req, res){
    res.render('index', {comments: comments});
});

//post a comment
app.post('/', function(req, res){
    var comment = req.body;
    comments.push(comment);
    fs.writeFile('./comments.json', JSON.stringify(comments), function(err){
        if(err) throw err;
        console.log('Saved!');
    });
    res.redirect('/');
});

//delete a comment
app.delete('/delete/:id', function(req, res){
    comments.splice(req.params.id, 1);
    fs.writeFile('./comments.json', JSON.stringify(comments), function(err){
        if(err) throw err;
        console.log('Deleted!');
    });
    res.redirect('/');
});

//edit a comment
app.put('/edit/:id', function(req, res){
    var comment = req.body;
    comments[req.params.id] = comment;
    fs.writeFile('./comments.json', JSON.stringify(comments), function(err){
        if(err) throw err;
        console.log('Edited!');
    });
    res.redirect('/');
});

//get the edit page
app.get('/edit/:id', function(req, res){
    res.render('edit', {comment: comments[req.params.id], id: req.params.id});
});

//get the delete page
app.get('/delete/:id', function(req, res){
    res.render('delete', {comment: comments[req.params.id], id: req.params.id});
});
//end

