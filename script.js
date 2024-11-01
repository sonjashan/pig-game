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
let hasWinner = false;

// generate the starting page
score0Elmt.textContent = 0;
score1Elmt.textContent = 0;
diceImgElmt.classList.add("hidden");

const switch0To1 = function () {
    player0Elmt.classList.remove("player--active");
    curScore0 = 0;
    curScore0Elmt.textContent = curScore0;
    player1Elmt.classList.add("player--active");
};
const switch1To0 = function () {
    player1Elmt.classList.remove("player--active");
    curScore1 = 0;
    curScore1Elmt.textContent = curScore1;
    player0Elmt.classList.add("player--active");
};

function ifActive0() {
    return player0Elmt.classList.contains("player--active") ? true : false;
}

// generate a random dice roll
rollBtnElmt.addEventListener("click", function () {
    if (!hasWinner) {
        let resultRoll = Math.floor(Math.random() * 6) + 1;
        let imgPath = `img/dice-${String(resultRoll)}.png`;
        // console.log(resultRoll, imgPath);
        diceImgElmt.src = imgPath;
        diceImgElmt.classList.remove("hidden");

        if (resultRoll === 1) {
            if (ifActive0()) {
                switch0To1();
            } else {
                switch1To0();
            }
        } else {
            if (ifActive0()) {
                curScore0 += resultRoll;
                curScore0Elmt.textContent = curScore0;
            } else {
                curScore1 += resultRoll;
                curScore1Elmt.textContent = curScore1;
            }
        }
    }
});

// the hold button
holdBtnElmt.addEventListener("click", function () {
    if (!hasWinner) {
        if (ifActive0()) {
            score0 += curScore0;
            score0Elmt.textContent = score0;
            if (score0 >= 100) {
                player0Elmt.classList.add("player--winner");
                hasWinner = true;
            } else {
                switch0To1();
            }
        } else {
            // player 1 active
            score1 += curScore1;
            score1Elmt.textContent = score1;
            if (score1 >= 100) {
                player1Elmt.classList.add("player--winner");
                hasWinner = true;
            } else {
                switch1To0();
            }
        }
    }
});

// the new game button
newBtnElmt.addEventListener("click", function () {
    hasWinner = false;
    diceImgElmt.classList.add("hidden");
    score0 = 0;
    score1 = 0;
    curScore0 = 0;
    curScore1 = 0;
    score0Elmt.textContent = score0;
    score1Elmt.textContent = score1;
    curScore0Elmt.textContent = curScore0;
    curScore1Elmt.textContent = curScore1;
    if (player0Elmt.classList.contains("player--winner")) {
        player0Elmt.classList.remove("player--winner");
    } else {
        player1Elmt.classList.remove("player--winner");
        switch1To0();
    }
});






