var Letter = function (letter) {
  this.character = letter;
  this.hasBeenGuessed = false;
  this.returnCharacter = function () {
    if (this.hasBeenGuessed) {
      return this.character;
    }
    return '_';
  };
  this.guess = function (guessedCharacter) {
    this.hasBeenGuessed = this.character === guessedCharacter;
  };
};

module.exports = Letter;