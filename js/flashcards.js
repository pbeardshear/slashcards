var Flashcard = (function () {
	var _flashcards = [];
	var _selectors = { front: null, back: null, frontText: null, backText: null, count: null };
	var active = -1;
	var sides = ['question', 'answer'];
	var activeSide = null;	
	var directions = { 37: 'previous', 39: 'next', 9: 'flip' };
	
	function flashcard (question, answer) {
		this.question = question;
		this.answer = answer;
		this.hint = null;
	}
	// Return a representation of this class that is used for db storage
	flashcard.prototype.marshall = function () {
		return { question: this.question, answer: this.answer };
	};
	
	return {
		init: function (options) {
			_selectors.front = options.front;
			_selectors.back = options.back;
			_selectors.count = options.count;
			if (options.textarea) {
				_selectors.frontText = options.front + ' textarea';
				_selectors.backText = options.back + ' textarea';
			}
			// Maintain closure reference to this
			var self = this;
			// Bind some actions
			$(window).bind('keydown', function (e) {
				// check key press direction
				if (directions[e.which]) {
					e.preventDefault();
					var method = directions[e.which];
					self[method]();
					return true;
				}
				// return false;
			});
			
			if (options.commitButton) {
				$(options.commitButton).bind('click', function () {
					// Save the current flashcard
					self.save();
					// Perform some validation here, before calling commit
					var name = $('#setName').val();
					var type = $('#createOptions [name="testType"]:checked').val();
					if (name && type && _flashcards.length > 0) {
						self.commit(name, type);
					}
				});
			}
		},
		// Change the currently visible side of the flashcard
		flip: function () {
			activeSide = (activeSide + 1) % 2;
			this.save();
			// Toggle visibility of front and back
			this.display();
		},
		previous: function () {
			// Save the current flashcard
			this.save();
			// Move the previous flashcard
			active -= 1;
			activeSide = 0;
			if (active < 0) {
				// If we are at the beginning, wrap around to the end
				active = _flashcards.length - 1;
			}
			this.display();
		},
		// Create a new flashcard, and save the current flashcard
		next: function () {
			// Save the current flashcard
			this.save();
			if (active == _flashcards.length - 1) {
				// Create the new flashcard
				var card = new flashcard("", "");
				active = _flashcards.length;
				activeSide = 0;
				_flashcards.push(card);
			} else {
				active += 1;
				activeSide = 0;
			}
			// Display the new flashcard
			this.display();
		},
		display: function (id, side) {
			active = id || active;
			activeSide = side || activeSide;
			var card = _flashcards[active];
			if (card) {
				$(_selectors.frontText).val(card.question);
				$(_selectors.backText).val(card.answer);
				if (_selectors.count) {
					$(_selectors.count).text('Card: ' + ([active + 1, _flashcards.length].join(' / ')));
				}
				if (activeSide == 0) {
					$(_selectors.front).show();
					$(_selectors.frontText).focus();
					$(_selectors.back).hide();
				} else {
					$(_selectors.front).hide();
					$(_selectors.back).show();
					$(_selectors.backText).focus();
				}
			}
		},
		read: function (side, id) {
			return id && side ? _flashcards[id][side] : _activeFlashcard[_sides[_activeSide]];
		},
		// Update an existing flashcard
		save: function (id) {
			var question = $(_selectors.frontText).val();
			var answer = $(_selectors.backText).val();
			var card = _flashcards[id || active];
			if (card) {
				card.question = question;
				card.answer = answer;
			}
		},
		// Delete an existing flashcard
		destroy: function (id) {
			var card = id || active;
			delete _flashcards[card];
		},
		// Send the results up to the server, if this user is logged in
		// Otherwise, save it in localstorage
		commit: function (setName, questionType) {
			// Build up the data list
			var data = [];
			for (var i = 0; i < _flashcards.length; i++) {
				data.push(_flashcards[i].marshall());
			}
			$.ajax({
				url: 'http://localhost:3000/method/flashcards',
				type: 'POST',
				data: { data: data, type: questionType, name: setName },
				success: function (data, status) { },
				error: function (xhr, status, err) { }
			});
		}
	};
})();
