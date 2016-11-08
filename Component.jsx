var React = require('react')

module.exports = React.createClass({

  onClick: function(){
    alert('click')
  },

  render: function(){

    // this is without babel
    //return React.createElement('h1', null, 'helloooooo');
    return (
      <div>
          <h1>hiiiii</h1>
          <p>this is text</p>
          <button onClick={this.onClick.bind(this)}>click</button>

      </div>
    )
  }
})
