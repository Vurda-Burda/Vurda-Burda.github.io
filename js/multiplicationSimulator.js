
        let firstNumber = 2;

        let secondNumber;

        let rightAnswer = 0;

        let wrongAnswer = 0;

        function createNumberPage() {

            document.querySelector(".firstNumber").innerHTML = firstNumber;

            document.getElementById("numberMultiplication").addEventListener("change", (e) => {
                firstNumber = Number(e.target.value);
                document.querySelector(".firstNumber").innerHTML = firstNumber;
            });

            secondNumber = Math.round(Math.random() * 11);

            if (secondNumber > 10) {
                createNumberPage();
            } else {
                document.querySelector(".secondNumber").innerHTML = secondNumber;
            };
            document.querySelector(".rightAnswer").innerHTML = rightAnswer;
            document.querySelector(".wrongAnswer").innerHTML = wrongAnswer;

        };


        window.addEventListener("load", createNumberPage);

        let button = document.querySelector(".buttonAnswer");
        button.addEventListener("click", () => {
            if (document.querySelector(".answer").value) {
                if (firstNumber * secondNumber == document.querySelector(".answer").value) {
                    document.querySelector(".answer").value = "";
                    rightAnswer++;
                    createNumberPage();
                } else {
                    wrongAnswer++;
                    document.querySelector(".answer").value = "";
                    document.querySelector(".wrongAnswer").innerHTML = wrongAnswer;
                    console.log(firstNumber + "*" + secondNumber);
                }
            }
        });

        document.addEventListener("keydown", (e) => {
            if (event.code == "Enter" || event.code == "Space") {
                if (document.querySelector(".answer").value) {
                    if (firstNumber * secondNumber == document.querySelector(".answer").value) {
                        document.querySelector(".answer").value = "";
                        rightAnswer++;
                        createNumberPage();
                        document.querySelector(".rightAnswer").innerHTML = rightAnswer;
                    } else {
                        wrongAnswer++;
                        document.querySelector(".answer").value = "";
                        document.querySelector(".wrongAnswer").innerHTML = wrongAnswer;
                        console.log(firstNumber + "*" + secondNumber);
                    };
                }
            }
        });