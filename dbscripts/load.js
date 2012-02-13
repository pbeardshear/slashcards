var mongoose = require('mongoose');
var schema = require('../schema.js');
var $ = require('jquery');
mongoose.connect('mongodb://localhost/flash');

schema.defineModels(mongoose, function(){
	User = mongoose.model('User');
	FlashCard = mongoose.model('FlashCard');
	FlashCardList = mongoose.model('FlashCardList');
    });

(new FlashCardList({setName:"Physics", kind:"Q/A",
	    FlashCards: [
			 new FlashCard({body:"what is 3+3",
				     answer:"6",
				     hint:"add them"}).save(),
			 new FlashCard({body:"what is 3*3",
				     answer:"9"}).save()
			 ]})).save()

(new FlashCardList({setName:"Pycschology", kind:"Q/A",
	    FlashCards: [
			 new FlashCard({body:"what is 3+3",
				     answer:"6",
				     hint:"add them"}).save(),
			 new FlashCard({body:"what is 3*3",
				     answer:"9"}).save()
			 ]})).save()
