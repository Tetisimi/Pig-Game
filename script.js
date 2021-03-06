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

const winner = document.querySelector('.final');

let scores, gip, activePlayer, currentScore;

diceimg.classList.add('hidden');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0e.classList.toggle('player--active');
  player1e.classList.toggle('player--active');
};

const winMessage = function () {
  /* Not fully functional
  let winMessageContent = document.createElement('h1');
  winMessageContent.innerHTML = `🎉Player ${activePlayer + 1} Wins!`;
  diceimg.parentNode.replaceChild(winMessageContent, diceimg);
*/
  // Alternative
  winner.classList.remove('final');
  winner.textContent = `🎉Player ${activePlayer + 1} Wins!`;
  diceimg.classList.add('final');
};

const gameReset = function () {
  // Starting conditions

  scores = [0, 0];
  gip = true;
  activePlayer = 0;
  currentScore = 0;

  score0e.textContent = 0;
  score1e.textContent = 0;
  current0e.textContent = 0;
  current1e.textContent = 0;

  player0e.classList.remove('player--winner');
  player1e.classList.remove('player--winner');
  player0e.classList.add('player--active');
  player1e.classList.remove('player--active');

  diceimg.classList.add('hidden');
  winner.classList.add('final');
  diceimg.classList.remove('final');
};

gameReset();

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
    if (scores[activePlayer] >= 100) {
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

btnNew.addEventListener('click', gameReset);