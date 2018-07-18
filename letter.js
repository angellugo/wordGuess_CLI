var Letter = function (letter) {
  this.character = letter;
  this.hasBeenGuessed = false;
  this.guess = function (guessedCharacter) {
    if (this.hasBeenGuessed) return;
    this.hasBeenGuessed = this.character.toLowerCase() === guessedCharacter.toLowerCase();
  };
};

Letter.prototype.toString = function() {
  console.log("testing testing 0,1,2");
  
  if (this.hasBeenGuessed) {
    return this.character;
  }
  return '_';
}

module.exports = Letter;