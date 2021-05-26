"use strict"

let luckyNumber;
let winCounter = 0;
let loseCounter = 0


document.querySelector(".eagle").addEventListener("click", () => {
    luckyNumber = Math.round(Math.random()*10);
    if((0 <= luckyNumber && luckyNumber < 3) || (5 < luckyNumber && luckyNumber <= 8)) {
        winCounter++;
        document.querySelector(".win").innerHTML = `Победа: ${winCounter}`;
    } else {
        loseCounter++;
        document.querySelector(".lose").innerHTML = `Поражение: ${loseCounter}`;
    }
});

document.querySelector(".tails").addEventListener("click", () => {
    luckyNumber = Math.round(Math.random()*10);
    if((3 <= luckyNumber && luckyNumber <= 5) || (8 < luckyNumber && luckyNumber <= 11)) {
        winCounter++;
        document.querySelector(".win").innerHTML = `Победа: ${winCounter}`;
    } else {
        loseCounter++;
        document.querySelector(".lose").innerHTML = `Поражение: ${loseCounter}`;
    }
});

document.querySelector(".circleCoin").addEventListener("click", () => {
    winCounter = 0;
    loseCounter = 0;
    document.querySelector(".win").innerHTML = `Победа: ${winCounter}`;
    document.querySelector(".lose").innerHTML = `Поражение: ${loseCounter}`;
});