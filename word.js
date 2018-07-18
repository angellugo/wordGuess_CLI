const Letter = require ('./letter.js');

const Word = function (word) {
  this.word = [];

  for (let index = 0; index < word.length; index++) {
    this.word.push (new Letter (word.charAt (index)));
  } //end for

  this.guess = function (character) {
    this.word.forEach (letter => {
      letter.guess (character);
    }); // end this.word.forEach (letter => {
  }; // end this.guess = function(character){
}; //end constructor function

Word.prototype.toString = function () {
  return this.word.join (' ');
};

module.exports = Word;
