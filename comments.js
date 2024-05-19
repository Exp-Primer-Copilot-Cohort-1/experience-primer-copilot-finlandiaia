//Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

//Create schema
var commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

var Comment = mongoose.model('Comment', commentSchema);

//Routes
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/comments', function (req, res) {
    Comment.find(function (err, comments) {
        if (err) return console.error(err);
        res.json(comments);
    });
});

app.post('/api/comments', function (req, res) {
    Comment.create(req.body, function (err, comment) {
        if (err) return console.error(err);
        console.log('Comment created!');
        res.sendStatus(200);
    });
});

app.listen(3000, function () {
    console.log('Server running at http://