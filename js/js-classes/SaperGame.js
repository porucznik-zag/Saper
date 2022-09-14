class SaperGame {
    constructor() {
        this.boardWidth = 0;
        this.boardHeight = 0;
        this.boardMines = 0;
        this.minesArray = [];
        this.boardArray = new Array();
        this.flagsToSet = 0;
        this.bestScore = 0;
        this.isVolumeOn = true;
        this.websiteTheme = "dark";
        this.isGameOver = false;
        this.isGameWin = false;
        this.isTimerStarted = false;
        this.gameMinutes = 0;
        this.gameSecunds = 0;
        this.updateTimer = null;
        this.correctFlagedMines = 0;
        // this.timeOfStart = new Date();
    }


    getBoardSize() {
        const boardWidthInput = document.getElementById("custom-width-input");
        const boardHeightInput = document.getElementById("custom-height-input");
        const boardMinesInput = document.getElementById("custom-mines-input");

        boardWidthInput.value == "" ? this.boardWidth = 10 : this.boardWidth = parseInt(boardWidthInput.value);
        boardHeightInput.value == "" ? this.boardHeight = 10 : this.boardHeight = parseInt(boardHeightInput.value);
        boardMinesInput.value == "" ? this.boardMines = 10 : this.boardMines = parseInt(boardMinesInput.value);

        this.flagsToSet = this.boardMines;
        this.isGameOver = false;
        this.isGameWin = false
        this.isTimerStarted = false;
        this.gameMinutes = 0;
        this.gameSecunds = 0;
        clearInterval(this.updateTimer);

        const gameTimerDiv = document.getElementById("game-timer");
        gameTimerDiv.innerText = "00:00";

    }


    createBoardArray() {
        this.boardArray = Array(parseInt(this.boardHeight));

        for (let i = 0; i < this.boardArray.length; i++) {
            this.boardArray[i] = Array(parseInt(this.boardWidth));
        }

        for (let i = 0; i < this.boardHeight; i++) {
            for (let j = 0; j < this.boardWidth; j++) {
                this.boardArray[i][j] = new Box();
                this.boardArray[i][j].id = i * this.boardWidth + j;
                this.boardArray[i][j].x = i;
                this.boardArray[i][j].y = j;
            }
        }

        this.minesArray = [];

        for (let i = 0; i < this.boardMines; i++) {
            loop0:
            while (true) {
                const randomNumber = Math.floor(Math.random() * (this.boardWidth * this.boardHeight) + 1);

                loop1:
                for (let i = 0; i < this.boardHeight; i++) {
                    for (let j = 0; j < this.boardWidth; j++) {
                        if (this.boardArray[i][j].id == randomNumber - 1) {
                            if (this.boardArray[i][j].isBomb == false) {
                                this.boardArray[i][j].isBomb = true;
                                this.minesArray.push(randomNumber - 1);
                                break loop0;
                            }
                            break loop1;
                        }
                    }
                }
            }
        }

        // wpisanie ilości bomb wokół kwadracika
        for (let i = 0; i < this.boardHeight; i++) {
            for (let j = 0; j < this.boardWidth; j++) {
                let bombAround = 0;

                if (j != 0) {
                    if (this.boardArray[i][j - 1].isBomb == true)
                        bombAround = bombAround + 1;

                    if (i != 0) {
                        if (this.boardArray[i - 1][j - 1].isBomb == true)
                            bombAround = bombAround + 1;
                    }

                    if (i != this.boardHeight - 1) {
                        if (this.boardArray[i + 1][j - 1].isBomb == true)
                            bombAround = bombAround + 1;
                    }
                }

                if (i != 0) {
                    if (this.boardArray[i - 1][j].isBomb == true)
                        bombAround = bombAround + 1;
                }

                if (j != this.boardWidth - 1) {
                    if (this.boardArray[i][j + 1].isBomb == true)
                        bombAround = bombAround + 1;

                    if (i != 0) {
                        if (this.boardArray[i - 1][j + 1].isBomb == true)
                            bombAround = bombAround + 1;
                    }

                    if (i != this.boardHeight - 1) {
                        if (this.boardArray[i + 1][j + 1].isBomb == true)
                            bombAround = bombAround + 1;
                    }
                }

                if (i != this.boardHeight - 1) {
                    if (this.boardArray[i + 1][j].isBomb == true)
                        bombAround = bombAround + 1;
                }

                this.boardArray[i][j].bombAround = bombAround;
            }
        }


        // ustawienie właściwości isNeighbour dla właściwych pól
        for (let i = 0; i < this.boardHeight; i++) {
            for (let j = 0; j < this.boardWidth; j++) {
                let isNeighbour = 0;

                if (j != 0) {
                    if (this.boardArray[i][j - 1].bombAround == 0 && this.boardArray[i][j - 1].isBomb != true && this.boardArray[i][j].bombAround > 0)
                        isNeighbour = isNeighbour + 1;

                    if (i != 0) {
                        if (this.boardArray[i - 1][j - 1].bombAround == 0 && this.boardArray[i - 1][j - 1].isBomb != true && this.boardArray[i][j].bombAround > 0)
                            isNeighbour = isNeighbour + 1;
                    }

                    if (i != this.boardHeight - 1) {
                        if (this.boardArray[i + 1][j - 1].bombAround == 0 && this.boardArray[i + 1][j - 1].isBomb != true && this.boardArray[i][j].bombAround > 0)
                            isNeighbour = isNeighbour + 1;
                    }
                }

                if (i != 0) {
                    if (this.boardArray[i - 1][j].bombAround == 0 && this.boardArray[i - 1][j].isBomb != true && this.boardArray[i][j].bombAround > 0)
                        isNeighbour = isNeighbour + 1;
                }

                if (j != this.boardWidth - 1) {
                    if (this.boardArray[i][j + 1].bombAround == 0 && this.boardArray[i][j + 1].isBomb != true && this.boardArray[i][j].bombAround > 0)
                        isNeighbour = isNeighbour + 1;

                    if (i != 0) {
                        if (this.boardArray[i - 1][j + 1].bombAround == 0 && this.boardArray[i - 1][j + 1].isBomb != true && this.boardArray[i][j].bombAround > 0)
                            isNeighbour = isNeighbour + 1;
                    }

                    if (i != this.boardHeight - 1) {
                        if (this.boardArray[i + 1][j + 1].bombAround == 0 && this.boardArray[i + 1][j + 1].isBomb != true && this.boardArray[i][j].bombAround > 0)
                            isNeighbour = isNeighbour + 1;
                    }
                }

                if (i != this.boardHeight - 1) {
                    if (this.boardArray[i + 1][j].bombAround == 0 && this.boardArray[i + 1][j].isBomb != true && this.boardArray[i][j].bombAround > 0)
                        isNeighbour = isNeighbour + 1;
                }

                if (isNeighbour > 0)
                    this.boardArray[i][j].isNeighbour = true;
            }
        }

        this.minesArray.sort((a, b) => { return a - b });

        console.log(this.boardArray);
        console.log(this.minesArray);
    }

    generateBoard() {
        const boardContainer = document.getElementById("board-container");

        boardContainer.replaceChildren();
        boardContainer.style.gridTemplateColumns = `repeat(${this.boardWidth}, auto)`;
        boardContainer.style.gridTemplateRows = `repeat(${this.boardHeight}, auto)`;

        for (let i = 0; i < this.boardWidth * this.boardHeight; i++) {

            const x = (i + 1) % this.boardWidth == 0 ? Math.floor((i + 1) / this.boardWidth) - 1 : Math.floor((i + 1) / this.boardWidth);
            const y = (i + 1) % this.boardWidth == 0 ? this.boardWidth - 1 : ((i + 1) % this.boardWidth) - 1;

            boardContainer.appendChild(this.boardArray[x][y].generateBomb());
        }

        const flagsToSetDiv = document.getElementById("flags-to-set-div");
        flagsToSetDiv.innerText = this.flagsToSet

        document.getElementById("board-container").style.pointerEvents = "all";
    }


    boxClicedAction(event) {

        const boxID = parseInt(event.composedPath()[1].id.slice(4));

        const x = (boxID + 1) % this.boardWidth == 0 ? Math.floor((boxID + 1) / this.boardWidth) - 1 : Math.floor((boxID + 1) / this.boardWidth);
        const y = (boxID + 1) % this.boardWidth == 0 ? this.boardWidth - 1 : ((boxID + 1) % this.boardWidth) - 1;


        if (event.which == 1) {

            // wystartowanie timer'a
            if (this.isTimerStarted == false && this.boardArray[x][y].isBomb != true) {

                this.isTimerStarted = true;
                document.getElementById("stop-button").disabled = false;


                this.updateTimer = setInterval(() => {
                    const gameTimerDiv = document.getElementById("game-timer");
                    GAME.gameSecunds = GAME.gameSecunds + 1;
                    if (GAME.gameSecunds == 60) {
                        GAME.gameSecunds = 0;
                        GAME.gameMinutes = GAME.gameMinutes + 1;
                    }

                    let gameSecundsString = GAME.gameSecunds;
                    let gameMinutesString = GAME.gameMinutes;

                    if (gameSecundsString < 10)
                        gameSecundsString = "0" + gameSecundsString;

                    if (gameMinutesString < 10)
                        gameMinutesString = "0" + gameMinutesString;

                    gameTimerDiv.innerText = gameMinutesString + ":" + gameSecundsString;
                }, 1000);
            }

            if (this.boardArray[x][y].isFlaged == true) {
                if (this.isVolumeOn == true) {
                    // const audio = new Audio("music/box-lock-2.mp3");
                    const audio = new Audio("music/set-flag-lock.mp3");
                    audio.play();
                }
                return;
            }

            if (this.isVolumeOn == true) {
                const audio = new Audio("music/box-click.mp3");
                audio.play();
            }

            event.target.style.display = "none";
            this.boardArray[x][y].isVisible = true;


            if (this.boardArray[x][y].isBomb == true) {

                clearInterval(this.updateTimer);

                this.isGameOver = true;
                document.getElementById("board-container").style.pointerEvents = "none";

                if (this.isVolumeOn == true) {
                    const audio = new Audio("music/bomb-1-last.mp3");
                    audio.play();
                }

                const updateButtonDiv = document.getElementById("update-button");
                const stopButtonDiv = document.getElementById("stop-button");
                const tempBomobArray = [];

                updateButtonDiv.disabled = true;
                stopButtonDiv.disabled = true;

                for (let i = 0; i < this.boardHeight; i++) {
                    for (let j = 0; j < this.boardWidth; j++) {
                        if (this.boardArray[i][j].isBomb == true)
                            tempBomobArray.push(this.boardArray[i][j]);
                    }
                }

                console.log(tempBomobArray);

                if(tempBomobArray.length == 1){
                    setTimeout(() => { 
                        updateButtonDiv.disabled = false;
                        defatGame();
                    }, 1000)
                }

                for (let i = 0; i < tempBomobArray.length - 1; i++) {

                    const timeToCall = 200 + (300 - (50 / this.boardMines) * (i + 1)) * (i + 1);
                    // const timeToCall = Math.floor((Math.random() * 1500) + 300);
                    // const timeToCall = 200 + (i+1)*200;

                    console.log(`[${i}] = ${timeToCall}`);

                    const showBomb = setTimeout(() => {

                        let randomNumber = 0;
                        while (true) {
                            randomNumber = Math.floor(Math.random() * tempBomobArray.length);
                            if (tempBomobArray[randomNumber].isVisible == false)
                                break;
                        }

                        tempBomobArray[randomNumber].isVisible = true;

                        const bombId = "box-" + tempBomobArray[randomNumber].id;
                        const tempDiv = document.getElementById(bombId);

                        tempDiv.childNodes[0].style.display = "none";
                        if (this.isVolumeOn == true) {
                            if (i == tempBomobArray.length - 2) {
                                const audio = new Audio("music/bomb-1-last.mp3");
                                audio.play();
                            }
                            else {
                                const audio = new Audio("music/bomb-1-last.mp3");
                                audio.volume = 0.6;
                                audio.play();
                            }
                        }

                        if (i == tempBomobArray.length - 2) {
                            setTimeout(() => { 
                                updateButtonDiv.disabled = false;
                                defatGame();
                            }, 1000)
                        }

                    }, timeToCall);
                }
            }


            if (this.boardArray[x][y].bombAround == 0 && this.boardArray[x][y].isBomb != true) {

                const tempBoardArray = [];

                this.boardArray[x][y].isChecked = true;
                tempBoardArray.push(this.boardArray[x][y]);

                // tworzenie tablicy kwadracików do odkrycia
                let counter = 0;
                while (true) {

                    const x = tempBoardArray[counter].x;
                    const y = tempBoardArray[counter].y;

                    if (tempBoardArray[counter].isNeighbour != true) {
                        if (y != 0) {
                            if (this.boardArray[x][y - 1].bombAround == 0 || this.boardArray[x][y - 1].isNeighbour == true) {
                                if (this.boardArray[x][y - 1].isChecked == false) {
                                    this.boardArray[x][y - 1].isChecked = true;
                                    tempBoardArray.push(this.boardArray[x][y - 1]);
                                }
                            }

                            if (x != 0) {
                                if (this.boardArray[x - 1][y - 1].isNeighbour == true) {
                                    if (this.boardArray[x - 1][y - 1].isChecked == false) {
                                        this.boardArray[x - 1][y - 1].isChecked = true;
                                        tempBoardArray.push(this.boardArray[x - 1][y - 1]);
                                    }
                                }
                            }

                            if (x != this.boardHeight - 1) {
                                if (this.boardArray[x + 1][y - 1].isNeighbour == true) {
                                    if (this.boardArray[x + 1][y - 1].isChecked == false) {
                                        this.boardArray[x + 1][y - 1].isChecked = true;
                                        tempBoardArray.push(this.boardArray[x + 1][y - 1]);
                                    }
                                }
                            }
                        }

                        if (x != 0) {
                            if (this.boardArray[x - 1][y].bombAround == 0 || this.boardArray[x - 1][y].isNeighbour == true) {
                                if (this.boardArray[x - 1][y].isChecked == false) {
                                    this.boardArray[x - 1][y].isChecked = true;
                                    tempBoardArray.push(this.boardArray[x - 1][y]);
                                }
                            }
                        }

                        if (y != this.boardWidth - 1) {
                            if (this.boardArray[x][y + 1].bombAround == 0 || this.boardArray[x][y + 1].isNeighbour == true) {
                                if (this.boardArray[x][y + 1].isChecked == false) {
                                    this.boardArray[x][y + 1].isChecked = true;
                                    tempBoardArray.push(this.boardArray[x][y + 1]);
                                }
                            }

                            if (x != 0) {
                                if (this.boardArray[x - 1][y + 1].isNeighbour == true) {
                                    if (this.boardArray[x - 1][y + 1].isChecked == false) {
                                        this.boardArray[x - 1][y + 1].isChecked = true;
                                        tempBoardArray.push(this.boardArray[x - 1][y + 1]);
                                    }
                                }
                            }

                            if (x != this.boardHeight - 1) {
                                if (this.boardArray[x + 1][y + 1].isNeighbour == true) {
                                    if (this.boardArray[x + 1][y + 1].isChecked == false) {
                                        this.boardArray[x + 1][y + 1].isChecked = true;
                                        tempBoardArray.push(this.boardArray[x + 1][y + 1]);
                                    }
                                }
                            }
                        }

                        if (x != this.boardHeight - 1) {
                            if (this.boardArray[x + 1][y].bombAround == 0 || this.boardArray[x + 1][y].isNeighbour == true) {
                                if (this.boardArray[x + 1][y].isChecked == false) {
                                    this.boardArray[x + 1][y].isChecked = true;
                                    tempBoardArray.push(this.boardArray[x + 1][y]);
                                }
                            }
                        }
                    }

                    if (counter == tempBoardArray.length - 1)
                        break;

                    counter = counter + 1;
                }

                // odkrywanie kwadracików będących w tablicy do odkrycia
                for (let i = 1; i < tempBoardArray.length; i++) {
                    const x3 = tempBoardArray[i].x;
                    const y3 = tempBoardArray[i].y;
                    const id3 = "box-" + tempBoardArray[i].id;

                    const tempDiv = document.getElementById(id3);

                    if (this.boardArray[x3][y3].isFlaged == false) {
                        this.boardArray[x3][y3].isVisible = true;
                        tempDiv.childNodes[0].style.display = "none";
                    }
                }
            }


            //warunek do sprawdzenia wygranej
            let checkWin = false;
            for (let i = 0; i < this.boardHeight; i++) {
                for (let j = 0; j < this.boardWidth; j++) {
                    if(this.boardArray[i][j].isBomb != true){
                        if(this.boardArray[i][j].isVisible == false)
                        checkWin = true;
                    }
                }
            }

            if(checkWin == false){
                clearInterval(this.updateTimer);
                document.getElementById("board-container").style.pointerEvents = "none";
                this.isGameOver = true;
                setTimeout(() => {winGame();}, 1000);
            }

        }


        if (event.which == 3) {
            if (this.boardArray[x][y].isFlaged == false) {

                if (this.flagsToSet == 0) {

                    if (this.isVolumeOn == true) {
                        const audio = new Audio("music/set-flag-lock.mp3");
                        // const audio = new Audio("music/box-lock-2.mp3");
                        audio.play();
                    }

                    return;
                }

                if (this.isVolumeOn == true) {
                    const audio = new Audio("music/set-flag.mp3");
                    audio.play();
                }

                const flag = document.createElement("div");
                flag.classList.add("flag");

                event.target.appendChild(flag);

                this.boardArray[x][y].isFlaged = true;

                const flagsToSetDiv = document.getElementById("flags-to-set-div");
                this.flagsToSet = this.flagsToSet - 1;
                flagsToSetDiv.innerText = this.flagsToSet;
            }
            else {

                if (this.isVolumeOn == true) {
                    const audio = new Audio("music/set-flag.mp3");
                    audio.play();
                }

                event.target.removeChild(event.target.lastChild);
                this.boardArray[x][y].isFlaged = false;

                const flagsToSetDiv = document.getElementById("flags-to-set-div");
                this.flagsToSet = this.flagsToSet + 1;
                flagsToSetDiv.innerText = this.flagsToSet;
            }
        }
    }
}