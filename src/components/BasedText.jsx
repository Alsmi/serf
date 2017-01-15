var React = require ('react');
var Paragraph = require('./Paragraph.jsx');
var jQuery = require ('jquery');

require ('./reset.css');
require ('./Base.css');

var BasedText = React.createClass({

    render: function(){

    	if (this.props.text.length) {
    		var textData = this.props.text[0].content.split('\r\n\r\n');
    		var setWordSelect = this.props.setWordSelect;

	        return  (
		        		<div className='text'>

							<h2>Main text</h2>

							<div className='text-field'>
								{
				                    textData.map(function(paragraph, index){
				                        return (
				                            <Paragraph key={index} innerText={paragraph} select={setWordSelect}></Paragraph>
				                        );
				                    })
				                }
							</div>
	                    	
	                    </div>
	                    
	                );
	        } else {
	        	  return  (
		        		<div className='text'>

							<h2>Main text</h2>

							<div className='text-field'>
								
							</div>
	                    	
	                    </div>
	                    
	                );
	        }        
    }

});

module.exports = BasedText;

					