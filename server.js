
require('babel-register')({
  presets: ['react']
})

var express = require('express')
var React = require('react')
var ReactDomServer = require('react-dom/server')
//var Component = require('./Component.jsx')
var Routes = require('./routes/index')

var app = express();

// express middleware that serves all file from public directory.
app.use(express.static('public'));
//app.use(Routes);
app.use(require('./routes/index.jsx'));

var port = 3000;

app.listen(port, function(){
  console.log("localhost:" + port);
});
