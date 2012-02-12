/** Database Models */
var User;
var FlashCard;
var FlashCardList;

exports.defineModels = function defineModels( mongoose, cb ){
    var Schema = mongoose.Schema;
    var ObjectId = mongoose.ObjectId;
    User = new Schema({
	    username: {
		type: String,
		index: { unique: true }
	    },
	    password: {
		type: String,
		required: true
	    }
	});
    
    FlashCard = new Schema({
	    body: {
		type: String,
		required: true
	    },
	    answer: {
		type: String,
		required: true
	    },
	    hint: {
		type: String
	    }
	});
    
    FlashCardList = new Schema({
	    setName: {
		type: String,
		required: true
	    },
	    FlashCards:{
		type: [FlashCard],
		required: true
	    },
	    kind: {
		type: String,
		required: true
	    }
	});

    FlashCardList.methods.count = function count(){
	return FlashCards.length;
    };

    mongoose.model('User', User);
    mongoose.model('FlashCard', FlashCard);
    mongoose.model('FlashCardList', FlashCardList);
    if(cb)cb();
};

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
