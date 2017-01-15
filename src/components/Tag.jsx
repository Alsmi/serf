var React = require ('react');

require ('./reset.css');
require ('./Base.css');

var Tag = React.createClass({
    render: function(){

        return  (
                    <li>
                        <span className="tag-name" onClick={this.props.setActive}>{this.props.name}</span>
                    </li>
                );  
                              
    }
});

module.exports = Tag;