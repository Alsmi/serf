var React = require ('react');
var Tag = require('./Tag.jsx');

require ('./reset.css');
require ('./Base.css');

var Tags = React.createClass({

    render: function(){

    	if (this.props.tags.length) {

    		var tagsData = this.props.tags;
    		var setTagActive = this.props.setTagActive;

	        return  (
		        		<div className='tags'>

							<h2>Tags</h2>

							<div className='tags-field'>
								<ul>
					                {
					                    tagsData.map(function(tag){
					                        return (
					                            <Tag key={tag.id} name={tag.name} setActive={setTagActive}></Tag>
					                        );
					                    })
					                }
					            </ul>
					        </div>
	                    	
	                    </div>
	                    
	                );
	    } else {
	    	return  (
	                    <div className='tags'>

							<h2>Tags</h2>

							<div className='text-field'></div>
	                    	
	                    </div>
	                );
	    }              
    }

});

module.exports = Tags;