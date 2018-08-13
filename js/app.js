document.addEventListener('DOMContentLoaded', () => {

    /*abstract*/
    class sGame {
        constructor() {
            this.width = 20;
            this.height = 20;
            this.board = document.querySelector('.board');
            this.index = (x, y) => {
                return x + (y * 10);
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
            this.cells[this.index(this.Snake.x, this.Snake.y)].classList.add('snake');
        }

        showMouse() {
            this.cells[this.index(this.Mouse.x, this.Mouse.y)].classList.add('mouse');
        }
    }


    class Mouse {
        constructor() {
            this.x = Math.floor(Math.random() * 40);
            this.y = Math.floor(Math.random() * 40);
        }
    }

    class Snake {
        constructor() {
            this.x = 4;
            this.y = 4;
            this.direction = 'right';
        }
    }


    const newGame = new sGame();
    newGame.createBoard();
    newGame.showMouse();
    newGame.showSnake();

})
