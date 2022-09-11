class SaperGame {
    constructor(){
        this.boardWidth = 0;
        this.boardHeight = 0;
        this.boardMines = 0;
        this.minesArray = [];
        this.boardArray = new Array();
        this.setFlags = 0;
        this.bestScore = 0;
        this.isVolumeOn = true;
    }

    
    getBoardSize() {
        const boardWidthInput = document.getElementById("custom-width-input");
        const boardHeightInput = document.getElementById("custom-height-input");
        const boardMinesInput = document.getElementById("custom-mines-input");

        boardWidthInput.value == "" ? this.boardWidth = 10 : this.boardWidth = boardWidthInput.value;
        boardHeightInput.value == "" ? this.boardHeight = 10 : this.boardHeight = boardHeightInput.value;
        boardMinesInput.value == "" ? this.boardMines = 10 : this.boardMines = boardMinesInput.value;
    }


    createBoardArray(){
        this.boardArray = Array(parseInt(this.boardHeight));

        for(let i=0; i<this.boardArray.length; i++){
            this.boardArray[i] = Array(parseInt(this.boardWidth));
        }
        
        for(let i=0; i<this.boardHeight; i++){
            for(let j=0; j<this.boardWidth; j++){
                this.boardArray[i][j] = new Box();
                this.boardArray[i][j].id = i*this.boardWidth + j;
                this.boardArray[i][j].x = i;
                this.boardArray[i][j].y = j;
            }
        }

        this.minesArray = [];

        for(let i=0; i< this.boardMines; i++){
            loop0:
            while(true){
                const randomNumber = Math.floor(Math.random() * (this.boardWidth * this.boardHeight) + 1);

                loop1:
                for(let i=0; i<this.boardHeight; i++){
                    for(let j=0; j<this.boardWidth; j++){
                        if(this.boardArray[i][j].id == randomNumber-1){
                            if(this.boardArray[i][j].isBomb == false){
                                this.boardArray[i][j].isBomb = true;
                                this.minesArray.push(randomNumber-1);
                                break loop0;
                            }
                            break loop1;
                        }
                    }
                }
            }
        }

        // wpisanie ilości bomb wokół kwadracika
        for(let i=0; i<this.boardHeight; i++)
        {
            for(let j=0; j<this.boardWidth; j++)
            {
                let bombAround = 0;

                if(j != 0){
                    if(this.boardArray[i][j-1].isBomb == true)
                        bombAround = bombAround + 1;
                    
                    if(i != 0){
                        if(this.boardArray[i-1][j-1].isBomb == true)
                            bombAround = bombAround + 1;
                    }

                    if(i != this.boardHeight-1){
                        if(this.boardArray[i+1][j-1].isBomb == true)
                            bombAround = bombAround + 1;
                    }
                }

                if(i != 0){
                    if(this.boardArray[i-1][j].isBomb == true)
                        bombAround = bombAround + 1;
                }

                if(j != this.boardWidth-1){
                    if(this.boardArray[i][j+1].isBomb == true)
                        bombAround = bombAround + 1;
                    
                    if(i != 0){
                        if(this.boardArray[i-1][j+1].isBomb == true)
                            bombAround = bombAround + 1;
                    }

                    if(i != this.boardHeight-1){
                        if(this.boardArray[i+1][j+1].isBomb == true)
                            bombAround = bombAround + 1;
                    }
                }

                if(i != this.boardHeight-1){
                    if(this.boardArray[i+1][j].isBomb == true)
                        bombAround = bombAround + 1;
                }

                this.boardArray[i][j].bombAround = bombAround;
            }
        }


        // ustawienie właściwości isNeighbour dla właściwych pól
        for(let i=0; i<this.boardHeight; i++)
        {
            for(let j=0; j<this.boardWidth; j++)
            {
                let isNeighbour = 0;

                if(j != 0){
                    if(this.boardArray[i][j-1].bombAround == 0 && this.boardArray[i][j-1].isBomb != true && this.boardArray[i][j].bombAround > 0)
                        isNeighbour = isNeighbour + 1;
                    
                    if(i != 0){
                        if(this.boardArray[i-1][j-1].bombAround == 0 && this.boardArray[i-1][j-1].isBomb != true && this.boardArray[i][j].bombAround > 0)
                            isNeighbour = isNeighbour + 1;
                    }

                    if(i != this.boardHeight-1){
                        if(this.boardArray[i+1][j-1].bombAround == 0 && this.boardArray[i+1][j-1].isBomb != true && this.boardArray[i][j].bombAround > 0)
                            isNeighbour = isNeighbour + 1;
                    }
                }

                if(i != 0){                    
                    if(this.boardArray[i-1][j].bombAround == 0 && this.boardArray[i-1][j].isBomb != true && this.boardArray[i][j].bombAround > 0)
                        isNeighbour = isNeighbour + 1;
                }

                if(j != this.boardWidth-1){
                    if(this.boardArray[i][j+1].bombAround == 0 && this.boardArray[i][j+1].isBomb != true && this.boardArray[i][j].bombAround > 0)
                        isNeighbour = isNeighbour + 1;
                    
                    if(i != 0){
                        if(this.boardArray[i-1][j+1].bombAround == 0 && this.boardArray[i-1][j+1].isBomb != true && this.boardArray[i][j].bombAround > 0)
                            isNeighbour = isNeighbour + 1;
                    }

                    if(i != this.boardHeight-1){
                        if(this.boardArray[i+1][j+1].bombAround == 0 && this.boardArray[i+1][j+1].isBomb != true && this.boardArray[i][j].bombAround > 0)
                            isNeighbour = isNeighbour + 1;
                    }
                }

                if(i != this.boardHeight-1){
                    if(this.boardArray[i+1][j].bombAround == 0 && this.boardArray[i+1][j].isBomb != true && this.boardArray[i][j].bombAround > 0)
                        isNeighbour = isNeighbour + 1;
                }

                if(isNeighbour > 0)
                    this.boardArray[i][j].isNeighbour = true;
            }
        }

        this.minesArray.sort((a, b) => {return a - b});

        console.log(this.boardArray);
        console.log(this.minesArray);
    }

    generateBoard(){
        const boardContainer = document.getElementById("board-container");

        boardContainer.replaceChildren();
        boardContainer.style.gridTemplateColumns = `repeat(${this.boardWidth}, auto)`;
        boardContainer.style.gridTemplateRows = `repeat(${this.boardHeight}, auto)`;

        for(let i=0; i<this.boardWidth*this.boardHeight; i++){

            const x = (i+1)%this.boardWidth == 0 ? Math.floor((i+1)/this.boardWidth) - 1 : Math.floor((i+1)/this.boardWidth);
            const y = (i+1)%this.boardWidth == 0 ? this.boardWidth-1 : ((i+1)%this.boardWidth) - 1;

            boardContainer.appendChild(this.boardArray[x][y].generateBomb());
        }
    }


    boxClicedAction(event){

        const boxID = parseInt(event.composedPath()[1].id.slice(4));

        const x = (boxID+1)%this.boardWidth == 0 ? Math.floor((boxID+1)/this.boardWidth) - 1 : Math.floor((boxID+1)/this.boardWidth);
        const y = (boxID+1)%this.boardWidth == 0 ? this.boardWidth-1 : ((boxID+1)%this.boardWidth) - 1;
        

        if(event.which == 1){
            if (this.boardArray[x][y].isFlaged == true){
                if(this.isVolumeOn == true){
                    const audio = new Audio("music/box-lock-2.mp3");
                    audio.play();
                }
                return;
            }
            
            if(this.isVolumeOn == true){
                const audio = new Audio("music/box-click.mp3");
                audio.play();       
            }

            event.target.style.display = "none";
            this.boardArray[x][y].isVisible = true;

            if(this.boardArray[x][y].bombAround == 0 && this.boardArray[x][y].isBomb != true){

                const tempBoardArray = [];

                this.boardArray[x][y].isChecked = true;
                tempBoardArray.push(this.boardArray[x][y]);

                // tworzenie tablicy kwadracików do odkrycia
                let counter = 0;
                while(true){

                    const x = tempBoardArray[counter].x;
                    const y = tempBoardArray[counter].y;

                    if(tempBoardArray[counter].isNeighbour != true){
                        if(y != 0){
                            if(this.boardArray[x][y-1].bombAround == 0 || this.boardArray[x][y-1].isNeighbour == true){
                                if(this.boardArray[x][y-1].isChecked == false){
                                    this.boardArray[x][y-1].isChecked = true;
                                    tempBoardArray.push(this.boardArray[x][y-1]);
                                }
                            }

                            if(x != 0){
                                if(this.boardArray[x-1][y-1].isNeighbour == true){
                                    if(this.boardArray[x-1][y-1].isChecked == false){
                                        this.boardArray[x-1][y-1].isChecked = true;
                                        tempBoardArray.push(this.boardArray[x-1][y-1]);
                                    }
                                }
                            }
        
                            if(x != this.boardHeight-1){
                                if(this.boardArray[x+1][y-1].isNeighbour == true){
                                    if(this.boardArray[x+1][y-1].isChecked == false){
                                        this.boardArray[x+1][y-1].isChecked = true;
                                        tempBoardArray.push(this.boardArray[x+1][y-1]);
                                    }
                                }
                            }
                        }
        
                        if(x != 0){
                            if(this.boardArray[x-1][y].bombAround == 0 || this.boardArray[x-1][y].isNeighbour == true){
                                if(this.boardArray[x-1][y].isChecked == false){
                                    this.boardArray[x-1][y].isChecked = true;
                                    tempBoardArray.push(this.boardArray[x-1][y]);
                                }
                            }
                        }
        
                        if(y != this.boardWidth-1){
                            if(this.boardArray[x][y+1].bombAround == 0 || this.boardArray[x][y+1].isNeighbour == true){
                                if(this.boardArray[x][y+1].isChecked == false){
                                    this.boardArray[x][y+1].isChecked = true;
                                    tempBoardArray.push(this.boardArray[x][y+1]);
                                }
                            }

                            if(x != 0){
                                if(this.boardArray[x-1][y+1].isNeighbour == true){
                                    if(this.boardArray[x-1][y+1].isChecked == false){
                                        this.boardArray[x-1][y+1].isChecked = true;
                                        tempBoardArray.push(this.boardArray[x-1][y+1]);
                                    }
                                }
                            }
        
                            if(x != this.boardHeight-1){
                                if(this.boardArray[x+1][y+1].isNeighbour == true){
                                    if(this.boardArray[x+1][y+1].isChecked == false){
                                        this.boardArray[x+1][y+1].isChecked = true;
                                        tempBoardArray.push(this.boardArray[x+1][y+1]);
                                    }
                                }
                            }
                        }
        
                        if(x != this.boardHeight-1){
                            if(this.boardArray[x+1][y].bombAround == 0 || this.boardArray[x+1][y].isNeighbour == true){
                                if(this.boardArray[x+1][y].isChecked == false){
                                    this.boardArray[x+1][y].isChecked = true;
                                    tempBoardArray.push(this.boardArray[x+1][y]);
                                }
                            }
                        }
                    }

                    if(counter == tempBoardArray.length-1)
                        break;

                    counter = counter + 1;
                }

                // odkrywanie kwadracików będących w tablicy do odkrycia
                for(let i=1; i<tempBoardArray.length; i++){
                    const x3 = tempBoardArray[i].x;
                    const y3 = tempBoardArray[i].y;
                    const id3 = "box-" + tempBoardArray[i].id;

                    const tempDiv = document.getElementById(id3);

                    if(this.boardArray[x3][y3].isFlaged == false){
                        this.boardArray[x3][y3].isVisible = true;
                        tempDiv.childNodes[0].style.display = "none";
                    }
                }
            }
        }


        if(event.which == 3){
            if(this.isVolumeOn == true){
                const audio = new Audio("music/set-flag.mp3");
                audio.play();       
            }

            if (this.boardArray[x][y].isFlaged == false){
                const flag = document.createElement("div");
                flag.classList.add("flag");

                event.target.appendChild(flag);

                this.boardArray[x][y].isFlaged = true;
            }
            else{
                event.target.removeChild(event.target.lastChild);
                this.boardArray[x][y].isFlaged = false;
            }
        }
    }
}