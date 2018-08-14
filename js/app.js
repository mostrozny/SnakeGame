document.addEventListener('DOMContentLoaded', () => {

    /*abstract*/
    class sGame {
        constructor() {
            this.width = 20;
            this.height = 20;
            this.board = document.querySelector('.board');
            this.index = (x, y) => {
                return x + (y * 20);
            };
            this.cells = [];
            this.Mouse = new Mouse();
            this.Snake = new Snake();
        }

        createBoard() {
            // let self = this;
            this.board.style.width = this.width * 10 + 2 + 'px';
            this.board.style.height = this.height * 10 + 2 + 'px';
            const divCount = this.width * this.height;
            for (let i = 0; i < divCount; i++) {
                const createdDiv = document.createElement('div');
                this.cells.push(createdDiv);
                this.board.appendChild(createdDiv);
            }
        }

        static toggleSnake() {
            let snakeDivs = document.querySelector(".snake");
            snakeDivs.classList.remove('snake');
        };

        showSnake() {

            let self = this;
            this.cells[this.index(this.Snake.x, this.Snake.y)].classList.add('snake');


            //SNAKE TAIL
            this.Snake.tail.unshift(this.index(this.Snake.x, this.Snake.y));

            this.Snake.tail.forEach((element) => {
                this.cells[element].classList.add('snake');
            });

            if (this.Snake.tail.length - 1 > this.Snake.total) {
                this.cells[this.Snake.tail.pop()].classList.remove('snake');
            }
        }

        showMouse() {
            this.cells[this.index(this.Mouse.x, this.Mouse.y)].classList.add('mouse');
        }

        eatMouse() {
            if (this.Snake.x === this.Mouse.x && this.Snake.y === this.Mouse.y) {
                const self = this;
                document.querySelector('.mouse').classList.remove('mouse');
                document.querySelector('h2').innerText++;
                this.Snake.total++;
                clearInterval(this.idSetInterval);
                const multipler = this.Snake.total*6;

                    this.startGame(250 - multipler);


                this.Mouse = new Mouse();
                this.showMouse();
            }
        };

        turnSnakeHead(event) {
            //desktop
            switch (event.which) {
                case 37:
                    this.Snake.direction = 'left';
                    break;
                case 39:
                    this.Snake.direction = 'right';
                    break;
                case 38:
                    this.Snake.direction = 'top';
                    break;
                case 40:
                    this.Snake.direction = 'down';
                    break;
            }
            //mobiles
            switch (event.type) {
                case 'panleft':
                    this.Snake.direction = 'left';
                    break;
                case 'panright':
                    this.Snake.direction = 'right';
                    break;
                case 'panup':
                    this.Snake.direction = 'top';
                    break;
                case 'pandown':
                    this.Snake.direction = 'down';
                    break;
            }

        }

        moveSnake() {
            switch (this.Snake.direction) {
                case 'right':
                    this.Snake.x = this.Snake.x + 1;
                    break;
                case 'left':
                    this.Snake.x = this.Snake.x - 1;
                    break;
                case 'top':
                    this.Snake.y = this.Snake.y - 1;
                    break;
                case 'down':
                    this.Snake.y = this.Snake.y + 1;
                    break;
            }

            sGame.toggleSnake();
            this.gameOver();
            this.showSnake();
            this.eatMouse();
        }

        startGame(speed) {
            let self = this;
            this.idSetInterval = setInterval(function () {
                self.moveSnake()
            }, speed);
        };
        gameOver (){
            //WALL COLLIDE
            if (this.Snake.x < 0 || this.Snake.x > 19 || this.Snake.y < 0 || this.Snake.y > 19) {
               console.log('collide');
                window.clearInterval(this.idSetInterval);
                sGame.toggleSnake();
            }
            //TAIL COLLIDE
            if (this.Snake.tail.indexOf(this.index(this.Snake.x, this.Snake.y)) !== -1){
                console.log('collide');
                window.clearInterval(this.idSetInterval);
                sGame.toggleSnake();
            }
        };
    }


    class Mouse {
        constructor() {
            this.x = Math.floor(Math.random() * 20);
            this.y = Math.floor(Math.random() * 20);
        }
    }

    class Snake {
        constructor() {
            this.x = 4;
            this.y = 4;
            this.direction = 'right';
            this.total = 0;
            this.tail = [];
        }
    }

    const newGame = new sGame();
    newGame.createBoard();
    newGame.showMouse();
    newGame.showSnake();
    newGame.startGame(250);


    //****EVENT LISTENER
    //Keyboard for desktops
    document.addEventListener('keydown', function (event) {
        newGame.turnSnakeHead(event);
    });

    //Mobile gestures
    const body = document.querySelector('body');
    let swipe = new Hammer(body);
    swipe.get('pan').set({direction: Hammer.DIRECTION_ALL});
    swipe.on('panleft panright panup pandown', function (ev) {
        newGame.turnSnakeHead(ev);
    });
    //****END EVENT LISTENER

});
