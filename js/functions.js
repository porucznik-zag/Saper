function customBoardSize(){
    GAME.getBoardSize();
    GAME.createBoardArray();
    GAME.generateBoard();
}



function boxClicked(event){
    GAME.boxClicedAction(event);
}



function scaleBoxSize(){
    const boxes = document.querySelectorAll(".box");
    const boardContainer = document.getElementById("board-container");

    let = boardGap = 2;
    boardContainer.style.gap = boardGap + "px";

    const boardWidth = boardContainer.clientWidth;


    boardContainer.style.height = ((boardWidth - boardGap*(GAME.boardWidth-1)) / GAME.boardWidth)*GAME.boardHeight + boardGap*(GAME.boardHeight-1) + "px";

    boxes.forEach(element => {
        element.style.width = (boardWidth - boardGap*(GAME.boardWidth-1)) / GAME.boardWidth + "px";
        element.style.height = (boardWidth - boardGap*(GAME.boardWidth-1)) / GAME.boardWidth + "px";
    });

    setTimeout(() => {scaleBoxSize();}, 100);
}



function changeBoardWidth(percentValue){
    const percentValueDiv = document.getElementById("custom-percent-value-div");
    const boardContainer = document.getElementById("board-container");

    percentValueDiv.innerText = percentValue;
    boardContainer.style.width = percentValue + "%";
}

function openSettingsMenu(){
    const settingsMenuDiv = document.getElementById("settings-menu");
    settingsMenuDiv.classList.toggle("settings-menu-open");
}

function switchVolume(){


    const volumeSwitchDiv = document.getElementById("icon-switch-box");
    
    if(GAME.isVolumeOn == true){
        GAME.isVolumeOn = false;

        volumeSwitchDiv.replaceChildren();

        const volumeOffIcon = document.createElement("i");
        volumeOffIcon.classList.add("icon-volume-off");

        volumeSwitchDiv.appendChild(volumeOffIcon);
    }
    else{
        GAME.isVolumeOn = true;

        volumeSwitchDiv.replaceChildren();

        const volumeUpIcon = document.createElement("i");
        volumeUpIcon.classList.add("icon-volume-up");

        volumeSwitchDiv.appendChild(volumeUpIcon);
    }
}

function loadSoundBefore(){
    let audio = new Audio("music/box-lock-2.mp3");
    audio.volume = 0;
    audio.play();

    audio = new Audio("music/box-click.mp3");
    audio.play();  
    
    audio = new Audio("music/set-flag.mp3");
    audio.play(); 
}