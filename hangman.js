const input = require('sync-input')

const words = ['python', 'java', 'swift', 'javascript'];

let attempts = 8;

let win = 0;
let loss = 0;

function getRandomWord(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

function validation(letter) {
  const englishLetters = 'aeioubcdfghjklmnpqrstvwxyz';
  if (letter.length > 1 || letter.length < 1) {
    console.log(`Please, input a single letter.`);
    return false;
  } else if (!englishLetters.includes(letter)) {
    console.log(`Please, enter a lowercase letter from the English alphabet.`);
    return false;
  }
  return letter;
}

function game() {
  const correctWord = getRandomWord(words);
  const letters = correctWord.split('');
  const hiddenWord = "-".repeat(correctWord.length).split('');
  let usedLetters = [];

  while (attempts) {

    if (hiddenWord.join('') === correctWord) {
      console.log(`\nYou guessed the word ${hiddenWord.join('')}!\nYou survived!`);
      win += 1;
      break;

    } else {
      console.log(`\n${hiddenWord.join('')}`);
      let userChoice = validation(input(`Input a letter: `));

      if (userChoice) {

        if (!usedLetters.includes(userChoice)) {

          usedLetters.push(userChoice);
          let indices = [];
          let idx = letters.indexOf(userChoice);

          if (correctWord.includes(userChoice)) {

            while (idx !== -1) {

              indices.push(idx)
              idx = letters.indexOf(userChoice, idx + 1);
            }
            indices.forEach(el => hiddenWord[el] = userChoice);

          } else {
            console.log(`That letter doesn't appear in the word.`);
            attempts -= 1;
          }
        } else {
          console.log(`You've already guessed this letter.`);
        }

      } else {
        continue;
      }
    }

  }
  if (attempts === 0) {
    console.log(`\nYou lost!`);
    loss += 1;
  }
}

function main() {
  console.log(`H A N G M A N  // ${attempts} attempts`);
  while (true) {
    let action = input(`Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit: `);
    if (action === 'play') {
      game();
    } else if (action === 'results') {
      console.log(`You won: ${win} times.\nYou lost: ${loss} times.`);
    } else if (action === 'exit') {
      return false;
    }
  }
}

main();