function customBoardSize(){

    GAME.getBoardSize();
    GAME.createBoardArray();
    GAME.generateBoard();

    if(firstRun == false){
        if(GAME.isVolumeOn == true){
            const audio = new Audio("music/button-click.mp3");
            audio.play();       
        }
    }
    else{
        firstRun = false;
    }
}



function boxClicked(event){
    if(GAME.isGameOver != true)
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
        element.lastChild.style.fontSize = boardWidth / (GAME.boardWidth*2.5) + "px";
    });

    const startFormBoxDiv = document.getElementById("start-from-box");
    const flagsToSetDiv = document.getElementById("flags-to-set-div");
    const startButton = document.getElementById("update-button");


    // console.log(flagsToSetDiv);
    // console.log(startFormBoxDiv.clientWidth * 0.8);

    flagsToSetDiv.style.width = startButton.clientWidth * 0.5 + "px";
    flagsToSetDiv.style.right = (startFormBoxDiv.clientWidth - flagsToSetDiv.clientWidth) / 2 + "px";



    setTimeout(() => {scaleBoxSize();}, 100);
}



function changeBoardWidth(percentValue){
    const percentValueDiv = document.getElementById("custom-percent-value-div");
    const boardContainer = document.getElementById("board-container");

    percentValueDiv.innerText = percentValue;
    boardContainer.style.width = percentValue + "%";
}



function openSettingsMenu(){

    if(GAME.isVolumeOn == true){
        const audio = new Audio("music/button-click.mp3");
        audio.play();       
    }

    const settingsMenuDiv = document.getElementById("settings-menu");
    settingsMenuDiv.classList.toggle("settings-menu-open");
}



function switchVolume(){

    const audio = new Audio("music/button-click.mp3");
    audio.play();       

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
    audio.muted = true;
    audio.load();

    audio = new Audio("music/box-click.mp3");
    audio.load();  
    
    audio = new Audio("music/set-flag.mp3");
    audio.load(); 

    audio = new Audio("music/button-click.mp3");
    audio.load();
}



function changeColoToLight(){
    document.documentElement.style.setProperty("--website-bg-color","whitesmoke");
    document.documentElement.style.setProperty("--main-color","rgb(82, 141, 193)");
    document.documentElement.style.setProperty("--main-bg-color","rgb(52, 62, 68)");
    document.documentElement.style.setProperty("--flag-color","rgb(60, 71, 91)");
    document.documentElement.style.setProperty("--box-first-layer-color","rgb(82, 141, 193)");
    document.documentElement.style.setProperty("--box-first-layer-color-hover","rgb(105, 163, 214)");
    document.documentElement.style.setProperty("--box-second-layer-color","rgb(103, 116, 126)");
}

function changeColoToDark(){
    document.documentElement.style.setProperty("--website-bg-color","rgb(52, 65, 78)");
    document.documentElement.style.setProperty("--main-color","rgb(82, 141, 193))");
    document.documentElement.style.setProperty("--main-bg-color","rgb(78, 85, 89)");
    document.documentElement.style.setProperty("--flag-color","rgb(169, 208, 234)");
    document.documentElement.style.setProperty("--box-first-layer-color","rgb(43, 91, 133)");
    document.documentElement.style.setProperty("--box-first-layer-color-hover","rgb(52, 115, 169)");
    document.documentElement.style.setProperty("--box-second-layer-color","rgb(95, 124, 146)");
}

function changeWebTheme(){

    if(GAME.isVolumeOn == true){
        const audio = new Audio("music/button-click.mp3");
        audio.play();       
    }

    if(GAME.websiteTheme == "dark"){
        GAME.websiteTheme = "light";
        changeColoToLight();
    }
    else if(GAME.websiteTheme == "light"){
        GAME.websiteTheme = "dark";
        changeColoToDark();
    }
}