const Letter = function (letter) {
  this.character = letter;
  this.hasBeenGuessed = false;
  
  this.guess = function (guessedCharacter) {
    if (this.hasBeenGuessed) return;
    this.hasBeenGuessed = this.character.toLowerCase() === guessedCharacter.toLowerCase();
  };
};

Letter.prototype.toString = function() {
  if (this.hasBeenGuessed) {
    return this.character;
  }
  return '■';
}

module.exports = Letter;