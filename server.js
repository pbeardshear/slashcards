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
	    response.send( FlashCardList.find() );
	});

    app.get('/method/flashcards/:id', function(request, response){
	    response.send( FlashCard.find({_id:request.body.id}) );
	});

    app.post('/method/flashcards', function(request, response){
	    console.log( request.body.data );
	    var FlashCards = []
	    for( var i=0; i<request.body.data.length; i++){
		FlashCards.push( (new FlashCard(request.body.data[i])).save() );
	    }

	    (new FlashCardList({name: request.body.name, kind: request.body.type, FlashCards: FlashCards})).save();
			
	});

    app.listen(process.env.PORT || 3000, function(){
	    console.log("Server Started");
	});
    
    
}
catch (ex) {
	// Log the error
	console.error(ex);
}
