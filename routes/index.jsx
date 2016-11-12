
var router = require('express').Router()
var React = require('react')
var ReactDomServer = require('react-dom/server')
var Component = require('../Component.jsx')
var ReactRouter = require('react-router')

router.get('*', function(req, res){

  var props = { title: 'pp' };

  ReactRouter.match({
    routes:(
      <ReactRouter.Router>
        <ReactRouter.Router path='/' component={ Component } >

        </ReactRouter.Router>
      </ReactRouter.Router>
    ),
    location: req.url

  }, function(error, redirectLocation, renderProps){
    if(renderProps){

      var html = ReactDomServer.renderToString(
        <ReactRouter.RouterContext {...renderProps}
            createElement={function(Component, renderProps){
              return <Component {...renderProps} {...props} />
            }}
          />

      )
      res.send(html);

    }
    else{
      res.status(404).send("Not Found");
    }
  })

});

module.exports = router;
