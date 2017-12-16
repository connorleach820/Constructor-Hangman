var Word = require("./word.js");
var prompt = require("prompt");

console.log("Command-Line NFL Hangman!");
console.log("Start by guessing the letter of an NFL team.");
console.log("Good Luck and Have Fun!");
console.log("----------------------");
prompt.start();

game = {
	wordBank: ["Pittsburgh Steelers", "Baltimore Ravens", "Cleveland Browns", "Cincinnati Bengals", "New England Patriots", "New York Jets",
			   "Buffalo Bills", "Miami Dolphins", "Tennessee Titans", "Indianapolis Colts", "Jacksonville Jaguars", "Houston Texans",
			   "Kansas City Chiefs", "Oakland Raiders", "Los Angeles Chargers", "Denver Broncos", "Philadelphia Eagles", "Dallas Cowboys",
			   "Washington Redskins", "New York Giants", "Minnesota Vikings", "Green Bay Packers", "Detroit Lions", "Chicago Bears",
			   "Carolina Panthers", "New Orleans Saints", "Atlanta Falcons", "Tampa Bay Buccaneers", "Los Angeles Rams", "Seattle Seahawks",
			   "Arizona Cardinals", "San Francisco 49ers"],
	wordsCorrect: 0,
	guessesRemaining: 10,
	currentWord: null,

	startGame: function (word) {
		this.resetGuesses();
		this.currentWord = new Word(this.wordBank[Math.floor(Math.random()*this.wordBank.length)]);
		this.currentWord.getLet();
		this.promptUser();
	},

	resetGuesses: function() {
		this.guessesRemaining = 10;
	},

	promptUser: function() {
		var self = this;
		prompt.get(["guessLet"], function(error, result) {
			console.log("You guessed: " + result.guessLet);
			var numberGuessed = self.currentWord.checkLetter(result.guessLet);

			if(numberGuessed == 0) {
				console.log("Sorry, that's incorrect!");
				self.guessesRemaining--;
			} else {
				console.log("Nice work! That's correct!");
					if(self.currentWord.findWord()) {
						console.log("You Won! Congrats!");
						console.log("-------------------");
						return;
					}
			}
			console.log("Guesses remaining: " + self.guessesRemaining);
			console.log("----------------");

			if((self.guessesRemaining > 0) && (self.currentWord.found == false)) {
				self.promptUser();
			}
			else if(self.guessesRemaining == 0) {
				console.log("Game Over!", self.currentWord.target);
			}
			else {
				console.log(self.currentWord.wordRender());
			}
		});
	}
};

game.startGame();