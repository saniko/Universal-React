
require('babel-register')({
  presets: ['react']
})

var express = require('express')
var React = require('react')
var ReactDomServer = require('react-dom/server')
var Component = require('./Component.jsx')

var app = express();

// express middleware that serves all file from public directory.
app.use(express.static('public'));

app.get('/', function(req, res){

  var props = { title: 'pp' };

  var html = ReactDomServer.renderToString(
    React.createElement(Component, props)
  )
  res.send(html);
});

var port = 3000;

app.listen(port, function(){
  console.log("localhost:" + port);
});
