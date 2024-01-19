document.querySelector(".choiceButton").addEventListener("click", () => {

    if (document.querySelector(".choiceText").innerText == "Сложение") {
        document.querySelector(".verticalSing").style.display = "none";
        document.querySelector(".choiceText").innerText = "Вычитание";
        createNumberPageMinus();
    } else if (document.querySelector(".choiceText").innerText == "Вычитание") {
        document.querySelector(".verticalSing").style.display = "block";
        document.querySelector(".choiceText").innerText = "Сложение";
        createNumberPagePlus();
    };
});

let firstNumber;

let secondNumber;

let rightAnswer = 0;

let wrongAnswer = 0;

function createNumberPagePlus() {

    firstNumber = Math.round(Math.random() * 11);
    document.querySelector(".firstNumber").innerHTML = firstNumber;

    secondNumber = Math.round(Math.random() * 11);
    document.querySelector(".secondNumber").innerHTML = secondNumber;

    document.querySelector(".rightAnswer").innerHTML = rightAnswer;
    document.querySelector(".wrongAnswer").innerHTML = wrongAnswer;

};

function createNumberPageMinus() {

    firstNumber = Math.round(Math.random() * 11 + 10);
    secondNumber = Math.round(Math.random() * 11);

    if (firstNumber > secondNumber) {
        document.querySelector(".firstNumber").innerHTML = firstNumber;
        document.querySelector(".secondNumber").innerHTML = secondNumber;
        document.querySelector(".rightAnswer").innerHTML = rightAnswer;
        document.querySelector(".wrongAnswer").innerHTML = wrongAnswer;
    } else {
        createNumberPageMinus();
    };

};

window.addEventListener("load", createNumberPagePlus);

let button = document.querySelector(".buttonAnswer");
button.addEventListener("click", () => {
    if (document.querySelector(".answer").value) {
        if (firstNumber + secondNumber == document.querySelector(".answer").value && document.querySelector(".choiceText").innerText == "Сложение") {
            document.querySelector(".answer").value = "";
            rightAnswer++;
            createNumberPagePlus();
        } else if (document.querySelector(".choiceText").innerText == "Вычитание" && firstNumber - secondNumber == document.querySelector(".answer").value) {
            document.querySelector(".answer").value = "";
            rightAnswer++;
            createNumberPageMinus();
        } else {
            wrongAnswer++;
            document.querySelector(".answer").value = "";
            document.querySelector(".wrongAnswer").innerHTML = wrongAnswer;
            if (document.querySelector(".choiceText").innerText == "Вычитание") {
                console.log(firstNumber + "-" + secondNumber);
            } else {
                console.log(firstNumber + "+" + secondNumber);
            };
        }
    }
});

document.addEventListener("keydown", (e) => {
    if (event.code == "Enter" || event.code == "Space") {
        if (document.querySelector(".answer").value) {
            if (firstNumber + secondNumber == document.querySelector(".answer").value && document.querySelector(".choiceText").innerText == "Сложение") {
                document.querySelector(".answer").value = "";
                createNumberPagePlus();
                rightAnswer++;
                document.querySelector(".rightAnswer").innerHTML = rightAnswer;
            } else if (document.querySelector(".choiceText").innerText == "Вычитание" && firstNumber - secondNumber == document.querySelector(".answer").value) {
                document.querySelector(".answer").value = "";
                rightAnswer++;
                createNumberPageMinus();
            } else {
                wrongAnswer++;
                document.querySelector(".answer").value = "";
                document.querySelector(".wrongAnswer").innerHTML = wrongAnswer;
                if (document.querySelector(".choiceText").innerText == "Вычитание") {
                    console.log(firstNumber + "-" + secondNumber);
                } else {
                    console.log(firstNumber + "+" + secondNumber);
                };
            };
        }
    }
});

