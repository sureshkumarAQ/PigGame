'use strict';
/* Selecting elements for starting condition */

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  /* Add Starting Conditions*/
  // score0El.textContent = 0;
  // score1El.textContent = 0;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Swich to next player
  // Reasign the active player

  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Rolling Dice

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.  Generating a Random dice roll
    const randomNo = Math.trunc(Math.random() * 9) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomNo}.png`; // I will add a random snake here

    if (randomNo !== 7 && randomNo !== 8) {
      // Add dice to current score
      currentScore = currentScore + randomNo;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore; // for both player
      //current0El.textContent = currentScore;
    } else if (randomNo === 7) {
      switchPlayer();
    } else if (randomNo === 8) {
      if (scores[activePlayer] > 10) {
        scores[activePlayer] = scores[activePlayer] - 10;
        //score[1]+=currentScore;

        // Display Score
        document.getElementById(`score--${activePlayer}`).textContent =
          scores[activePlayer];
        switchPlayer();
      } else {
        //scores[activePlayer] = scores[activePlayer] + 10;
        currentScore = currentScore + 10;
        switchPlayer();
      }
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player Score
    scores[activePlayer] += currentScore;
    //score[1]+=currentScore;

    // Display Score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check Score>=10
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');

      // document.getElementById(`score--${activePlayer}`).textContent = You Win 🎉🥳;
    } else {
      // Switch to another player
      switchPlayer();
    }
  }
});

// Resetting the game
btnNew.addEventListener('click', init);
