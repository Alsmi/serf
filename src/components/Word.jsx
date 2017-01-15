var React = require ('react');

require ('./reset.css');
require ('./Base.css');

var Word = React.createClass({
    render: function(){

    	var word = ''.concat(this.props.name+' ').toString();

        return  (
                    <span className="word" onClick={this.props.setActive}>{word}</span>
                );                
    }

});

module.exports = Word;