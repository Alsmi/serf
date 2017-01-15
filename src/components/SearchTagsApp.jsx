var React = require ('react');
var jQuery = require ('jquery');
var BasedText = require('./BasedText.jsx');
var Tags = require('./Tags.jsx');

require ('./reset.css');
require ('./Base.css');

var TEXT = [];
var TAGS = [];

var SearchTagsApp = React.createClass({

    getInitialState: function() {
        return {
            text: TEXT,
            tags: TAGS,
            newTag: ''                  
        };
    },

    componentDidMount: function() {
        jQuery.ajax({
            url: 'http://35.167.130.172/api/v1/document/',
            method: 'GET'
        }).done(function(response) {
            TEXT = response;
            this.setState({text: TEXT});
        }.bind(this));

        jQuery.ajax({
            url: 'http://35.167.130.172/api/v1/tag/',
            method: 'GET'
        }).done(function(response) {
            TAGS = response;
            this.setState({tags: TAGS});
        }.bind(this));

    },

    handleHighlightWord: function(root,word,color){
        textNodesUnder(root).forEach(highlightWords);

        function textNodesUnder(root){
            var n,a=[],w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null,false);
            while(n=w.nextNode()) a.push(n);
                return a;
            }

        function highlightWords(n){

            for (var i; (i=n.nodeValue.indexOf(word,i)) > -1; n=after){        
                var after = n.splitText(i+word.length);
                var highlighted = n.splitText(i);
                var mark = document.createElement('mark');
                mark.setAttribute('style', 'display:inline-block;background-color:'+color);
                mark.appendChild(highlighted);
                after.parentNode.insertBefore(mark,after);
            }
        }

        var markArr = root.querySelectorAll('mark');
        for (var j=0; j<markArr.length; j++) {
            markArr[j].parentNode.setAttribute('style','white-space:nowrap');
        }
    },

    removeHighlights: function(root){  

        [].forEach.call(root.querySelectorAll('mark'),function(el){
            el.parentNode.replaceChild(el.firstChild,el);
        });

        for (var i=0; i<root.querySelectorAll('span').length; i++) {
            root.querySelectorAll('span')[i].innerText = ''.concat(root.querySelectorAll('span')[i].innerText).toString();
            root.querySelectorAll('span')[i].removeAttribute('style');
        }

    },

    handleFindAllTags: function() {

        document.getElementById('add-new-tag').classList.remove('active');

        var tagsArr = document.getElementsByClassName('tag-name');
        var wordsArr = document.getElementsByClassName('word');
        var c = function get_random_color() {
            return "#"+((1<<24)*Math.random()|0).toString(16);
        }  

        this.removeHighlights(document.body);
        
        for (var i=0; i<tagsArr.length; i++){
            this.handleHighlightWord(document.body, tagsArr[i].innerText, c());
        }

    },

    tagIsPresent: function (tag) {
        var present = false;

        for (var i = 0; i < TAGS.length; i++) {
            if (tag == TAGS[i].name) {
                present = true;
                break;
            }
        }

        return present;
    },

    handleSetTagActive: function(event) {

        var tag;
        if (event.target.tagName !== 'MARK') {
            if (event.target.className === 'word') {
                tag = event.target.innerText.slice(0,-1);
                if (!this.tagIsPresent(tag)) {
                    document.getElementById('add-new-tag').classList.add('active');
                    this.setState({newTag:tag});
                } else {
                    document.getElementById('add-new-tag').classList.remove('active');
                }


            } else if (event.target.className === 'tag-name') {
                tag = event.target.innerText;
                document.getElementById('add-new-tag').classList.remove('active');
            }
                
            this.removeHighlights(document.body);

            this.handleHighlightWord(document.body, tag, '#fdd501');
        }

    },

    handleAddNewTag: function() {

        var newTag = this.state.newTag;
        var documentNumber = this.state.text[0].id;

        jQuery.ajax({
            url: 'http://35.167.130.172/api/v1/tag/',
            method: 'POST',
            data: {
                name: newTag,
                document: documentNumber
            }
        }).done(function(response) {
            this.state.tags.push(response);
            this.setState({tags: TAGS});
        }.bind(this));
        document.getElementById('add-new-tag').classList.remove('active');
    },

    render: function() {

        return (
            <div className='mainApp clearfix'>
                <BasedText text={this.state.text} setWordSelect={this.handleSetTagActive} />
                <Tags tags={this.state.tags} setTagActive={this.handleSetTagActive} />
                <input type='submit' id='find-all-tags' value="Highlight all tags" onClick={this.handleFindAllTags} />
                <input type='submit' id='add-new-tag' value="Add new tag" onClick={this.handleAddNewTag} />
            </div>
        );
    }

});

module.exports = SearchTagsApp;