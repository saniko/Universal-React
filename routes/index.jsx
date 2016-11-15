
var router = require('express').Router()
var React = require('react')
var ReactDomServer = require('react-dom/server')
var Component = require('../views/Layout.jsx')
var ReactRouter = require('react-router')

router.get('*', function(req, res){

  var props = { title: 'eeeeeeee' };

  ReactRouter.match({
    routes: require('./routes.jsx'),
    location: req.url

  }, function(error, redirectLocation, renderProps){
    if(renderProps){

      var html = ReactDomServer.renderToString(
        <ReactRouter.RouterContext {...renderProps}
            createElement={function(Component, renderProps){
              return <Component {...renderProps} custom={props}  />
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
