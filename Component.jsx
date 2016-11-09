var React = require('react')

module.exports = React.createClass({

  onClick: function(){
    alert('click')
  },

  render: function(){

    // this is without babel
    //return React.createElement('h1', null, 'helloooooo');
    return (

      <html>
               <head>
                   <title>{this.props.title}</title>
                   <link rel='stylesheet' href='/style.css' />
               </head>
               <body>
                   <h1>test</h1>
                   <p>Isn't server-side rendering remarkable?</p>
                   <button onClick={this.onClick}>Click Me</button>
                     <script src='/bundle.js' />
              </body>

           </html>


    )
  }
})
