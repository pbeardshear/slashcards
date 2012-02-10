// Includes
var connect = require('connect');
try {	
	// Create server
	var server = connect.createServer(connect.logger(), connect.static(__dirname));
	server.listen(3000, 'localhost');
}
catch (ex) {
	// Log the error
	console.error(ex);
}

//
//	Documentation
//
// Require: User accounts
// Require: List of flash cards
// Require: Test types
//
// ** Information in brackets is optional
// ---------------------------------------------------------------------------------------------------------
// User Accounts
// ---------------------------------------------------------------------------------------------------------
//	Consist of username, password combination
//	Has several server objects associated with account:
//		- List of created flash card sets
//
// ---------------------------------------------------------------------------------------------------------
// Flash Card List
// ---------------------------------------------------------------------------------------------------------
//	Contains the following information: id, setName, count, flashCardData	
//	A list of flash card objects that represents a contained set
//
// ---------------------------------------------------------------------------------------------------------
// Flash Card
// ---------------------------------------------------------------------------------------------------------
//	Contains the following information: id, bodyData, answer, [title, hint]
//		bodyData - a string containing the question data for the flashcard
//		answer - a string containing the answer to the question OR an object mapping blanks to solutions
//		title - a string representing the title of the flashcard
//		hint - a string that represents a hint to for the question
//
// ---------------------------------------------------------------------------------------------------------
// Test Types
// ---------------------------------------------------------------------------------------------------------
//	Contains the following information: type
//	Represents the type of answer method to use for the flashcards
//	Current allowed types are: fill-in-the-blank, Q/A
//


