
// Create the dom objects representing the flashcard sets
function loadFlashcardSets (data) {
	var container = $('#flashcardSets');
	// Unload the current sets
	container.children().remove();
	// Create dom objects to render
	var sets = "";
	var template = '<input type="radio" name="flashcards" value="{id}"><label>{name}</label><br />';
	for (var i = 0; i < data.length; i++) {
		sets += template.replace('{id}', data[i]._id).replace('{name}', data[i].setName);
	}
	
	if (!sets) {
		// The user doesn't have any flashcards to review
		sets = '<p>You don\'t have any flashcards to review!</p>';
		// Disable the review button
		$('#reviewOptions .accordionButton').disable();
	}
	
	container.append(sets);
}

// Load the flashcard data
function loadFlashcards (data) {
	
}

$(document).ready(function () {
	Accordion.allowMultiple = true;
	Accordion.groupBySets = true;
	
	// Options set
	Accordion.create({
		header: '#createFlashcards',
		body: '#createOptions',
		container: '#container',
		set: 'options',
		child: 'flashcards'
	});
	Accordion.create({
		header: '#reviewFlashcards',
		body: '#reviewOptions',
		container: '#container',
		set: 'options',
		child: 'flashcards'
	});
	
	// Flashcards set
	Accordion.create({
		header: '#createOptions .accordionButton',
		body: '#flashcards #create',
		container: '#container',
		set: 'flashcards'
	});
	Accordion.create({
		header: '#reviewOptions .accordionButton',
		body: '#flashcards #review',
		container: '#container',
		set: 'flashcards'
	});
	
	// Bind events for flash cards
	Flashcard.init({
		front: '#create .front',
		back: '#create .back',
		count: '#create .count',
		commitButton: '#create .actionButton',
		textarea: true
	});
	// Create a blank flashcard for the user to edit
	Flashcard.next();
	
	$('#reviewFlashcards').bind('click', function () {
		// Retrieve list of flashcard sets
		$.ajax({
			url: 'http://localhost:3000/method/flashcards',
			type: 'GET',
			crossDomain: true,
			success: function (data, status) {
				console.log('got success');
				console.log(data);
				// Load the data
				loadFlashcardSets(data.data);
			},
			error: function (xhr, status, err) { }
		});
	});
	
	$('#reviewOptions .accordionButton').bind('click', function () {
		var id = null;
		// Retrieve the list of flashcards
		$.ajax({
			url: 'http://localhost:3000/method/flashcards/:id',
			type: 'GET',
			crossDomain: true,
			success: function (data, status) {
				console.log('retrieved flashcards');
			},
			error: function (xhr, status, err) { }
		});
	});
});
