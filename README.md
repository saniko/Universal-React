# Universal-React
**** Work In Progress *** <br><br>
Universal/isomorphic/ssr(server-side rendering) react explained for my own educational purposes with the hope it will help others as well.

A lot has been written about this topic, you can easily find plenty of material out there, so I will try to summarize the essence of what I have learned with an emphasis on non-trivial scenarios.<br>
Will evolve with time to full universal react app, so stay tuned.

Part of Dani Koren's personal [blog](https://saniko.github.io/danikoren/).



# Good to know
1. For an excellent starting point to those who seek to understand the modern javascript technology stack click [here](https://github.com/verekia/js-stack-from-scratch)
2. For React code samples click [here](https://github.com/rdig/react-code-samples)
3. A nice wrap up about "Predictability and Side-effects" click [here](https://hashnode.com/post/what-are-the-benefits-of-redux-thunk-over-redux-saga-what-pros-and-cons-do-they-have-over-each-other-ciqvyydh7065w3g53ffalif61)
4. Managing async actions - [check this](http://www.npmtrends.com/redux-promise-vs-redux-saga-vs-redux-thunk-vs-redux-observable)

# Universal app - what is it?
To summarize this in one (long) sentence:

Building a fully featured client-side application that can be rendered on the server as well, and by fully featured we mean that it includes routing, async data fetching and state management.

So basically we pre-render our app on the server and serve the generated html to the client.


# Universal app - why we need it?

1. SEO - allows search engines to crawl your pages.
2. Performance (initial load time).
3. Cross device support.
4. Same code base (sharing of logic).
5. Non js users.
6. Catching current trends ;)

In general, benefits for **engineering**, **reusability**, **performance** and **SEO**

# Universal app - main concepts:
1. **Universal rendering** using the [renderToString()](https://facebook.github.io/react/docs/react-dom-server.html#rendertostring) method which renders a component to its initial HTML

2. **Universal routing** like  [react-router](https://github.com/ReactTraining/react-router/blob/master/docs/guides/ServerRendering.md) associating views with routes both on the client and the server.<br>
  Additional options for universal routing are: 
  1. [router5](http://router5.github.io/)
  2. [universal-router](https://www.kriasoft.com/universal-router/)
  3. [react-router-component](https://github.com/STRML/react-router-component)
  
  Additional reading:
  
  1. [universal routing options](https://auth0.com/blog/react-router-alternatives/)
  2. [compare](http://www.npmtrends.com/react-router-vs-router5-vs-universal-router-vs-react-router-component/) 
  
3. **Universal data fetching** like  [universal-fetch](https://github.com/Pitzcarraldo/universal-fetch/) retrieving data (usually via API) through both the client and the server<br>
  Additional options for Universal data fetching: 
  1. [http-proxy](https://github.com/nodejitsu/node-http-prox)
  2. [axios](https://github.com/mzabriskie/axios)
 
 
 3.1 __Handling async actions__:

  It is very common for react components to depend on some async operation (usually to fetch data from some API), this can be a __MobX__ action, a __Redux__ action or any other mechanism that alters the global state.

  There are many options to manage async actions on the server, it depends on the global state container (e.g. __Redux__/__Mobx__/__Flux__), additional libraries you may choose to use (e.g. __redux-saga__/__redux-thunk__/__redux-observable__/etc. for side effects management), and your app needs.

  For a recap read the follow:
    1. [Asynchronous actions in Redux](https://medium.com/@jtbennett/asynchronous-actions-in-redux-8412cf92a26f#.3yf5mt103)
    2. [Advanced Redux Action Types](https://medium.com/@zackargyle/advanced-redux-action-types-d5a71ed44e16#.ryhc4h5up)

  
4. **Universal state management** like [redux](https://github.com/reactjs/redux/blob/master/docs/recipes/ServerRendering.md)
manage changes of state both the client and the server<br>
  Additional options for Universal state management: 
  1. [mobx](https://mobxjs.github.io/mobx/)
  2. [cerebral](https://github.com/cerebral/cerebral)

5. **Universal mounting** mounting react with server-rendered components requires us to supply the same props both on the client and server.<br> we can do that by  [injecting the props](https://github.com/reactjs/redux/blob/master/docs/recipes/ServerRendering.md#inject-initial-component-html-and-state) into a script tag for client retrieval.<br>


# Universal app - walkthrough:
1. Handle the initial render when a user (or search engine crawler) first requests our app. When the server receives the request, it        renders the required component(s) into an HTML string, and then sends it as a response to the client. From that point on, the client     takes over rendering duties.
2. Send the state of our app along in our response, so the client can use it as the initial state. if we preload any data before            generating the HTML, we want the client to also have access to this data. Otherwise, the markup generated on the client won’t match      the server markup, and the client would have to load the data again.
3. Create a fresh, new Redux store instance on every request.On the client side, a new Redux store will be created and initialized with     the state provided from the server.
4. Optionally dispatch some actions.
5. Pull the state out of store.
6. Pass the state along to the client (dehydration - extract the current state of an app and serialize it into an object * ).
7. Package & send the HTML to the client
8. On the client side, a new Redux store will be created and initialized with the state provided from the server.
    Redux's only job on the server side is to provide the initial state of our app.
    
      
  In the case of our components fetching asynchronous data, we need to pre-fetch that data before rendering on the server. 
  Due to renderToString synchronous nature, we cannot use the recommended componentDidMount lifecycle method for ajax call, renderToString simply won't wait for the ajax call to complete. A typical pattern is to add a static method named (usually) fetchData() on our top level components that deals with asynchronous data fetching. 
  Once react-router's match() method will match the specific route to it's designated location, we will iterate over the renderProps attribute, looking for that static fetchData() method, invoke it with a redux dispatcher, and wait for the promises to resolve.
  Once all promises resolved we can render using renderToString().<br>
  
 
# Universal app - problems?
One downside of server side rendering is a huge performance hit on __complex components__
renderToString() is synchronous, the server is blocked while it runs! <br>

One can try and mitigate this by implementing <a href="https://medium.com/walmartlabs/reactjs-ssr-profiling-and-caching-5d8e9e49240c#.ucelx81s6">cache techniques</a> and <a href="https://www.youtube.com/watch?v=sn-C_DKLKPE">Component Memoization techniques</a><br>
<br>Consider this: <a href="http://www.electrode.io/docs/server_side_render_cache.html">Server Side Render Caching + Profiling</a>
Additional read on the subject:
[React.js server-side rendering optimization with component memoization and templatization](https://github.com/walmartlabs/react-ssr-optimizatio)
[Electrode modules](https://github.com/docs-code-examples-electrode-io/express-react-redux-webpack)

Additional issue is that potentially, client code can break the server...
When we share the code base, there is always the possibility of client code breaking the server.<br>
Excellent talk on this topic can be found  [here](https://www.youtube.com/watch?v=PnpfGy7q96U)


# Universal app - How?

## React-Router
We need to have the ability to render routes on the server<br>
As opposed to the client, we need to handle 30x responses for redirects and fetching data before rendering.
For this, we use the Router low-level API methods, match for matching routes to a location without rendering and RouterContext for sync rendering of route components.<br><br>
for additional info:<br>
https://github.com/ReactTraining/react-router/blob/master/docs/guides/ServerRendering.md
<br>
## Redux
From redux docs:<br>
To send the data down to the client, we need to:

create a fresh, new Redux store instance on every request;
optionally dispatch some actions;
pull the state out of store;
and then pass the state along to the client.
On the client side, a new Redux store will be created and initialized with the state provided from the server.
Redux's only job on the server side is to provide the initial state of our app.
<br><br>

<br>
# Some usfeul links
code splitting:<br>
http://brotzky.co/blog/a-beginners-step-by-step-guide-to-code-splitting-with-webpack-2-and-react-router/ <br>
Other:<br>
https://ifelse.io/2015/08/28/server-side-rendering-with-react-and-react-router/<br>
https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-4-site-is-progressively-enhanced-b5ad7cf7a447#.owkv7qc0m<br>
http://crypt.codemancers.com/posts/2016-09-16-react-server-side-rendering/<br>
https://medium.com/@foxhound87/server-side-rendering-with-react-router-we-must-react-ep-04-ad03b6b9e05d#.tjpc0sacq<br>
https://medium.com/@foxhound87/state-management-hydration-with-mobx-we-must-react-ep-05-1922a72453c6#.kd04w71a9
https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-4-site-is-progressively-enhanced-b5ad7cf7a447#.qlf149uz3

# Going Forward 
1. What about social login - https://hashnode.com/post/how-to-implement-social-login-in-a-universal-react-app-cityl0c1901zy8t535xj7ox24



