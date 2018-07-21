const Word = require ('./word.js');
const colors = require ('colors');
const inquirer = require ('inquirer');
const randomWord = require ('random-words');

let word = new Word (randomWord());
let missedLetters = [];

let stdinRawMode = true;
const stdin = process.stdin;
startGame();

function startGame() {
  stdin.setRawMode (stdinRawMode); // to get key presses without enter being pressed
  stdin.resume (); // resume stdin in the parent process (node app won't quit all by itself unless an error or process.exit() happens)
  stdin.setEncoding ('utf8'); // so we don't get binary

  console.log ('\n' + word.toString ());
  process.stdout.write ('Guess a letter: '); //use stdout so that the letter that follows shows in the same line


  // on any data into stdin
  stdin.on ('data', listenForKeypress);
}

function listenForKeypress(key) {
  stdin.setRawMode (stdinRawMode);
  if (!stdin.isRaw) return; // do this for when inquirer is working

  const ctrl_c = '\u0003'; // the ctrl-c key is u0003
  const esc = '\u001B'; // the ESC key is u001B

  const keyIsAlphabetic = /(^[a-zA-Z]$)/.test (key);

  if (key === ctrl_c || key === esc) {
    process.exit ();
  } else if (keyIsAlphabetic) {
    process.stdout.write (key); //use stdout so that the letter that follows shows in the same line
    play (key);
  } else {
    console.log ('Invalid key press'.bgRed);
    process.stdout.write ('Please try again... Guess a letter: '); //use stdout so that the letter that follows shows in the same line
  }
};
function play (letter) {
  if (letterHasAlreadyBeenGuessed (letter)) {
    console.log (
      colors.yellow (' You already guessed ' + letter + '. Try again...')
    );
  } else if (word.guess (letter)) {
    console.log (" You're right!".green);
  } else {
    console.log (' Wrong.Try again!'.red);
    missedLetters.push (letter);
  }

  console.log ('Missed letters: ' + missedLetters.join (',').yellow);

  if (wordHasBeenGuessed ()) {
    console.log ('\n' + word);
    console.log ('\nYou won!!!\n'.rainbow);
    askToPlayAgain ();
  } else if (missedLetters.length === word.length) {
    console.log ('You lost...'.blue);
    console.log (colors.blue ('The word was ' + word.reveal ()));
    askToPlayAgain ();
  } else {
    const guessesRemaining = word.length - missedLetters.length;
    if (guessesRemaining === 1) {
      console.log ('You have 1 guess remaining...');
    } else {
      console.log ('You have ' + guessesRemaining + ' guesses remaining...');
    }

    console.log ('\n' + word);
    process.stdout.write ('Guess a letter: '); //use stdout so that the letter that follows shows in the same line
  }
}

function letterHasAlreadyBeenGuessed (letter) {
  return (
    missedLetters.indexOf (letter.toUpperCase ()) > -1 ||
    missedLetters.indexOf (letter.toLowerCase ()) > -1 ||
    word.toString ().indexOf (letter.toUpperCase ()) > -1 ||
    word.toString ().indexOf (letter.toLowerCase ()) > -1
  );
}

function wordHasBeenGuessed () {
  return word.toString ().indexOf ('■') === -1;
}

function askToPlayAgain (params) {
  stdinRawMode = false;

  inquirer
    .prompt ([
      {
        type: 'confirm',
        message: 'Would you like to play again?',
        name: 'playAgain',
        default: true,
      },
    ])
    .then (function (inquirerResponse) {
      if (inquirerResponse.playAgain) {
        stdinRawMode = true;
        stdin.removeListener('data', listenForKeypress);
        word = new Word (randomWord());
        missedLetters = [];
        startGame();
      } else {
        process.exit ();
      }
    });
}
