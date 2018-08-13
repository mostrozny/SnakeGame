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

        showSnake() {

            let self = this;
            this.cells[this.index(this.Snake.x, this.Snake.y)].classList.add('snake');

            this.Snake.tail.unshift(this.index(this.Snake.x, this.Snake.y));

           // console.log(this.Snake.tail);
            this.Snake.tail.forEach((element) => {
               this.cells[element].classList.add('snake');
            });



           if(this.Snake.tail.length-1 > this.Snake.total) {
                this.cells[this.Snake.tail.pop()].classList.remove('snake');
            }
        }

        showMouse() {
            this.cells[this.index(this.Mouse.x, this.Mouse.y)].classList.add('mouse');
        }

        toggleSnake() {
            let snakeDivs = document.querySelector(".snake");
            snakeDivs.classList.remove('snake');
        };

        eatMouse (){
            if (this.Snake.x === this.Mouse.x && this.Snake.y === this.Mouse.y){
                document.querySelector('.mouse').classList.remove('mouse');
                document.querySelector('h2').innerText++;
                this.Snake.total++;
                this.Mouse = new Mouse();
                this.showMouse();
            }
        };

        turnSnakeHead(event) {
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

            this.toggleSnake();
            this.showSnake();
            this.eatMouse();
        }

        startGame() {
            let self = this;
            this.idSetInterval = setInterval(function () {
                self.moveSnake()
            }, 250);
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
    newGame.startGame();

    document.addEventListener('keydown', function (event){
        newGame.turnSnakeHead(event);
    });

    const hammertime = new Hammer(document);
    hammertime.on('swipeleft', function(ev) {
        document.querySelector('h2').innerText = '000';
        console.log('blablabla');
        console.log(ev);
    });


});
