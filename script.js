'use strict';

// selecting elements
const player0e = document.querySelector('.player--0');

const player1e = document.querySelector('.player--1');

const score0e = document.querySelector('#score--0');

const score1e = document.getElementById('score--1');

const diceimg = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');

const btnRoll = document.querySelector('.btn--roll');

const btnHold = document.querySelector('.btn--hold');

const current0e = document.getElementById('current--0');

const current1e = document.getElementById('current--1');

const winMessage = function () {
  let winMessageContent = document.createElement('h1');
  winMessageContent.innerHTML = `🎉Player ${activePlayer + 1} Wins!`;
  diceimg.parentNode.replaceChild(winMessageContent, diceimg);
};

let currentScore = 0;
let activePlayer = 0;
let gip = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0e.classList.toggle('player--active');
  player1e.classList.toggle('player--active');
};

const scores = [0, 0];

// Starting conditions

score0e.textContent = 0;
score1e.textContent = 0;
diceimg.classList.add('hidden');

btnRoll.addEventListener('click', function () {
  if (gip) {
    // Generate random dice roll
    const diceroll = Math.trunc(Math.random() * 6) + 1;
    // Display rolled dice
    diceimg.classList.remove('hidden');
    diceimg.src = `dice-${diceroll}.png`;
    if (diceroll !== 1) {
      // Add rolled number to current score
      currentScore = currentScore + diceroll; // Change later
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (gip) {
    // Add current score to active player's score
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check if player's score is >= 100
    if (scores[activePlayer] >= 10) {
      // current player wins
      gip = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      winMessage();
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  window.location.reload();
});


