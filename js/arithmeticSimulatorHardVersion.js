        let firstNumber;

        let secondNumber;

        let thirdNumber;

        let rightAnswer = 0;

        let wrongAnswer = 0;

        let exampleVariant;

        let firstSing;

        let secondSing;

        //Создание примера
        function createExample() {


            exampleVariant = Math.round(Math.random() * 10);

            //Выбор знака операции
            if (0 < exampleVariant && exampleVariant < 6) {
                document.querySelector(".verticalSingFirst").style.display = "none";
                document.querySelector(".verticalSingSecond").style.display = "block";
                firstSing = true;
                secondSing = false

            } else {
                document.querySelector(".verticalSingSecond").style.display = "none";
                document.querySelector(".verticalSingFirst").style.display = "block";
                secondSing = true;
                firstSing = false;
            }

            firstNumber = Math.round(Math.random() * 11 + 10);
            secondNumber = Math.round(Math.random() * 11);
            thirdNumber = Math.round(Math.random() * 11);

            //Проверка на значение < 0
            if (firstNumber > secondNumber) {
                document.querySelector(".firstNumber").innerHTML = firstNumber;
                document.querySelector(".secondNumber").innerHTML = secondNumber;
                document.querySelector(".thirdNumber").innerHTML = thirdNumber;
            } else {
                createExample();
            }

            document.querySelector(".rightAnswer").innerHTML = rightAnswer;
            document.querySelector(".wrongAnswer").innerHTML = wrongAnswer;

        };


        //Запуска создание примера при загрузке страницы
        window.addEventListener("load", createExample);

        //Логика действий при нажатие на кнопку "проверить"
        let button = document.querySelector(".buttonAnswer");
        button.addEventListener("click", () => {
            if (document.querySelector(".answer").value) {
                if (firstSing && firstNumber - secondNumber + thirdNumber == document.querySelector(".answer").value) {
                    document.querySelector(".answer").value = "";
                    rightAnswer++;
                    createExample();
                } else if (secondSing &&
                    firstNumber + secondNumber - thirdNumber == document.querySelector(".answer").value) {
                    document.querySelector(".answer").value = "";
                    rightAnswer++;
                    createExample();
                } else {
                    wrongAnswer++;
                    document.querySelector(".answer").value = "";
                    document.querySelector(".wrongAnswer").innerHTML = wrongAnswer;
                    if (firstSing) {
                        console.log(firstNumber + "-" + secondNumber + "+" + thirdNumber);
                    } else {
                        console.log(firstNumber + "+" + secondNumber + "-" + thirdNumber);
                    };
                }
            }
        });
        //Логика действий при нажатие на клавишу пробел или ввод
        document.addEventListener("keydown", (e) => {
            if (event.code == "Enter" || event.code == "Space") {
                if (document.querySelector(".answer").value) {
                    if (firstSing && firstNumber - secondNumber + thirdNumber == document.querySelector(".answer").value) {
                        document.querySelector(".answer").value = "";
                        rightAnswer++;
                        createExample();
                    } else if (secondSing && firstNumber + secondNumber - thirdNumber == document.querySelector(".answer").value) {
                        document.querySelector(".answer").value = "";
                        rightAnswer++;
                        createExample();
                    } else {
                        wrongAnswer++;
                        document.querySelector(".answer").value = "";
                        document.querySelector(".wrongAnswer").innerHTML = wrongAnswer;
                        if (firstSing) {
                            console.log(firstNumber + "-" + secondNumber + "+" + thirdNumber);
                        } else {
                            console.log(firstNumber + "+" + secondNumber + "-" + thirdNumber);
                        };
                    }
                }
            }
        });