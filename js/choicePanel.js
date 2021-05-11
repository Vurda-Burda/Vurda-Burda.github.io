"use strict"

document.querySelector(".sNake").addEventListener("click", () => {
    if (document.querySelector(".snake").style.display == "none") {
        document.querySelector(".snake").style.display = "block";
        document.querySelector(".cross-zero").style.display = "none";

    } else {
        // document.querySelector(".snake").style.display = "none";
    }
});

document.querySelector(".crossZero").addEventListener("click", () => {
    if (document.querySelector(".cross-zero").style.display == "none") {
        document.querySelector(".cross-zero").style.display = "block";
        document.querySelector(".snake").style.display = "none";
    } else {
        // document.querySelector(".cross-zero").style.display = "none";
    }
});