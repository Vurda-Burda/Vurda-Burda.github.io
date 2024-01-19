
let snake = {
    body: null,
    direction: null,
    lastStepDirection: null,


    init(startPoint, direction) {
        this.body = [startPoint];
        this.lastStepDirection = direction;
        this.direction = direction;
    },

    getNextStepHeadPoint() {
        let firstPoint = this.body[0];

        switch (this.direction) {
            case 'up':
                return { x: firstPoint.x, y: firstPoint.y - 1 };
            case 'down':
                return { x: firstPoint.x, y: firstPoint.y + 1 };
            case 'right':
                return { x: firstPoint.x + 1, y: firstPoint.y };
            case 'left':
                return { x: firstPoint.x - 1, y: firstPoint.y };
        }
    },

    isBodyPoint(point) {
        return this.body.some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y);
    },

    makeStep() {
        this.lastStepDirection = this.direction;
        this.body.unshift(this.getNextStepHeadPoint());
        this.body.pop();
    },

    setDirection(direction) {
        this.direction = direction;
    },

    incrementBody() {
        let lastBodyIdx = this.body.length - 1;
        let lastBodyPoint = this.body[lastBodyIdx];
        let lastBodyPointClone = Object.assign({}, lastBodyPoint);
        this.body.push(lastBodyPointClone);
    }
};

let renderer = {
    cells: {},
    renderMap(rowsCount, colsCount) {
        let table = document.getElementById('game');
        table.innerHTML = '';

        for (let row = 0; row < rowsCount; row++) {
            let tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                let td = document.createElement('td');
                td.classList.add('cell');
                tr.appendChild(td);
                this.cells[`x${col}_y${row}`] = td;
            }
        }
    },

    render(snakePointArray, foodPoint) {
        for (let key of Object.getOwnPropertyNames(this.cells)) {
            this.cells[key].className = 'cell';
        }

        snakePointArray.forEach((point, idx) => {
            this.cells[`x${point.x}_y${point.y}`].classList.add(idx === 0 ? 'snakeHead' : 'snakeBody');
        });

        this.cells[`x${foodPoint.x}_y${foodPoint.y}`].classList.add('food');
    }
};

let food = {
    x: null,
    y: null,

    setFoodCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    getFoodCoordinates() {
        return {
            x: this.x,
            y: this.y,
        }
    },

    isFoodPoint(point) {
        return this.x === point.x && this.y === point.y;
    }
};

let status = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
        document.getElementById("game-param").style.display = "none";
        document.getElementById("save-block").style.display = "block";

    },

    setStopped() {
        this.condition = 'stopped';
        document.getElementById("game-param").style.display = "flex";
        document.getElementById("save-block").style.display = "none";
    },

    setFinished() {
        this.condition = 'finished';
        document.getElementById("game-param").style.display = "flex";
        document.getElementById("save-block").style.display = "none";
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    }
};

let settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 1,
    winLength: 5,


    snakeSpeed() {
        document.getElementById("game-speed").addEventListener("change", (e) => {
            this.speed = Number(e.target.value);
        })
    },

    snakeLength() {
        document.getElementById("game-lenght").addEventListener("change", (e) => {
            this.winLength = Number(e.target.value);
        })
    },

    validate() {
        if (this.rowsCount < 10 || this.rowsCount > 30) {
            console.error('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
            return false;
        }

        if (this.colsCount < 10 || this.colsCount > 30) {
            console.error('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
            return false;
        }

        if (this.speed < 1 || this.speed > 10) {
            console.error('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
            return false;
        }

        if (this.winLength < 5 || this.winLength > 50) {
            console.error('Неверные настройки, значение winLength должно быть в диапазоне [5, 50].');
            return false;
        }

        return true;
    },
};