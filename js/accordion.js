var Accordion = (function () {
	var _this = { };
	var _accordions = [];
	var _sets = { };
	
	// Private classes ----------------------------------------------------
	// --------------------------------------------------------------------
	function accordion (o) {
		// Maintain closure reference to this accordion
		var _this = this;
		this.header = o.header;
		this.body = o.body;
		this.container = o.container;
		this.open = false;
		this.set = o.set || null;
		this.setChild = o.child || null;
		
		// Bind the click event to the header
		var accordionSelector = [o.container, o.header].join(' ');
		$(accordionSelector).bind('click', function () {
			console.log(accordionSelector);
			_this.toggle(true);
		});
	}
	accordion.prototype.toggle = function () {
		// Toggle this accordion open
		var accordionBodySelector = [this.container, this.body].join(' ');
		$(accordionBodySelector).animate({ height: 'toggle' }, 200);
		this.open = !this.open;
		
		// Toggling one accordion should untoggle all others
		if (Accordion.groupBySets || !Accordion.allowMultiple) {
			var set = Accordion.groupBySets && this.set ? _sets[this.set] : _accordions;
			var self = set.indexOf(this);
			for (var i = 0; i < set.length; i++) {
				if (i != self) {
					set[i].close();
				}
			}
			if (this.setChild) {
				this.closeChildren();
			}
		}
	};
	// Generally toggle is called in most cases for accordions
	// These methods exist to force accordions into particular state regardless of their current position
	accordion.prototype.open = function () {
		var accordionBodySelector = [this.container, this.body].join(' ');
		$(accordionBodySelector).animate({ height: 'show' }, 200);
		this.open = true;
	};
	accordion.prototype.close = function () {
		var accordionBodySelector = [this.container, this.body].join(' ');
		$(accordionBodySelector).animate({ height: 'hide' }, 200);
		this.open = false;
	};
	accordion.prototype.closeChildren = function () {
		var children = _sets[this.setChild];
		var child = children[0];
		for (var i = 0; i < children.length; i++) {
			children[i].close();
		}
		// Bubble the close down the child chain
		if (child.setChild != null) {
			child.closeChildren();
		}
	};
	
	// Public -------------------------------------------------------------
	// --------------------------------------------------------------------
	return {
		allowMultiple: false,
		groupBySets: false,
		create: function (options) {
			var acc = new accordion(options);
			_accordions.push(acc);
			if (this.groupBySets && options.set) {
				if (!_sets[options.set]) {
					_sets[options.set] = [];
				}
				_sets[options.set].push(acc);
			}
		},
		destroy: function () { }
	};
})();
