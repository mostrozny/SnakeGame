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

        Snake() {
            this.x = 4;
            this.y = 4;
            this.direction = 'right';

            this.cells[this.index(this.x, this.y)].classList.add('snake');
        }

        Mouse() {
            this.x = Math.floor(Math.random() * 40);
            this.y = Math.floor(Math.random() * 40);

            this.cells[this.index(this.x, this.y)].classList.add('mouse');
        }
    }

/*
class Mouse {
    constructor() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }
}*/



const newGame = new sGame();
newGame.createBoard();
newGame.Snake();
newGame.Mouse();

})
