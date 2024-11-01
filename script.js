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

let score0 = 0;
let score1 = 0;
let curScore0 = 0;
let curScore1 = 0;

// generate the starting page
score0Elmt.textContent = 0;
score1Elmt.textContent = 0;
diceImgElmt.classList.add("hidden");

// generate a random dice roll
rollBtnElmt.addEventListener("click", function () {
    let resultRoll = Math.floor(Math.random() * 6) + 1;
    let imgPath = `img/dice-${String(resultRoll)}.png`;
    // console.log(resultRoll, imgPath);
    diceImgElmt.src = imgPath;
    diceImgElmt.classList.remove("hidden");

    if (resultRoll === 1) {
        if (player0Elmt.classList.contains("player--active")) {
            player0Elmt.classList.remove("player--active");
            curScore0 = 0;
            curScore0Elmt.textContent = curScore0;

            player1Elmt.classList.add("player--active");
        } else {
            player1Elmt.classList.remove("player--active");
            curScore1 = 0;
            curScore1Elmt.textContent = curScore1;

            player0Elmt.classList.add("player--active");
        }
    } else {
        if (player0Elmt.classList.contains("player--active")) {
            curScore0 += resultRoll;
            curScore0Elmt.textContent = curScore0;
        } else {
            curScore1 += resultRoll;
            curScore1Elmt.textContent = curScore1;
        }
    }
});

// the hold button
holdBtnElmt.addEventListener("click", function () {
    if (player0Elmt.classList.contains("player--active")) {
        score0 += curScore0;
        score0Elmt.textContent = score0;
        if (score0 >= 100) {
            player0Elmt.classList.add("player--winner");
        } else {
            // switch
            player0Elmt.classList.remove("player--active");
            curScore0 = 0;
            curScore0Elmt.textContent = curScore0;
            player1Elmt.classList.add("player--active");
        }
    } else {
        // player 1 active
        score1 += curScore1;
        score1Elmt.textContent = score1;
        if (score1 >= 100) {
            player1Elmt.classList.add("player--winner");
        } else {
            player1Elmt.classList.remove("player--active");
            curScore1 = 0;
            curScore1Elmt.textContent = curScore1;
            player0Elmt.classList.add("player--active");
        }
    }
});






