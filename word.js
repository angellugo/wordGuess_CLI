const Letter = require ('./letter.js');

const Word = function (word) {
  this.word = [];

  for (let index = 0; index < word.length; index++) {
    this.word.push (new Letter (word.charAt (index)));
  } //end for

  this.guess = function (character) {
    let result = false;
    this.word.forEach (letter => {
      result = result || letter.guess (character);
    }); // end this.word.forEach (letter => {
    return result;
  }; // end this.guess = function(character){

  this.reveal = function () {
    this.word.forEach(letter=>{
      letter.hasBeenGuessed = true;
    })
    return this.word.join('');
  }; //end this.reveal = function () {
}; //end constructor function

Word.prototype.toString = function () {
  return this.word.join (' ');
};

Object.defineProperty (Word.prototype, 'length', {
  get: function () {
    return this.word.length;
  },
});

module.exports = Word;
