# React SSR:

1. <strong>Universal rendering</strong> using the <strong><a href="https://facebook.github.io/react/docs/react-dom-server.html#rendertostring">renderToString()</a></strong> method which renders a component to its initial HTML<br>

2. <strong>Universal routing</strong> like <strong><a href="https://github.com/ReactTraining/react-router/blob/master/docs/guides/ServerRendering.md">react-router</a></strong> associating views with routes both on the client and the server. Additional options for universal routing are: <a href="http://router5.github.io/">router5</a> and <a href="https://www.kriasoft.com/universal-router/">universal-router</a>

3. <strong>Universal data fetching</strong> like <strong><a href="https://github.com/Pitzcarraldo/universal-fetch">universal-fetch</a></strong> retrieving data (usually via API) through both the client and the server<br>
Additional options for Universal data fetching: <a href="https://github.com/nodejitsu/node-http-proxy">http-proxy</a> and <a href="https://github.com/mzabriskie/axios">axios</a><br>
In the case of our components fetching asynchronous data, we need to pre-fetch that data before rendering on the server. 
Due to renderToString synchronous nature, we cannot use the recommended componentDidMount lifecycle method for ajax call, renderToString simply won't wait for the ajax call to complete. A typical pattern is to add a static method named fetchData() on our top level components that deals with asynchronous data fetching. 
Once react-router's match() method will match the specific route to it's designated location, we will iterate over the renderProps attribute, looking for that static fetchData() method, invoke it with a redux dispatcher, and wait for the promises to resolve.
Once all promises resolved we can render using renderToString().<br>

4. <strong>Universal state management</strong> like <strong><a href="https://github.com/reactjs/redux/blob/master/docs/recipes/ServerRendering.md">redux</a></strong> manage changes of state both the client and the server<br>
Additional options for Universal state management: <a href="https://mobxjs.github.io/mobx/">mobx</a> and <a href="https://github.com/cerebral/cerebral">cerebral</a>

5. <strong>Universal mounting</strong> mounting react with server-rendered components requires us to supply the same props both on the client and server.<br> we can do that by <a href="https://github.com/reactjs/redux/blob/master/docs/recipes/ServerRendering.md#inject-initial-component-html-and-state">injecting the props </a>into a script tag for client retrieval.<br>

Additional options:<br>
<a href="https://github.com/navgarcha/redux-thunk-saga">redux-thunk-sage</a>





Good presentation:<br>
http://loige.co/my-universal-javascript-web-applications-talk-at-codemotion-milan-2016-2/<br>
http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/11<br>
https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-4-site-is-progressively-enhanced-b5ad7cf7a447#.jqvf41rpu

async redux:<br>
https://medium.com/@jtbennett/asynchronous-actions-in-redux-8412cf92a26f#.fnyfwngxu<br>
https://medium.com/@zackargyle/advanced-redux-action-types-d5a71ed44e16#.kbrkp7uwq
