
require('babel-register')({
  presets: ['react']
})
var express = require('express')
var React = require('react')
var ReactDomServer = require('react-dom/server')
var Component = require('./Component.jsx')

var app = express();


app.get('/', function(req, res){
  var html = ReactDomServer.renderToString(
    React.createElement(Component)
  )
  res.send(html);
});

var port = 3000;

app.listen(port, function(){
  console.log("localhost:" + port);
});
