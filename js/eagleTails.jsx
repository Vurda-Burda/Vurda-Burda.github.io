
let eagleTails = {
    //Счётчики
        luckyNumber: null,
        winCounter: 0,
        loseCounter: 0,
    //Элементы игры
        eagleButton: document.querySelector(".eagle"),
        tailsButton: document.querySelector(".tails"),
        win: document.querySelector(".win"),
        coin: document.querySelector(".circleCoin"),
        lose:  document.querySelector(".lose"),
        //Клик по кнопке орёл
        clickEagleButton () {
            this.eagleButton.addEventListener("click", () => {
                console.log("eagle")
                this.luckyNumber = Math.round(Math.random()*10);
                console.log(this.luckyNumber)
                if((0 <= this.luckyNumber && this.luckyNumber < 3) || (5 < this.luckyNumber && this.luckyNumber <= 8)) {
                    this.winCounter++;
                    this.win.innerHTML = `Победа: ${this.winCounter}`;
                    this.coin.innerHTML = `<span class="spanEagleTails">Орёл</span>`;
                    this.coin.style.animation = "none";
                    setTimeout(() => {
                        this.coin.style.animation = "coin-rotate 500ms linear infinite";
                        this.coin.innerHTML = "";
                    }, 1000) } else {
                        this.loseCounter++;
                        this.lose.innerHTML = `Поражение: ${this.loseCounter}`;
                        this.coin.innerHTML = `<span class="spanEagleTails">Решка</span>`;
                        this.coin.style.animation = "none";
                        setTimeout(() => {
                            this.coin.style.animation = "coin-rotate 500ms linear infinite";
                            this.coin.innerHTML = "";
                        }, 1000)
                    }
                });
        },
        //Клик по кнопке решка
        clickTailsButton () {
            this.tailsButton.addEventListener("click", () => {
                console.log("tails")
                this.luckyNumber = Math.round(Math.random()*10);
                console.log(this.luckyNumber)
                if((3 <= this.luckyNumber && this.luckyNumber <= 5) || (8 < this.luckyNumber && this.luckyNumber <= 11)) {
                    this.winCounter++;
                    this.win.innerHTML = `Победа: ${this.winCounter}`;
                    this.coin.innerHTML = `<span class="spanEagleTails">Решка</span>`;
                    this.coin.style.animation = "none";
                    setTimeout(() => {
                        this.coin.style.animation = "coin-rotate 500ms linear infinite";
                        this.coin.innerHTML = "";
                    }, 1000)
                } else {
                    this.loseCounter++;
                    this.lose.innerHTML = `Поражение: ${this.loseCounter}`;
                    this.coin.innerHTML = `<span class="spanEagleTails">Орёл</span>`;
                    this.coin.style.animation = "none";
                    setTimeout(() => {
                        this.coin.style.animation = "coin-rotate 500ms linear infinite";
                        this.coin.innerHTML = "";
                    }, 1000)
                }
            });
        },
        //Клик по монетке
        clickCoin () {
                this.coin.addEventListener("click", () => {
                console.log("coin")
                this.winCounter = 0;
                this.loseCounter = 0;
                this.win.innerHTML = `Победа: ${this.winCounter}`;
                this.lose.innerHTML = `Поражение: ${this.loseCounter}`;
            });
            this.clickEagleButton();
            this.clickTailsButton();
        }
    }

    eagleTails.clickCoin(); 
