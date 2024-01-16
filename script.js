'use strict';

let guess, 
  gussedNumber, 
  message, 
  minGuessNumber = window.sessionStorage.getItem('minGuessNumber'), 
  maxGuessNumber = window.sessionStorage.getItem('maxGuessNumber'), 
  attempts = window.sessionStorage.getItem('attempts'), 
  initialAttempts,
  attemptsRemaining, 
  score, 
  highScore = window.sessionStorage.getItem('highScore') || 0;

setTimeout(() => initializeValues(), 500);
setTimeout(() => guessNumber(), 500);

function initializeValues() {

  gussedNumber = document.querySelector('#input-number');
  message = document.querySelector('#message');
  
  minGuessNumber = Number(document.getElementById('minGuess').value) || minGuessNumber || 1;
  maxGuessNumber = Number(document.getElementById('maxGuess').value) || maxGuessNumber || 50;
  attempts = Number(document.getElementById('attempts').value) || initialAttempts || 5;

  minGuessNumber = Math.min(minGuessNumber, 1);
  attempts = Math.min(attempts, 1);

  initialAttempts = attempts;
  
  attemptsRemaining = document.getElementById('attempts-remaining');
  
  setTimeout(() => document.querySelector('#guessBetween').textContent = `(${minGuessNumber} - ${maxGuessNumber})`, 0);
  setTimeout(() => gussedNumber.setAttribute('min', minGuessNumber), 0);
  setTimeout(() => gussedNumber.setAttribute('max', maxGuessNumber), 0);
  setTimeout(() => attemptsRemaining.textContent = attempts, 0);

  window.sessionStorage.setItem('maxGuessNumber', maxGuessNumber);
  window.sessionStorage.setItem('minGuessNumber', minGuessNumber);
  window.sessionStorage.setItem('initialAttempts', initialAttempts);
  
  document.getElementById('modal').style.display = 'none';
}

function guessNumber() {
  guess = Math.trunc(Math.random() * maxGuessNumber) + 1;
  console.log(`Guess: ` + guess);
  displayScores();
  document.querySelector('.mystery').textContent = '?';
}

function displayScores() {
  setTimeout(() => document.querySelector('#attempts-remaining').textContent = attempts, 0);
  setTimeout(() => document.querySelector('#highScore').textContent = highScore, 0);
}

function updateScores() {
  score = ((attempts / initialAttempts) * 100).toFixed(2);
  setTimeout(() => {
    if(score > highScore) {
      confirm(`Hurrah! Your score is the highest score so far. 💥 🎊\nScore is ${score} `);
    } else {
      confirm(`Your score is ${score}`);
    }
    highScore = Math.max(score, highScore);
    window.sessionStorage.setItem('highScore', highScore);
    displayScores();
    setTimeout(alert(
      'To restart guessing, you should click guess another number first🤖'
    ), 0);
  }, 0);
}

function verify() {
  const val = Number(gussedNumber.value);
  
  if (attempts < 1) {
    alert(`You ran out of choices!🏃‍♂️\n ? Number is ${guess} \n Want to try again`);
    guessNumber();
    return;
  }
  message.textContent = `Start Guessing...`;
  setTimeout(() => {
    if (!val) message.textContent = `⛔ Not a Number`;
    else if (val === guess) {
      document.querySelector('.mystery').textContent = val;
      score = ((attempts / initialAttempts) * 100).toFixed(2);
      message.textContent = `🎉 Correct Guess \nYour Score is ${score}`;
      setTimeout(() => updateScores(), 0);
      setTimeout(() => initializeValues(), 0);
    } else if(val < guess && val + 5 > guess) {
      message.textContent = `📉 Just Low (You are close)`;
      attempts--;
    } else if (val < guess) {
      message.textContent = `📉 Too low`;
      attempts--;
    } else if(val > guess && val - 5 < guess) {
      message.textContent = `📈 Just High (You are close)`;
      attempts--;
    } else if (val > guess) {
      message.textContent = `📈 Too High`;
      attempts--;
    }
    displayScores();
  }, 200);
}

function showModel() {
  document.getElementById('modal').style.display = 'flex';
}

function closeModel() {
  document.getElementById('modal').style.display = 'none';
}
