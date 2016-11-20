var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute; // default route
var browserHistory = ReactRouter.browserHistory;



// using an ES6 transpiler, like babel
import { BrowserRouter, Match, Link } from 'react-router'


if (typeof window === 'object') {
    function createElement(Component, props) {
        return <Component {...props} custom={window.PROPS} />;
    }
}

module.exports = (
  <Router history={browserHistory} createElement={createElement}>
     <Route path='/' component={require('../views/Layout.jsx')}>
         <IndexRoute component={require('../views/Index.jsx')} />
         <Route path='about' component={require('../views/About.jsx')} />
     </Route>
 </Router>
);
