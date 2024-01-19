
let choicePanel =  {
    //Элементы управление
        snakeButton: document.querySelector(".sNake"),
        snakeGame: document.querySelector(".snake"),
        crossZeroButton: document.querySelector(".crossZero"),
        crossZeroGame: document.querySelector(".cross-zero"),
        eagleTailsButton: document.querySelector(".eagleTails"),
        eagleTailsGame: document.querySelector(".eagle-tails"),
    //Кнопка змейки
    choicePanelSnake () {
        this.snakeButton.addEventListener("click", () => {
            if (this.snakeGame.style.display == "none") {
                this.snakeGame.style.display = "block";
                this.crossZeroGame.style.display = "none";
                this.eagleTailsGame.style.display = "none";
            } else if 
            (this.snakeGame.style.display == "block") {
                this.snakeGame.style.display = "none";
            };
        });
    },
    //Кнопка крестиков и ноликов
    choicePanelCrossZero () {
        this.crossZeroButton.addEventListener("click", () => {
            if (this.crossZeroGame.style.display == "none") {
                this.crossZeroGame.style.display = "block";
                this.snakeGame.style.display = "none";
                this.eagleTailsGame.style.display = "none";
            } else if (this.crossZeroGame.style.display == "block") {
                this.crossZeroGame.style.display = "none";
            };
        });
    },
    //Кнопка орла и решки
    choicePanelEagleTails () {
        this.eagleTailsButton.addEventListener("click", () => {
            if (this.eagleTailsGame.style.display == "none") {
                this.eagleTailsGame.style.display = "block";
                this.snakeGame.style.display = "none";
                this.crossZeroGame.style.display = "none"
            } else if (this.eagleTailsGame.style.display == "block"){
                this.eagleTailsGame.style.display = "none";
            }
        });
        this.choicePanelCrossZero();
        this.choicePanelSnake();
    }
}

choicePanel.choicePanelEagleTails();

