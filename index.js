const Word = require ('./word.js');

const stdin = process.stdin;
const word = new Word('who');

// without this, we would only get streams once enter is pressed
stdin.setRawMode (true);

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume ();

// i don't want binary, do you?
stdin.setEncoding ('utf8');

// on any data into stdin
stdin.on ('data', function (key) {
  // ctrl-c ( u0003 ), ESC (u001B)
  if (key === '\u0003' || key === '\u001B') {
    process.exit ();
  }
  if (/([a-zA-Z])/.test (key)) {
    console.log (key);
    play (key);
  }
});

function play (key) {
  word.guess (key);
  console.log (word.toString ());
  if (wordHasBeenGuessed ()) {
    console.log ('you won');
    process.exit();
  }
}

// require ('keyscan').make_scanner (caught => {
//   console.log ('Caught ' + caught.parsed);
//   while (caught.parsed !== 'escape') {
//     console.log ('hello');
//   }
//   const inquirer = require ('inquirer');
//   inquirer
//     .prompt ([
//       {
//         type: 'input',
//         message: 'What is your name?',
//         name: 'name',
//       },
//     ])
//     .then (answers => {
//       console.log ('answers.name', answers.name);
//     });
// });

// const inquirer = require('inquirer');
// inquirer.prompt([{
//     type: 'input',
//     message: 'What is your name?',
//     name: 'name',
//   }]).then(answers => {
//     console.log("answers.name", answers.name);

// });

// const word = new Word('who');

// console.log(word.toString());
// if (wordHasBeenGuessed()){
//     console.log("you won");

// }
// word.guess('w');
// console.log(word.toString());
// if (wordHasBeenGuessed()){
//     console.log("you won");

// }
// word.guess('h');
// console.log(word.toString());

// if (wordHasBeenGuessed()){
//     console.log("you won");

// }
// word.guess('o');
// console.log(word.toString());
// if (wordHasBeenGuessed()){
//     console.log("you won");

// }
function wordHasBeenGuessed() {
    return (word.toString().indexOf('■') === -1);
}
