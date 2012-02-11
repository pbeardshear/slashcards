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
		body: '#flashcards #createFlashcards',
		container: '#container',
		set: 'flashcards'
	});
	Accordion.create({
		header: '#reviewOptions .accordionButton',
		body: '#flashcards #reviewFlashcards',
		container: '#container',
		set: 'flashcards'
	});
});