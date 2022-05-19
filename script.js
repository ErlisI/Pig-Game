'use strict';

//Selecting Elements
const score01 = document.getElementById('score--0');
const score02 = document.getElementById('score--1');
const curr0 = document.getElementById('current--0');
const curr1 = document.getElementById('current--1');

const players = document.querySelectorAll('.player');
const player01 = document.querySelector('.player--0');
const player02 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score01.textContent = 0;
score02.textContent = 0;
dice.classList.add('hidden');

let scores = [0, 0];
let currScore = 0;
let currPlayer = 0;
let playing = true;

function switchPlayer() {
  currScore = 0;
  document.getElementById(`current--${currPlayer}`).textContent = currScore;

  currPlayer = currPlayer === 0 ? 1 : 0; //switching current player

  player01.classList.toggle('player--active');
  player02.classList.toggle('player--active');
}

//Rolling dice funcitonality
btnRoll.addEventListener('click', function() {

  if (playing) {

    //Gettin a random number
    let diceRoll = Math.trunc(Math.random() * 6) + 1; //1-6
    //Displaying dice
    dice.classList.remove('hidden');
    dice.src = `dice-${diceRoll}.png`;

    if (diceRoll != 1) {
      currScore += diceRoll;
      document.getElementById(`current--${currPlayer}`).textContent = currScore;
      //Switching Player
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function() {

  if (playing) {

    //Storing current score for the current player
    scores[currPlayer] += currScore;
    document.getElementById(`score--${currPlayer}`).textContent = scores[currPlayer];

    if (scores[currPlayer] >= 10) {
      playing = false;
      document.querySelector(`.player--${currPlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${currPlayer}`).classList.remove('player--active')
      dice.classList.add('hidden');

    } else{
      switchPlayer();
    }
  }
});

  //Resets everything
btnNew.addEventListener('click', function(){

  //Set all scores to 0
  currPlayer = 0;
  currScore = 0;
  scores = [0, 0];

  for(let i = 0; i < players.length; i++){
    document.getElementById(`score--${[i]}`).textContent = 0;
    document.getElementById(`current--${i}`).textContent = 0;
    document.querySelector(`.player--${i}`).classList.remove('player--winner');
  }
  
  //Set player 1 as starting player
  document.querySelector(`.player--${currPlayer}`).classList.add('player--active');
  playing = true;
});