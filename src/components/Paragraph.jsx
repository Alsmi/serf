var React = require ('react');
var Word = require('./Word.jsx');

require ('./reset.css');
require ('./Base.css');

var Paragraph = React.createClass({
    render: function(){

    	var par = this.props.innerText.split(' ');
    	var setWordActive = this.props.select;

        return  (
                    <p className="paragraph">
                    	{
                    		par.map(function(word, index){
		                        return (
		                            <Word key={index} name={word} setActive={setWordActive}></Word>
		                        );
		                    })
                    	}
                    	<br/><br/>
                    </p>
                );                
    }
});

module.exports = Paragraph;