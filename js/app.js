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
		textarea: true
	});
	Flashcard.next();
});
