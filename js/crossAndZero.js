
class TicTacToe {
    constructor() {
        this.clearGame = document.querySelector(".new-game");
        this.gameTableElement = document.getElementById("game-cross-zero");
        this.status = "playing";
        this.mapValues = [
            [ "", "", "" ],
            [ "", "", "" ],
            [ "", "", "" ],
        ];
        this.phase = "";

    }

    newGamePlay () {
        this.clearGame.addEventListener("click", () => {
    
            for(let i = 0; i < 3; i++) {
                for(let g = 0; g <3; g++) {
                    this.gameTableElement.children[i].children[g].innerHTML = "";
                    this.mapValues[i][g] = "";
                }
            };

            this.status = "playing";


    
        });
    }


    //Иницилизацяия игры.
    init () {

         //Сдучайный выбор элемента для начала игры.
         this.randomSelectionPhase();

        //Выводит все ячейки.
        this.renderMap();

        //Инициализация обработчика событий.
        this.initEventHandlers();

        this.newGamePlay();

    }

    randomSelectionPhase() {
        let selectionPhase = Math.floor(Math.random()*3);
        if (selectionPhase > 0 && selectionPhase<3) {
            this.phase = "X";
        } else {
            this.phase = "O";
        }

    }

    renderMap() {
        for (let row = 0; row < 3; row++) {
            let tr = document.createElement("tr");
            tr.style.bordercolor="black";
            this.gameTableElement.appendChild(tr);
            for (let col = 0; col < 3; col++) {
                let td = document.createElement("td");
                td.dataset.row = row.toString();
                td.dataset.col = col.toString();
                tr.appendChild(td);
            }
        }
    }

    initEventHandlers() {
        this.gameTableElement.addEventListener("click", event => this.cellClickHandler(event));
    }

    //Обработчик события клика.
    cellClickHandler(event) {
        if (!this.isCorrectClick(event)) {
            return;
        }

        this.fillCell(event);

        if(this.hasWin()) {
            this.setStatusStopped();
            setTimeout(() => this.sayWinPhrase(), 200);
        }

        this.oAutoRender();

        this.togglePhase();

    }

    //Проверка был ли корректный клик, что описан в событие event.
    isCorrectClick(event) {
        return this.isStatusPlaying() && this.isClickByCell(event) && this.isCellEmpty(event);
    }

    //Проверка,что игра не закончена.
    isStatusPlaying() {
        return this.status === "playing";
    }

    //Проверяет сделан ли первый, ход.
    oAutoRender() {
        for (let i = 0; i < this.gameTableElement.childNodes.length; i++) {
            for (let g=0; g < this.gameTableElement.children.length; g++){
                if(this.gameTableElement.children[i].children[g].innerHTML === "X" || this.gameTableElement.children[i].children[g].innerHTML === "O"){
                    this.togglePhase()
                    this.oAuto();
                    if(this.hasWin()) {
                        this.setStatusStopped();
                        setTimeout(() => this.sayWinPhrase(), 200);
                    };
                    return;
                };
            };
        };
    }


    //Проставляет ход.
    oAuto() {
        let row = Math.floor(Math.random()*3);
        let col = Math.floor(Math.random()*3);
        if(this.mapValues[1][1] === "") {
            this.mapValues[1][1] = this.phase;
            this.gameTableElement.children[1].children[1].innerHTML = this.phase;
            return;
        };
        if((this.mapValues[0][0] + this.mapValues[0][1]  === "XX" || this.mapValues[0][0] + this.mapValues[0][1]  === "OO" ||
         this.mapValues[2][0] + this.mapValues[1][1]  === "XX" || this.mapValues[2][0] + this.mapValues[1][1]  === "OO" ||
         this.mapValues[2][2] + this.mapValues[1][2]  === "XX" || this.mapValues[2][0] + this.mapValues[1][1]  === "OO") && 
         this.mapValues[0][2] === "") {
            this.mapValues[0][2] = this.phase;
            this.gameTableElement.children[0].children[2].innerHTML = this.phase;
            return;
        };
        if((this.mapValues[0][1] + this.mapValues[0][2]  === "XX" || this.mapValues[0][1] + this.mapValues[0][2]  === "OO" ||
         this.mapValues[1][1] + this.mapValues[2][2]  === "XX" || this.mapValues[1][1] + this.mapValues[2][2]  === "OO" ||
         this.mapValues[1][0] + this.mapValues[2][0]  === "XX" || this.mapValues[1][0] + this.mapValues[2][1]  === "OO") && 
         this.mapValues[0][0] === ""  ) {
            this.mapValues[0][0] = this.phase;
            this.gameTableElement.children[0].children[0].innerHTML = this.phase;
            return;
        };
        if((this.mapValues[0][0] + this.mapValues[0][2]  === "XX" || this.mapValues[0][0] + this.mapValues[0][2]  === "OO" ||
        this.mapValues[1][1] + this.mapValues[2][1]  === "XX" || this.mapValues[1][1] + this.mapValues[2][1]  === "OO") && 
        this.mapValues[0][1] === "") {
           this.mapValues[0][1] = this.phase;
           this.gameTableElement.children[0].children[1].innerHTML = this.phase;
           return;
        };
        if((this.mapValues[0][0] + this.mapValues[1][1]  === "XX" || this.mapValues[0][0] + this.mapValues[1][1]  === "OO" ||
       this.mapValues[2][0] + this.mapValues[2][1]  === "XX" || this.mapValues[2][0] + this.mapValues[2][1]  === "OO" ||
       this.mapValues[0][2] + this.mapValues[1][2]  === "XX" || this.mapValues[0][2] + this.mapValues[1][2]  === "OO") && 
       this.mapValues[2][2] === "" ) {
          this.mapValues[2][2] = this.phase;
          this.gameTableElement.children[2].children[2].innerHTML = this.phase;
          return;
        };
        if((this.mapValues[0][2] + this.mapValues[2][2]  === "XX" || this.mapValues[0][2] + this.mapValues[2][2]  === "OO" ||
        this.mapValues[1][0] + this.mapValues[1][1]  === "XX" || this.mapValues[1][0] + this.mapValues[1][1]  === "OO") && 
        this.mapValues[1][2] === "") {
           this.mapValues[1][2] = this.phase;
           this.gameTableElement.children[1].children[2].innerHTML = this.phase;
           return;
        };
        if((this.mapValues[0][1] + this.mapValues[1][1]  === "XX" || this.mapValues[0][1] + this.mapValues[1][1]  === "OO" ||
        this.mapValues[2][0] + this.mapValues[2][2]  === "XX" || this.mapValues[2][0] + this.mapValues[2][2]  === "OO") && 
        this.mapValues[2][1] === "") {
           this.mapValues[2][1] = this.phase;
           this.gameTableElement.children[2].children[1].innerHTML = this.phase;
           return;
        };
        if((this.mapValues[0][0] + this.mapValues[1][0]  === "XX" || this.mapValues[0][0] + this.mapValues[1][0]  === "OO" ||
       this.mapValues[0][2] + this.mapValues[1][1]  === "XX" || this.mapValues[0][2] + this.mapValues[1][1]  === "OO" ||
       this.mapValues[2][1] + this.mapValues[2][2]  === "XX" || this.mapValues[2][1] + this.mapValues[2][2]  === "OO") && 
       this.mapValues[2][0] === "") {
          this.mapValues[2][0] = this.phase;
          this.gameTableElement.children[2].children[0].innerHTML = this.phase;
          return;
        };
        if((this.mapValues[1][1] + this.mapValues[1][2]  === "XX" || this.mapValues[1][1] + this.mapValues[1][2]  === "OO" ||
        this.mapValues[0][0] + this.mapValues[2][0]  === "XX" || this.mapValues[0][0] + this.mapValues[2][0]  === "OO") && 
        this.mapValues[1][0] === "") {
           this.mapValues[1][0] = this.phase;
           this.gameTableElement.children[1].children[0].innerHTML = this.phase;
           return;
        };
        if(this.mapValues[row][col] === "" ) {
            this.mapValues[row][col] = this.phase;
            this.gameTableElement.children[row].children[col].innerHTML = this.phase;
        } else if (this.mapValues[0][0] !== "" && this.mapValues[0][1] !== "" && this.mapValues[0][2] !== "" &&
         this.mapValues[1][0] !== "" && this.mapValues[1][1] !== "" && this.mapValues[2][1] !== "" &&
         this.mapValues[2][0] !== "" && this.mapValues[2][1] !== "" && this.mapValues[2][2] !== ""){
            return;
        } else {
            this.oAuto();
        };
    }

    //Проверка того, что клик был по ячкейки.
    isClickByCell(event) {
        return event.target.tagName === "TD";
    }

    //Проверка, что ячейка пустая.
    isCellEmpty(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;
        return this.mapValues[row][col] === "";
    }

    //Заполняет ячейку в которую произошёл клик.
    fillCell(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;
        this.mapValues[row][col] = this.phase;
        event.target.textContent = this.phase;
        }
    

    //Проверяет, есть ли выиграшная ситуация на поле.
    hasWin(){
        return this.isLineWin({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }) ||
        this.isLineWin({ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }) ||
        this.isLineWin({ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }) ||

        this.isLineWin({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }) ||
        this.isLineWin({ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }) ||
        this.isLineWin({ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }) ||

        this.isLineWin({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }) ||
        this.isLineWin({ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 });
    }

    //Проверка, есть ли выиграшная ситуация на линии.
    isLineWin(a, b, c) {
        let value = this.mapValues[a.y][a.x] + this.mapValues[b.y][b.x] + this.mapValues[c.y][c.x];
        return value === "XXX" || value === "OOO";
    }

    //Игра остановлена.
    setStatusStopped() {
        this.status = "stoped";
    }

    sayWinPhrase() {
        let figure = this.phase === "X" ? "Нолики" : "Крестики";
        alert(`${figure} выиграли!`);
    }

    //Меняет крестики на нолики.
    togglePhase() {
        if(this.phase === "O") {
            this.phase = "X";
        } else {
            this.phase = "O";
        };
    }
}

const ticTacToe = new TicTacToe();
ticTacToe.init();