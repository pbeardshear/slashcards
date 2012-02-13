// Includes
var express = require('express');
var connect = require('connect');
var mongoose = require('mongoose');
var schema = require('./schema.js');

try {
        // Define the models
    mongoose.connect('mongodb://localhost/flash');
    schema.defineModels(mongoose, function(){
	    User = mongoose.model('User');
	    FlashCard = mongoose.model('FlashCard');
	    FlashCardList = mongoose.model('FlashCardList');
	});
    
    // Create server
    var app = express.createServer(express.logger(), express.bodyParser(), express.static(__dirname));
    app.set('views', __dirname + '/views');

    /* These request should be specific to the user but, not sure that
       to do that at the moment so it will return the global values */
    app.get('/method/flashcards', function(request, response){
	    FlashCardList.find({}, function(er, x){
		    console.log(x);
		    response.send({data: x});
		});
	});

    app.get('/method/flashcards/:id', function(request, response){
	    FlashCard.findOne({_id:request.params.id}, function(e, x){
		    response.send({data: x});
		});
	});

    app.post('/method/flashcards', function(request, response){
	    var FlashCards = []
	    for( var i=0; i<request.body.data.length; i++){
		var temp = new FlashCard(request.body.data[i]);
		FlashCards.push(temp);
		temp.save();
	    };
	    (new FlashCardList({setName: request.body.name, kind: request.body.type, FlashCards: FlashCards})).save();
		response.send({ success: true });
	});

    app.listen(process.env.PORT || 3000, function(){
	    console.log("Server Started");
	});
    
    
}
catch (ex) {
	// Log the error
	console.error(ex);
}
