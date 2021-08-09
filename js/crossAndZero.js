
let ticTacToe = {
        clearGame: document.querySelector(".new-game"),
        gameTableElement: document.getElementById("game-cross-zero"),
        status: "playing",
        mapValues: [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ],
        phase: "",
        figure: "",

    newGamePlay() {
        this.clearGame.addEventListener("click", () => {
            for (let i = 0; i < 3; i++) {
                for (let g = 0; g < 3; g++) {
                    this.gameTableElement.children[i].children[g].innerHTML = "";
                    this.mapValues[i][g] = "";
                }
            };
            this.status = "playing";
            this.randomSelectionPhase();
        });
    },


    //Иницилизацяия игры.
    init() {

         //Выводит все ячейки.
         this.renderMap();

        //Сдучайный выбор элемента для начала игры.
        this.randomSelectionPhase();

        //Инициализация обработчика событий.
        this.initEventHandlers();

        //Новая игра.
        this.newGamePlay();

    },

    //Случайный выбор нолики/крестика для игры.
    randomSelectionPhase() {
        let selectionPhase = Math.floor(Math.random() * 3);
        if (selectionPhase > 0 && selectionPhase < 3) {
            this.phase = "X";
        } else {
            this.phase = "O";
            this.mapValues[1][1] = this.phase;
            this.gameTableElement.children[1].children[1].innerHTML = this.phase;
            this.togglePhase();
        }

    },
    //Отрисовка игрового поля.
    renderMap() {
        for (let row = 0; row < 3; row++) {
            let tr = document.createElement("tr");
            tr.style.bordercolor = "black";
            this.gameTableElement.appendChild(tr);
            for (let col = 0; col < 3; col++) {
                let td = document.createElement("td");
                td.dataset.row = row.toString();
                td.dataset.col = col.toString();
                tr.appendChild(td);
            }
        }
    },

    //Клик по полю.
    initEventHandlers() {
        this.gameTableElement.addEventListener("click", event => this.cellClickHandler(event));
    },

    //Обработчик события клика.
    cellClickHandler(event) {
        if (!this.isCorrectClick(event)) {
            return;
        }

        this.fillCell(event);

        this.hasWin();

        this.oAutoRender();

        this.togglePhase();

    },

    //Проверка был ли корректный клик, что описан в событие event.
    isCorrectClick(event) {
        return this.isStatusPlaying() && this.isClickByCell(event) && this.isCellEmpty(event);
    },

    //Проверка,что игра не закончена.
    isStatusPlaying() {
        return this.status === "playing";
    },

    //Проверяет сделан ли первый, ход.
    oAutoRender() {
        if (this.figure === "Крестики" || this.figure === "Нолики") {
            return;
        } else {
            for (let i = 0; i < this.gameTableElement.childNodes.length; i++) {
                for (let g = 0; g < this.gameTableElement.children.length; g++) {
                    if (this.gameTableElement.children[i].children[g].innerHTML === "X" || this.gameTableElement.children[i].children[g].innerHTML === "O") {
                        this.togglePhase()
                        this.oAuto();
                        this.hasWin();
                        return;
                    };
                };
            };
        };
    },


    //Проставляет ход.
    oAuto() {
        let row = Math.floor(Math.random() * 3);
        let col = Math.floor(Math.random() * 3);
        if (this.mapValues[1][1] === "") {
            this.mapValues[1][1] = this.phase;
            this.gameTableElement.children[1].children[1].innerHTML = this.phase;
            return;
        };
        if ((this.mapValues[0][0] + this.mapValues[0][1] === "XX" || this.mapValues[0][0] + this.mapValues[0][1] === "OO" ||
            this.mapValues[2][0] + this.mapValues[1][1] === "XX" || this.mapValues[2][0] + this.mapValues[1][1] === "OO" ||
            this.mapValues[2][2] + this.mapValues[1][2] === "XX" || this.mapValues[2][0] + this.mapValues[1][1] === "OO") &&
            this.mapValues[0][2] === "") {
            this.mapValues[0][2] = this.phase;
            this.gameTableElement.children[0].children[2].innerHTML = this.phase;
            return;
        };
        if ((this.mapValues[0][1] + this.mapValues[0][2] === "XX" || this.mapValues[0][1] + this.mapValues[0][2] === "OO" ||
            this.mapValues[1][1] + this.mapValues[2][2] === "XX" || this.mapValues[1][1] + this.mapValues[2][2] === "OO" ||
            this.mapValues[1][0] + this.mapValues[2][0] === "XX" || this.mapValues[1][0] + this.mapValues[2][1] === "OO") &&
            this.mapValues[0][0] === "") {
            this.mapValues[0][0] = this.phase;
            this.gameTableElement.children[0].children[0].innerHTML = this.phase;
            return;
        };
        if ((this.mapValues[0][0] + this.mapValues[0][2] === "XX" || this.mapValues[0][0] + this.mapValues[0][2] === "OO" ||
            this.mapValues[1][1] + this.mapValues[2][1] === "XX" || this.mapValues[1][1] + this.mapValues[2][1] === "OO") &&
            this.mapValues[0][1] === "") {
            this.mapValues[0][1] = this.phase;
            this.gameTableElement.children[0].children[1].innerHTML = this.phase;
            return;
        };
        if ((this.mapValues[0][0] + this.mapValues[1][1] === "XX" || this.mapValues[0][0] + this.mapValues[1][1] === "OO" ||
            this.mapValues[2][0] + this.mapValues[2][1] === "XX" || this.mapValues[2][0] + this.mapValues[2][1] === "OO" ||
            this.mapValues[0][2] + this.mapValues[1][2] === "XX" || this.mapValues[0][2] + this.mapValues[1][2] === "OO") &&
            this.mapValues[2][2] === "") {
            this.mapValues[2][2] = this.phase;
            this.gameTableElement.children[2].children[2].innerHTML = this.phase;
            return;
        };
        if ((this.mapValues[0][2] + this.mapValues[2][2] === "XX" || this.mapValues[0][2] + this.mapValues[2][2] === "OO" ||
            this.mapValues[1][0] + this.mapValues[1][1] === "XX" || this.mapValues[1][0] + this.mapValues[1][1] === "OO") &&
            this.mapValues[1][2] === "") {
            this.mapValues[1][2] = this.phase;
            this.gameTableElement.children[1].children[2].innerHTML = this.phase;
            return;
        };
        if ((this.mapValues[0][1] + this.mapValues[1][1] === "XX" || this.mapValues[0][1] + this.mapValues[1][1] === "OO" ||
            this.mapValues[2][0] + this.mapValues[2][2] === "XX" || this.mapValues[2][0] + this.mapValues[2][2] === "OO") &&
            this.mapValues[2][1] === "") {
            this.mapValues[2][1] = this.phase;
            this.gameTableElement.children[2].children[1].innerHTML = this.phase;
            return;
        };
        if ((this.mapValues[0][0] + this.mapValues[1][0] === "XX" || this.mapValues[0][0] + this.mapValues[1][0] === "OO" ||
            this.mapValues[0][2] + this.mapValues[1][1] === "XX" || this.mapValues[0][2] + this.mapValues[1][1] === "OO" ||
            this.mapValues[2][1] + this.mapValues[2][2] === "XX" || this.mapValues[2][1] + this.mapValues[2][2] === "OO") &&
            this.mapValues[2][0] === "") {
            this.mapValues[2][0] = this.phase;
            this.gameTableElement.children[2].children[0].innerHTML = this.phase;
            return;
        };
        if ((this.mapValues[1][1] + this.mapValues[1][2] === "XX" || this.mapValues[1][1] + this.mapValues[1][2] === "OO" ||
            this.mapValues[0][0] + this.mapValues[2][0] === "XX" || this.mapValues[0][0] + this.mapValues[2][0] === "OO") &&
            this.mapValues[1][0] === "") {
            this.mapValues[1][0] = this.phase;
            this.gameTableElement.children[1].children[0].innerHTML = this.phase;
            return;
        };
        if (this.mapValues[row][col] === "") {
            this.mapValues[row][col] = this.phase;
            this.gameTableElement.children[row].children[col].innerHTML = this.phase;
        } else if (this.mapValues[0][0] !== "" && this.mapValues[0][1] !== "" && this.mapValues[0][2] !== "" &&
            this.mapValues[1][0] !== "" && this.mapValues[1][1] !== "" && this.mapValues[2][1] !== "" &&
            this.mapValues[2][0] !== "" && this.mapValues[2][1] !== "" && this.mapValues[2][2] !== "") {
            return;
        } else {
            this.oAuto();
        };
    },

    //Проверка того, что клик был по ячкейки.
    isClickByCell(event) {
        return event.target.tagName === "TD";
    },

    //Проверка, что ячейка пустая.
    isCellEmpty(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;
        return this.mapValues[row][col] === "";
    },

    //Заполняет ячейку в которую произошёл клик.
    fillCell(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;
        this.mapValues[row][col] = this.phase;
        event.target.textContent = this.phase;
    },


    //Проверяет, есть ли выиграшная ситуация на поле.
    hasWin() {
        if (this.mapValues[0][0] + this.mapValues[0][1] + this.mapValues[0][2] === "XXX" ||
            this.mapValues[1][0] + this.mapValues[1][1] + this.mapValues[1][2] === "XXX" ||
            this.mapValues[2][0] + this.mapValues[2][1] + this.mapValues[2][2] === "XXX" ||
            this.mapValues[0][0] + this.mapValues[1][0] + this.mapValues[2][0] === "XXX" ||
            this.mapValues[0][1] + this.mapValues[1][1] + this.mapValues[2][1] === "XXX" ||
            this.mapValues[0][2] + this.mapValues[1][2] + this.mapValues[2][2] === "XXX" ||
            this.mapValues[0][0] + this.mapValues[1][1] + this.mapValues[2][2] === "XXX" ||
            this.mapValues[0][2] + this.mapValues[1][1] + this.mapValues[2][0] === "XXX") {
            this.setStatusStopped();
            this.figure = "Крестики";
            setTimeout(() => this.sayWinPhrase(), 300);
        };

        if (this.mapValues[0][0] + this.mapValues[0][1] + this.mapValues[0][2] === "OOO" ||
            this.mapValues[1][0] + this.mapValues[1][1] + this.mapValues[1][2] === "OOO" ||
            this.mapValues[2][0] + this.mapValues[2][1] + this.mapValues[2][2] === "OOO" ||
            this.mapValues[0][0] + this.mapValues[1][0] + this.mapValues[2][0] === "OOO" ||
            this.mapValues[0][1] + this.mapValues[1][1] + this.mapValues[2][1] === "OOO" ||
            this.mapValues[0][2] + this.mapValues[1][2] + this.mapValues[2][2] === "OOO" ||
            this.mapValues[0][0] + this.mapValues[1][1] + this.mapValues[2][2] === "OOO" ||
            this.mapValues[0][2] + this.mapValues[1][1] + this.mapValues[2][0] === "OOO") {
            this.setStatusStopped();
            this.figure = "Нолики";
            setTimeout(() => this.sayWinPhrase(), 300);
        };

    },

    //Игра остановлена.
    setStatusStopped() {
        this.status = "stoped";
    },

    //Сообщение о выиграше/проиграше.
    sayWinPhrase() {
        alert(`${this.figure} выиграли!`);
        this.figure = "";
    },

    //Меняет крестики на нолики.
    togglePhase() {
        if (this.phase === "O") {
            this.phase = "X";
        } else {
            this.phase = "O";
        };
    }
}

ticTacToe.init();