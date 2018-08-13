document.addEventListener('DOMContentLoaded', () => {

/*abstract*/class Snake {
    constructor () {
        this.width = 20;
        this.height = 20;
        this.board = document.querySelector('.board');
    }
    createBoard () {
        this.board.style.width = this.width * 10 + 'px';
        this.board.style.height = this.height * 10 + 'px';
        const divCount = this.width * this.height;
        for (let i = 0; i < divCount; i++) {
            const createdDiv = document.createElement('div');
            this.board.appendChild(createdDiv);
        }
    }
}

var newGame = new Snake();
newGame.createBoard();

});