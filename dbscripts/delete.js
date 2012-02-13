var mongoose = require('mongoose');
var schema = require('../schema.js');

mongoose.connect('mongodb://localhost/flash');
schema.defineModels(mongoose, function(){
	User = mongoose.model('User');
	FlashCard = mongoose.model('FlashCard');
	FlashCardList = mongoose.model('FlashCardList');
    });

User.collection.drop(function(){console.log("a");});
FlashCard.collection.drop(function(){console.log("a");});
FlashCardList.collection.drop(function(){console.log("a");});