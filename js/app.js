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
	Flashcard.next();
	
	$('#reviewFlashcards').bind('click', function () {
		// Retrieve list of flashcard sets
		$.ajax({
			url: 'http://localhost:3000/method/flashcards',
			type: 'GET',
			crossDomain: true,
			success: function (data, status) { },
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
			success: function (data, status) { },
			error: function (xhr, status, err) { }
		});
	});
});
