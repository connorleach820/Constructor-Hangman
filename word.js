var Letter = require("./letter.js");

function Word(target) {
	this.target = target;
	this.lets = [];
	this.found = false;

	this.getLet = function() {
		for (var i = 0; i < this.target.length; i++) {
			this.lets.push(new Letter(this.target[i]));
		}
	};

	this.findWord = function() {
		this.found = this.lets.every(function(currentLetter) {
			return currentLetter.appear;
		});
		return this.found;
	};

	this.checkLetter = function(guessLet) {
		var Return = 0;

		for (var i = 0; i < this.lets.length; i++) {
			if (this.lets[i].character == guessLet) {
				this.lets[i].appear = true;
				Return++;
			}
		}
		return Return;
	};

	this.wordRender = function() {
		var string = ' ';
		for (var i=0; i < this.lets.length; i++) {
			string += this.lets[i].letterRender();
		}
		return string;
	};
}

module.exports = Word;