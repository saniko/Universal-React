# React SSR:

1. <strong>Universal rendering</strong> using the <strong><a href="https://facebook.github.io/react/docs/react-dom-server.html#rendertostring">renderToString()</a></strong> method which renders a component to its initial HTML<br>

2. <strong>Universal routing</strong> like <strong><a href="https://github.com/ReactTraining/react-router/blob/master/docs/guides/ServerRendering.md">react-router</a></strong> associating views with routes both the client and the server<br>
Additional options for universal routing are:<br>
..* <a href="http://router5.github.io/">router5</a>

<strong>Universal data fetching</strong> like <strong><a href="https://github.com/Pitzcarraldo/universal-fetch">universal-fetch</a></strong> retrieving data (usually via API) through both the client and the server<br>


<strong>Universal state management</strong> like <strong><a href="https://github.com/reactjs/redux/blob/master/docs/recipes/ServerRendering.md">redux</a></strong> manage changes of state both the client and the server<br>

<strong>Universal mounting</strong> mounting react with server-rendered components requires us to supply the same props both on the client and server.<br> we can do that by <a href="https://github.com/reactjs/redux/blob/master/docs/recipes/ServerRendering.md#inject-initial-component-html-and-state">injecting the props </a>into a script tag for client retrieval.




Good presentation:<br>
http://loige.co/my-universal-javascript-web-applications-talk-at-codemotion-milan-2016-2/<br>
http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/11<br>
https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-4-site-is-progressively-enhanced-b5ad7cf7a447#.jqvf41rpu

