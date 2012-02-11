$(document).ready(function () {
	Accordion.allowMultiple = false;
	// Create the accordion controls
	Accordion.create({
		header: '.accordionHeader',
		body: '.accordionBody',
		container: '#signIn'
	});
	
	Accordion.create({
		header: '.accordionHeader',
		body: '.accordionBody',
		container: '#registration'
	});
});
