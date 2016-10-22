# Universal-React
**** Work In Progress *** <br><br>
React Universal Explained - Educational Purposes,
Will evolve with time to full universal react app<br>
Part of Dani Koren's personal <a href="https://saniko.github.io/danikoren/">blog.</a>

# Good to know
1. For an excellent starting point to those who seek to understand the modern javascript technology stack click <a href="https://github.com/saniko/js-stack-from-scratch">here</a>.<br>
2. To understand the concept of reactive programming click <a href="https://gist.github.com/staltz/868e7e9bc2a7b8c1f754">here</a>.<br>
3. For React code samples click <a href="https://github.com/rdig/react-code-samples">here</a>.<br>


# Universal app - main players on server side:

1. react
2. react-router - https://github.com/ReactTraining/react-router/blob/master/docs/guides/ServerRendering.md
    1. match - to match the routes to a location without rendering.
    2. RouterContext - for synchronous rendering of route components, Once we have a match RouterContext will render the component tree for the given router state and return the component markup as a string with the help of renderToString method.
    3. createRoutes - to create a set of routes from our router.js file component and provide it to match.
    4. createMemoryHistory - This is useful for when you need to customize the history object used for server-side rendering.
3. react-redux - http://redux.js.org/docs/recipes/ServerRendering.html
    1. very short redux explanation: http://slides.com/jenyaterpil/redux-from-twitter-hype-to-production#/9
    2. TL;DR - Redux: Redux at its most minimal is the store, actions, and reducers. Connecting React to Redux involves wrapping your     entire app in theProvider component, and then connecting components, usingmapStateToProps and mapDispatchToProps as appropriate.
    3. check this out: https://tech.affirm.com/redux-patterns-and-anti-patterns-7d80ef3d53bc#.rznvukc9g
    4. good read about <a href="https://medium.com/javascript-scene/10-tips-for-better-redux-architecture-69250425af44#.c16bnn710">redux</a>

# Universal app - Why?

1. SEO
2. Performance (initial load time)
3. Cross device support
4. Same code base (sharing of logic)
5. Catching current trends ;)
6. Non js users (?)

In general, benefits for engineering, reusability, performance and SEO

# Universal app - How?

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


# General:

# *
Say I want to pre-render my app on the server, serve the html to the client, then re-render my app on the client. This would be trivial if my app only consisted of static data. However, my app is stateful: it retrieves data from my API before the initial render and stores it. By extracting the state of my app on the server, sending it along with the HTML, then reinjecting it on the client, I avoid making two requests to my API.
for more see: http://stackoverflow.com/questions/29824908/what-does-dehydrate-and-rehydrate-stand-for-in-fluxible
<br>
<br>
# Some usfeul links

http://crypt.codemancers.com/posts/2016-09-16-react-server-side-rendering/<br>
https://medium.com/@foxhound87/server-side-rendering-with-react-router-we-must-react-ep-04-ad03b6b9e05d#.tjpc0sacq<br>
https://medium.com/@foxhound87/state-management-hydration-with-mobx-we-must-react-ep-05-1922a72453c6#.kd04w71a9


# Going Forward 
1. What about social login - https://hashnode.com/post/how-to-implement-social-login-in-a-universal-react-app-cityl0c1901zy8t535xj7ox24



