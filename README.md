Assessment Task

SERF as an AI product deals with a lot of documents, we often need to tag the words in the documents. This task will simulate that process.
The final product should be a simple interface that shows a block of text with very basic formatting (paragraphs). It should be implemented in clean and well-structured React Redux application that allows the user to mark words as tags, e.g.

The steps include:
•	The candidate must fetch some dummy text from the server and query if there are existing tags associated with the text.
•	If tags already exist then the tags must be highlighted.
•	In order the add a tag the following functionality is required:
	o	User must have ability to click on a word.
	o	When a word is clicked:
		▪	Similar words are selected.
		▪	 An addition (+) button appears in vicinity of selected word.
	o	When the addition button is clicked, the word needs to be set as a tag and saved to the server through redux thunk (or something similar) in a CRUD architecture.
	o	The state of the app must be managed using immutable.js
•	If the candidate has server experience, they can create the REST API endpoints to store the tags and fetch the text (keep it simple), otherwise we will provide one for them.

Note: Use different highlighting for existing tags and marked similar words for the current selection.

