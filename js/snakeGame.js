
let game = {
    settings,
    status,
    renderer,
    food,
    snake,
    tickInterval: null,
    pageSnakeSpeed: 5,


    init(userSettings = {}) {
        this.settings.snakeSpeed();

        this.settings.snakeLength();

        Object.assign(this.settings, userSettings);
        if (!this.settings.validate()) {
            return;
        }

        this.renderer.renderMap(this.settings.rowsCount, this.settings.colsCount);

        this.setEventHandlers();

        this.reset();
    },

    reset() {
        this.stop();

        this.snake.init(this.getStartSnakePoint(), 'up');

        this.food.setFoodCoordinates(this.getRandomCoordinates());

        this.render();
    },

    render() {
        this.renderer.render(this.snake.body, this.food.getFoodCoordinates());
    },

    play() {
        //ставим статус в играем
        this.status.setPlaying();
        //запускать шаги змейки
        this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.settings.speed)
        //меняем кнопку игры на стоп
        this.changePlayButton('Стоп');
    },

    stop() {
        //ставим статус в стоп
        this.status.setStopped();
        //останавливаем шаги змейки
        clearInterval(this.tickInterval);
        //меняем кнопку игры на старт
        this.changePlayButton('Старт');
    },

    finish() {
        //ставим статус в финиш
        this.status.setFinished();
        //останавливаем шаги змейки
        clearInterval(this.tickInterval);
        //меняем кнопку игры, сделаем серой и напишем игра закончена
        this.changePlayButton('Игра закончена', true);
    },

    tickHandler() {
        if (!this.canSnakeMakeStep()) {
            this.finish();
            alert("Вы проиграли.")
            return;
        }

        if (this.food.isFoodPoint(this.snake.getNextStepHeadPoint())) {
            this.snake.incrementBody();
            this.food.setFoodCoordinates(this.getRandomCoordinates());
            if (this.isGameWon()) {
                this.finish();
                alert("Вы победили!!!");
            }
        }

        this.snake.makeStep();
        this.render();
    },

    isGameWon() {
        return this.snake.body.length > this.settings.winLength;
    },

    canSnakeMakeStep() {
        let nextHeadPoint = this.snake.getNextStepHeadPoint();

        return !this.snake.isBodyPoint(nextHeadPoint) &&
            nextHeadPoint.x < this.settings.colsCount &&
            nextHeadPoint.y < this.settings.rowsCount &&
            nextHeadPoint.x >= 0 &&
            nextHeadPoint.y >= 0;
    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => this.playClickHandler());
        document.getElementById('newGameButton').addEventListener('click', () => this.newGameClickHandler());
        document.getElementById("up").addEventListener("click", (event) => this.snake.setDirection("up"));
        document.getElementById("left").addEventListener("click", (event) => this.snake.setDirection("left"));
        document.getElementById("right").addEventListener("click", (event) => this.snake.setDirection("right"));
        document.getElementById("down").addEventListener("click", (event) => this.snake.setDirection("down"));
        document.addEventListener('keydown', () => this.keyDownHandler(event));
    },

    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if (!this.status.isPlaying()) {
            return;
        }

        let direction = this.getDirectionByCode(event.code);
        if (this.canSetDirection(direction)) {
            this.snake.setDirection(direction);
        }
    },

    canSetDirection(direction) {
        return direction === 'up' && this.snake.lastStepDirection !== 'down' ||
            direction === 'right' && this.snake.lastStepDirection !== 'left' ||
            direction === 'down' && this.snake.lastStepDirection !== 'up' ||
            direction === 'left' && this.snake.lastStepDirection !== 'right';
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
            default:
                return '';
        }
    },

    changePlayButton(textContent, isDisabled = false) {
        let playButton = document.getElementById('playButton');
        playButton.textContent = textContent;
        isDisabled ? playButton.classList.add('disabled') : playButton.classList.remove('disabled');
    },

    getStartSnakePoint() {
        return {
            x: Math.floor(this.settings.colsCount / 2),
            y: Math.floor(this.settings.rowsCount / 2),
        };
    },

    getRandomCoordinates() {
        let exclude = [this.food.getFoodCoordinates(), ...this.snake.body];
        while (true) {
            //случайная точка в пределах игрового поля
            let rndPoint = {
                x: Math.floor(Math.random() * this.settings.colsCount),
                y: Math.floor(Math.random() * this.settings.rowsCount),
            };

            //проверяем не содержится ли в массиве exclude нашей случайной точки
            let excludeContainsRndPoint = exclude.some(function (exPoint) {
                return rndPoint.x === exPoint.x && rndPoint.y === exPoint.y;
            });

            //if (координата не содержится в массиве exclude) {}
            if (!excludeContainsRndPoint) {

                return rndPoint;
            }
        }
    },
};

game.init();