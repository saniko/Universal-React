# Universal-React
React Universal Explained - Educational Purposes,
Will evolve with time to full universal react app

# Universal app - main players on server side:

1. react
2. react-router - https://github.com/ReactTraining/react-router/blob/master/docs/guides/ServerRendering.md
    1. match - to match the routes to a location without rendering.
    2. RouterContext - for synchronous rendering of route components.
    3. createMemoryHistory - This is useful for when you need to customize the history object used for server-side rendering.
3. react-redux - http://redux.js.org/docs/recipes/ServerRendering.html
    1. very short redux explanation: http://slides.com/jenyaterpil/redux-from-twitter-hype-to-production#/9
    2. TL;DR - Redux: Redux at its most minimal is the store, actions, and reducers. Connecting React to Redux involves wrapping your     entire app in theProvider component, and then connecting components, usingmapStateToProps and mapDispatchToProps as appropriate.
    3. check this out: https://tech.affirm.com/redux-patterns-and-anti-patterns-7d80ef3d53bc#.rznvukc9g

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

# Links:




# *
Say I want to pre-render my app on the server, serve the html to the client, then re-render my app on the client. This would be trivial if my app only consisted of static data. However, my app is stateful: it retrieves data from my API before the initial render and stores it. By extracting the state of my app on the server, sending it along with the HTML, then reinjecting it on the client, I avoid making two requests to my API.
for more see: http://stackoverflow.com/questions/29824908/what-does-dehydrate-and-rehydrate-stand-for-in-fluxible


