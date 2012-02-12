var mongoose = require('mongoose');
var schema = require('../schema.js');

mongoose.connect('mongodb://localhost/flash');

schema.defineModels(mongoose, function(){
	User = mongoose.model('User');
	FlashCard = mongoose.model('FlashCard');
	FlashCardList = mongoose.model('FlashCardList');
    });

var a = new FlashCard({body:"what is your name",
	    answer:"bobo",
	    hint:"not bobo"
    });

var b = new FlashCard({body:"what is your last name",
	    answer:"bobog"
    });

a.save(function(err) {
	if(err) console.log(err);
	console.log("saved a"); }); 

b.save(function(err) {
	if(err) console.log(err);
	console.log("saved b"); }); 

c = new FlashCardList({setName:"people's names",
		       FlashCards: [a,b],
		       kind: "Q/A"
    });

c.save(function(err) {
	if(err) console.log(err);
	console.log("saved c"); });
