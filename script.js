'use strict';

let score0Elmt = document.getElementById("score--0");
let score1Elmt = document.querySelector("#score--1");
let diceImgElmt = document.querySelector(".dice");
let rollBtnElmt = document.querySelector(".btn--roll");
let player0Elmt = document.querySelector(".player--0");
let player1Elmt = document.querySelector(".player--1");
let curScore0Elmt = document.getElementById("current--0");
let curScore1Elmt = document.getElementById("current--1");
let holdBtnElmt = document.querySelector(".btn--hold");
let newBtnElmt = document.querySelector(".btn--new");

let hasWinner, scores, curScore, activePlayer;

function init() {
    hasWinner = false;
    scores = [0, 0];
    curScore = 0;
    activePlayer = 0;
    diceImgElmt.classList.add("hidden");

    score0Elmt.textContent = 0;
    score1Elmt.textContent = 0;
    curScore0Elmt.textContent = 0;
    curScore1Elmt.textContent = 0;

    player0Elmt.classList.remove("player--winner");
    player1Elmt.classList.remove("player--winner");
}

init();

const switchPlayer = function () {
    curScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = curScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Elmt.classList.toggle("player--active");
    player1Elmt.classList.toggle("player--active");
};

// generate a random dice roll
rollBtnElmt.addEventListener("click", function () {
    if (!hasWinner) {
        let resultRoll = Math.floor(Math.random() * 6) + 1;
        diceImgElmt.src = `img/dice-${String(resultRoll)}.png`;
        diceImgElmt.classList.remove("hidden");

        if (resultRoll === 1) {
            switchPlayer();
        } else {
            // update the score
            curScore += resultRoll;
            document.getElementById(`current--${activePlayer}`).textContent = curScore;
        }
    }
});

// the hold button
holdBtnElmt.addEventListener("click", function () {
    if (!hasWinner) {
        scores[activePlayer] += curScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            // one side has won, game is finished
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            hasWinner = true;
        } else {
            switchPlayer();
        }
    }
});

// the new game button
newBtnElmt.addEventListener("click", function () {
    if (activePlayer === 1) switchPlayer();
    init();
});
