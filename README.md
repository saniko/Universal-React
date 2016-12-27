# Universal-React
**** Work In Progress *** <br><br>
Universal/isomorphic/ssr(server-side rendering) react explained for my own educational purposes with the hope it will help others as well.

A lot has been written about this topic, you can easily find plenty of material out there, so I will try to summarize the essence of what I have learned with an emphasis on non-trivial scenarios.

Will evolve with time to full universal react app, so stay tuned.

Part of Dani Koren's personal [blog](https://saniko.github.io/danikoren/).



# Good to know
1. For an excellent starting point to those who seek to understand the modern javascript technology stack click [here](https://github.com/verekia/js-stack-from-scratch)
2. For React code samples click [here](https://github.com/rdig/react-code-samples)

# So what is it?
To summarize this in one (long) sentence:
Building a fully featured client-side application that can be rendered on the server as well, and by fully featured we mean that it includes routing, async data fetching and state management.

So basically we pre-render our app on the server and serve the generated html to the client.


# Universal app - main players on server side:

1. react - using React.renderToString, enables us to render components on the server side, the component is only rendered, but not    mounted, so any methods related to mounting are not called.
2. react-router - https://github.com/ReactTraining/react-router/blob/master/docs/guides/ServerRendering.md
    1. match - to match the routes to a location without rendering.
    2. RouterContext - for synchronous rendering of route components, Once we have a match RouterContext will render the component tree for the given router state and return the component markup as a string with the help of renderToString method.
    3. createRoutes - to create a set of routes from our router.js file component and provide it to match.
    4. createMemoryHistory - This is useful for when you need to customize the history object used for server-side rendering.
3. react-redux - http://redux.js.org/docs/recipes/ServerRendering.html
    1. very short redux diagram explanation: http://slides.com/jenyaterpil/redux-from-twitter-hype-to-production#/9, 
       on with side effects http://slides.com/jenyaterpil/redux-from-twitter-hype-to-production#/23.
    2. TL;DR - Redux: Redux at its most minimal is the store, actions, and reducers. Connecting React to Redux involves wrapping your     entire app in theProvider component, and then connecting components, usingmapStateToProps and mapDispatchToProps as appropriate.
    3. check this out: https://tech.affirm.com/redux-patterns-and-anti-patterns-7d80ef3d53bc#.rznvukc9g
    4. good read about <a href="https://medium.com/javascript-scene/10-tips-for-better-redux-architecture-69250425af44#.c16bnn710">redux</a>

# Universal app - Why?

1. SEO - allows search engines to crawl your pages
2. Performance (initial load time)
3. Cross device support
4. Same code base (sharing of logic)
5. Catching current trends ;)
6. Non js users (?)

In general, benefits for engineering, reusability, performance and SEO<br>
If you call ReactDOM.render() on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.<br>

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

## SO to recap ssr
1. Handle the initial render when a user (or search engine crawler) first requests our app. When the server receives the request, it        renders the required component(s) into an HTML string, and then sends it as a response to the client. From that point on, the client     takes over rendering duties.
2. Send the state of our app along in our response, so the client can use it as the initial state. if we preload any data before            generating the HTML, we want the client to also have access to this data. Otherwise, the markup generated on the client won’t match      the server markup, and the client would have to load the data again.
3. Create a fresh, new Redux store instance on every request.On the client side, a new Redux store will be created and initialized with     the state provided from the server.
4. Optionally dispatch some actions.
5. Pull the state out of store.
6. Pass the state along to the client (dehydration - extract the current state of an app and serialize it into an object * ).
7. Package & send the HTML to the client
8. On the client side, a new Redux store will be created and initialized with the state provided from the server.
    Redux's only job on the server side is to provide the initial state of our app.

Check server.js for detailed comments.

# Universal app - Problems?
One downside of SSR is a huge performance hit on <b>complex components</b><br>
renderToString() is synchronous, the server is blocked while it runs! <br>

One can try and mitigate this by implementing <a href="https://medium.com/walmartlabs/reactjs-ssr-profiling-and-caching-5d8e9e49240c#.ucelx81s6">cache techniques</a> and <a href="https://www.youtube.com/watch?v=sn-C_DKLKPE">Component Memoization techniques</a><br>
<br>Consider this: <a href="http://www.electrode.io/docs/server_side_render_cache.html">Server Side Render Caching + Profiling</a>
<br> check <a href="https://github.com/walmartlabs/react-ssr-optimization">this</a>
<br> check <a href="https://github.com/docs-code-examples-electrode-io/express-react-redux-webpack">this</a>

Potentially, client code can break the server...
When we share the code base, there is always the possibility of client code breaking the server.<br>
Excellent talk on this topic can be found <a href="https://www.youtube.com/watch?v=PnpfGy7q96U">here</a>

# General:

# *
Say I want to pre-render my app on the server, serve the html to the client, then re-render my app on the client. This would be trivial if my app only consisted of static data. However, my app is stateful: it retrieves data from my API before the initial render and stores it. By extracting the state of my app on the server, sending it along with the HTML, then reinjecting it on the client, I avoid making two requests to my API.
for more see: http://stackoverflow.com/questions/29824908/what-does-dehydrate-and-rehydrate-stand-for-in-fluxible
<br>
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



