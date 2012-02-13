var ReviewSession = (function () {
	// Private
	var _flashcards;
	var _type;
	
	// State
	var current = 0;
	var count = 0;
	var correct = 0;
	var question = null;
	var answer = null;
	var hint = null;
	
	// Returns true if the submitted answer is correct
	function validate (answer) {
		var flashcard = _flashcards[current];
		return flashcard.answer.toLowerCase() == answer.toLowerCase();
	}
	
	// Update the display on the question, answer, and hint cards
	function newQuestion () {
		var flashcard = _flashcards[current];
		question.val(flashcard.body);
		answer.val(flashcard.answer);
		hint.val(flashcard.hint || "");
	}
	
	function updateCounts () {
		$('#review .cardInfo .count').text('Question: ' + [current, count].join('/'));
		$('#review .cardInfo .numCorrect').text([correct, count].join('/') + ' correct');
	}
	
	function shuffleArray (array) {
		var tmp, current, top = array.length;
		if (top) {
			while (--top) {
				current = Math.floor(Math.random() * (top+1));
				tmp = array[current];
				array[current] = array[top];
				array[top] = tmp;
			}
		}
		return array;
	}
	
	// Public
	return {
		init: function (type, flashcards, shuffle) {
			_flashcards = flashcards;
			_type = type;
			if (shuffle) {
				shuffleArray(_flashcards);
			}
			// Initialize state
			count = _flashcards.length;
			question = $('#review .flashcard.front textarea');
			answer = $('#review .flashcard.back textarea');
			hint = $('#review .flashcard.hint textarea');
		},
		start: function () {
			var self = this;
			// Bind to the answer input
			$('#submitAnswer').bind('submit', function (e) {
				e.preventDefault();
				// Get the submitted answer
				var result = validate(this["answer"].value);
				// Clear the answer field
				this["answer"].value = "";
				result ? self.next() : self.markIncorrect();
			});
			// Bind to pass
			$('#skipButton').bind('click', function () {
				self.next(true);
			});
			// Bind to show hint
			$('#hintButton').bind('click', function () {
				$('#review .flashcard.hint').toggle();
				$(this).val('Hide Hint');
			});
			// Bind to show answer
			$('#answerButton').bind('click', function () {
				$('#review .flashcard.back').toggle();
				$(this).attr('disabled', 'disabled');
				$('#hintButton').attr('disabled', 'disabled');
				$('#skipButton').val('Next');
			});
			newQuestion();
			updateCounts();
		},
		next: function (pass) {
			current += 1;
			// Update the count and correct
			if (!pass) {
				correct += 1;
				$('#result').text('Correct!');
				$('#result').addClass('correct').removeClass('incorrect');
				updateCounts();
			}
			if (current < count) {
				newQuestion();
			} else {
				// Done!
				$('#answerButton').attr('disabled', 'disabled');
				$('#hintButton').attr('disabled', 'disabled');
				$('#skipButton').attr('disabled', 'disabled');
				$('#result').text('Finished');
				$('#result').addClass('finish').removeClass('correct');
			}
		},
		markIncorrect: function () {
			$('#result').addClass('incorrect').removeClass('correct');
			$('#result').text('Sorry, incorrect!');
		}
	};
})();