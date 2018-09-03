document.addEventListener('DOMContentLoaded', () => {
    //FIREBASE DECLARATION
    const config = {
        apiKey: "AIzaSyBcCjzXzr9JmksAdnqFxZXxgyZZBuRoZ0E",
        authDomain: "snakegame-23df0.firebaseapp.com",
        databaseURL: "https://snakegame-23df0.firebaseio.com",
        projectId: "snakegame-23df0",
        storageBucket: "",
        messagingSenderId: "679166626893"
    };
    firebase.initializeApp(config);
    const database = firebase.database();


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
            this.superMouse = new SuperMouse();
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

        showSuperMouse() {
            this.cells[this.index(this.superMouse.x, this.superMouse.y)].classList.add('superMouse');
        }


        eatMouse() {
            if (this.Snake.x === this.Mouse.x && this.Snake.y === this.Mouse.y) {
                const self = this;
                document.querySelector('.mouse').classList.remove('mouse');
                document.querySelector('h2').innerText++;
                this.Snake.total++;
                this.Snake.score++;
                clearInterval(this.idSetInterval);
                const multipler = this.Snake.total * 6;

                this.startGame(250 - multipler);


                this.Mouse = new Mouse();
                this.showMouse();
            }
        };

        eatSuperMouse() {
            if (this.Snake.x === this.superMouse.x && this.Snake.y === this.superMouse.y) {
                const self = this;
                const h2 = document.querySelector('h2');
                document.querySelector('.superMouse').classList.remove('superMouse');
                h2.innerText = Number(h2.innerText) + 20;
                this.Snake.score = this.Snake.score + 20;
            //    this.Snake.total = this.Snake.total + 20;
                clearInterval(this.idSetInterval);


                this.startGame(250 - this.Snake.total);

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

            this.eatSuperMouse();
            this.eatMouse();
        }

        startGame(speed) {
            let self = this;
            this.idSetInterval = setInterval(function () {
                self.moveSnake()
            }, speed);
        };

        gameOver() {
            //WALL COLLIDE
            if (this.Snake.x < 0 || this.Snake.x > 19 || this.Snake.y < 0 || this.Snake.y > 19) {
                console.log('collide');
                window.clearInterval(this.idSetInterval);
               // sGame.toggleSnake();
                endGame();
            }
            //TAIL COLLIDE
            if (this.Snake.tail.indexOf(this.index(this.Snake.x, this.Snake.y)) !== -1) {
                console.log('collide');
                window.clearInterval(this.idSetInterval);
               // sGame.toggleSnake();
                endGame();
            }


        };

        start(speed) {
            this.createBoard();
            this.showMouse();
            this.intervalShowSuperSnake = setTimeout(() => {
                this.showSuperMouse(true);
                clearTimeout(this.intervalShowSuperSnake);
            }, 1000 * ~~(Math.random()*20) + 10);
            this.showSnake();
            this.startGame(speed);
        }
    }


    class Mouse {
        constructor() {
            this.x = Math.floor(Math.random() * 20);
            this.y = Math.floor(Math.random() * 20);
        }
    }

    class SuperMouse {
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
            this.score = 0;
            this.total = 0;
            this.tail = [];
        }
    }


    let newGame;
    let level = 250;
    const startGame = () => {
        $('.menu').toggle();
        $('.score').removeClass('invisible');
        $('.board').removeClass('invisible');
        newGame = new sGame();
        newGame.start(level);
    };





    //startGame menu;
    $('.play').on('click', (e) => {
        $('.textEnter h1').removeClass('animated', 'pulse');
        startGame();
    });

    //SETTINGS MENU
    $('.settings').on('click', (e) => {
        $('.menu .button').toggle();
        $('h1').text('SETTINGS');
        const menuSection = $('.menu');
        const btn1 = $('<div class="setGroup setEasy button">EASY</div>');
        const btn2 = $('<div class="setGroup setMedium button">MEDIUM</div>');
        const btn3 = $('<div class="setGroup setHard button">HARD</div>');
        const btn4 = $('<div class="setGroup back button">BACK</div>');
        menuSection.append(btn1, btn2, btn3, btn4);

    });


    $('.menu').on('click', '.setEasy', (e) => {
        level = 350;
        $('h1').text('SET: EASY')
    });
    $('.menu').on('click', '.setMedium', (e) => {
        level = 250;
        $('h1').text('SET: MEDIUM')
    });
    $('.menu').on('click', '.setHard', (e) => {
        level = 200;
        $('h1').text('SET: HARD')
    });


    //HIGHSCORE MENU
    let highscoresArray = [];

    const get = () => {
        return database.ref('highscores').once('value')
            .then((snapshot) => {
                const lengthHighscores = snapshot.val().highscores.length;
                const data = snapshot.val().highscores;
                for (let i=0; i<lengthHighscores; i++) {
                    highscoresArray.push(data[i]);
                }
                console.log(highscoresArray)
            });
    };
    get();

    const makeRows = () => {
        const mappedHighscores = highscoresArray.map(x => return
        )
    }


    $('.highscore').on('click', (e) => {
        $('.menu .button').toggle();
        $('h1').text('HIGHSCORE');
        const menuSection = $('.menu');
        const highscoresRefresh = $('.highscores table');
        const list = $('<div class="setGroup highscoreList"></div>');
        list.append(highscoresRefresh);
        const btnBack = $('<div class="setGroup back button">BACK</div>');
        menuSection.append(list, btnBack);
    });




    //BACK IN MENUS
    $('.menu').on('click', '.back', (e) => {
        $('.menu .setGroup').remove();
        $('.menu .button').toggle();
        $('h1').text('SSSSNAKE');
    });

    //END GAME
    const endGame = () => {
        $('.score').toggle();
        $('.board').toggle();
        $('.endGame').toggle();
        $('.endGame span').text(newGame.Snake.score);
    };
    $("form .button").on('click', function(e) {
            $('form').submit();
    });

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
