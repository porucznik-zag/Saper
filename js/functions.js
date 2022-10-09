function customBoardSize() {

    const gameRecordsMainBoxDiv = document.getElementById("game-records-main-box");
    gameRecordsMainBoxDiv.style.display = "none";

    const endOfGameMainDiv = document.getElementById("end-of-game-main-box");

    endOfGameMainDiv.style.opacity = 0;
    endOfGameMainDiv.style.pointerEvents = "none";

    GAME.getBoardSize();

    const boardWidthInput = document.getElementById("custom-width-input");
    const boardHeightInput = document.getElementById("custom-height-input");
    const boardMinesInput = document.getElementById("custom-mines-input");

    let isIncorrectValue = false;

    if (GAME.boardWidth < 2 || GAME.boardWidth > 60) {
        isIncorrectValue = true;
        setTimeout(() => { alert("Podano niepoprawną szerokość!\nPoprawny zakres: 1 - 60\nDlatego ustawiono wartości domyślne.\nFORMAT GRY: 10x10 [10]"); }, 500);
    }
    else if (GAME.boardHeight < 2 || GAME.boardHeight > 60) {
        isIncorrectValue = true;
        setTimeout(() => { alert("Podano niepoprawną wysokość!\nPoprawny zakres: 1 - 60\nDlatego ustawiono wartości domyślne.\nFORMAT GRY: 10x10 [10]"); }, 500);
    }
    else if (GAME.boardMines <= 0 || GAME.boardMines >= GAME.boardWidth * GAME.boardHeight) {
        isIncorrectValue = true;
        setTimeout(() => { alert("Podano niepoprawną liczbę min!\nPoprawny zakres: (1) - (width*heigth-1)\nDlatego ustawiono wartości domyślne.\nFORMAT GRY: 10x10 [10]"); }, 500);
    }

    if(isIncorrectValue == true){
        GAME.boardWidth = 10;
        GAME.boardHeight = 10;
        GAME.boardMines = 10;
        GAME.flagsToSet = 10;
        GAME.gameFormat = "10x10x10";
        boardWidthInput.value = "";
        boardHeightInput.value = "";
        boardMinesInput.value = "";
    }

    GAME.createBoardArray();
    GAME.generateBoard();

    if (firstRun == false) {
        if (GAME.isVolumeOn == true) {
            const audio = new Audio("music/button-click.mp3");
            audio.play();
        }
    }
    else {
        firstRun = false;
    }
}



function boxClicked(event) {
    if (GAME.isGameOver != true)
        GAME.boxClicedAction(event);
}



function scaleBoxSize() {
    const boxes = document.querySelectorAll(".box");
    const boardContainer = document.getElementById("board-container");

    let = boardGap = 2;
    boardContainer.style.gap = boardGap + "px";

    const boardWidth = parseFloat(boardContainer.clientWidth);
    const boxWidth = document.getElementById("box-0").clientWidth;
    boardContainer.style.height = ((boardWidth - (boardGap * (GAME.boardWidth - 1))) / GAME.boardWidth) * GAME.boardHeight + boardGap * (GAME.boardHeight - 1) + "px";

    boxes.forEach(element => {
        element.style.width = (boardWidth - boardGap * (GAME.boardWidth - 1)) / GAME.boardWidth + "px";
        element.style.height = (boardWidth - boardGap * (GAME.boardWidth - 1)) / GAME.boardWidth + "px";
        element.lastChild.style.fontSize = boardWidth / (GAME.boardWidth * 2.5) + "px";
    });

    const startFormBoxDiv = document.getElementById("start-from-box");
    const flagsToSetDiv = document.getElementById("flags-to-set-div");
    const startButton = document.getElementById("update-button");



    flagsToSetDiv.style.width = startButton.clientWidth * 0.5 + "px";
    flagsToSetDiv.style.right = (startFormBoxDiv.clientWidth - flagsToSetDiv.clientWidth) / 2 + "px";


    // const body = document.body, html = document.documentElement;
    // const gameRecordsMainBox = document.getElementById("game-records-main-box");
    // gameRecordsMainBox.style.height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ) - 101 + "px";

    // const endOfGameBox = document.getElementById("end-of-game-box");
    // endOfGameBox.style.width = boardContainer.clientWidth + "px";
    // endOfGameBox.style.height = boardContainer.clientHeight + "px";


    setTimeout(() => { scaleBoxSize(); }, 100);
}



function changeBoardWidth(percentValue) {
    const percentValueDiv = document.getElementById("custom-percent-value-div");
    const boardContainer = document.getElementById("board-container");

    percentValueDiv.innerText = percentValue;
    boardContainer.style.width = percentValue + "%";
}



function openSettingsMenu() {

    if (GAME.isVolumeOn == true) {
        const audio = new Audio("music/button-click.mp3");
        audio.play();
    }

    const settingsMenuDiv = document.getElementById("settings-menu");
    settingsMenuDiv.classList.toggle("settings-menu-open");
}



function switchVolume() {

    const audio = new Audio("music/button-click.mp3");
    audio.play();

    const volumeSwitchDiv = document.getElementById("icon-switch-box");

    if (GAME.isVolumeOn == true) {
        GAME.isVolumeOn = false;

        volumeSwitchDiv.replaceChildren();

        const volumeOffIcon = document.createElement("i");
        volumeOffIcon.classList.add("icon-volume-off");

        volumeSwitchDiv.appendChild(volumeOffIcon);
    }
    else {
        GAME.isVolumeOn = true;

        volumeSwitchDiv.replaceChildren();

        const volumeUpIcon = document.createElement("i");
        volumeUpIcon.classList.add("icon-volume-up");

        volumeSwitchDiv.appendChild(volumeUpIcon);
    }
}

function loadSoundBefore() {
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

    audio = new Audio("music/set-flag-lock.mp3");
    audio.load();

    audio = new Audio("music/bomb-1-last.mp3");
    audio.load();
}



function changeColoToLight() {
    document.documentElement.style.setProperty("--website-bg-color", "rgb(240, 251, 255)");
    document.documentElement.style.setProperty("--main-color", "rgb(141, 195, 242)");
    document.documentElement.style.setProperty("--main-bg-color", "rgb(32, 53, 65)");
    document.documentElement.style.setProperty("--flag-color", "rgb(60, 71, 91)");
    document.documentElement.style.setProperty("--box-first-layer-color", "rgb(82, 141, 193)");
    document.documentElement.style.setProperty("--box-first-layer-color-hover", "rgb(105, 163, 214)");
    document.documentElement.style.setProperty("--box-second-layer-color", "rgb(103, 116, 126)");
    document.documentElement.style.setProperty("--end-title-box-bg", "rgba(255, 255, 255, 0.7)");
    document.documentElement.style.setProperty("--end-title-box-color", "rgb(52, 62, 68)");
    document.documentElement.style.setProperty("--end-title-box-button", "rgb(82, 141, 193)");
    
    document.documentElement.style.setProperty("--game-records-bg", "rgb(203, 225, 255)");
    document.documentElement.style.setProperty("--game-records-border-color", "rgb(16, 44, 85)");
    document.documentElement.style.setProperty("--game-records-main-color", "rgb(255, 255, 255)");
    document.documentElement.style.setProperty("--game-records-formats-list-title-color", "rgb(76, 157, 224)");
    document.documentElement.style.setProperty("--game-records-list-title-bg-color", "rgb(216, 144, 55)");
    document.documentElement.style.setProperty("--game-records-list-title-color", "rgb(88, 59, 23)");
    document.documentElement.style.setProperty("--game-records-box-bg-colo", "rgb(242, 210, 122)");
    document.documentElement.style.setProperty("--game-records-box-color", "rgb(129, 104, 33)");
}

function changeColoToDark() {
    document.documentElement.style.setProperty("--website-bg-color", "rgb(52, 65, 78)");
    document.documentElement.style.setProperty("--main-color", "rgb(82, 141, 193)");
    document.documentElement.style.setProperty("--main-bg-color", "rgb(32, 53, 65)");
    document.documentElement.style.setProperty("--flag-color", "rgb(169, 208, 234)");
    document.documentElement.style.setProperty("--box-first-layer-color", "rgb(43, 91, 133)");
    document.documentElement.style.setProperty("--box-first-layer-color-hover", "rgb(52, 115, 169)");
    document.documentElement.style.setProperty("--box-second-layer-color", "rgb(95, 124, 146)");
    document.documentElement.style.setProperty("--end-title-box-bg", "rgba(0, 0, 0, 0.7)");
    document.documentElement.style.setProperty("--end-title-box-color", "rgb(255, 255, 255)");
    document.documentElement.style.setProperty("--end-title-box-button", "rgb(95, 124, 146)");

    document.documentElement.style.setProperty("--game-records-bg", "rgb(18, 22, 28)");
    document.documentElement.style.setProperty("--game-records-border-color", "white");
    document.documentElement.style.setProperty("--game-records-main-color", "white");
    document.documentElement.style.setProperty("--game-records-formats-list-title-color", "rgb(43, 91, 133)");
    document.documentElement.style.setProperty("--game-records-list-title-bg-color", "rgb(142, 90, 27)");
    document.documentElement.style.setProperty("--game-records-list-title-color", "white");
    document.documentElement.style.setProperty("--game-records-box-bg-colo", "rgb(209, 144, 65)");
    document.documentElement.style.setProperty("--game-records-box-color", "white");
}

function changeWebTheme() {

    if (GAME.isVolumeOn == true) {
        const audio = new Audio("music/button-click.mp3");
        audio.play();
    }

    if (GAME.websiteTheme == "dark") {
        GAME.websiteTheme = "light";
        changeColoToLight();
    }
    else if (GAME.websiteTheme == "light") {
        GAME.websiteTheme = "dark";
        changeColoToDark();
    }
}


function defatGame() {
    const endOfGameButtonSaveDiv = document.getElementById("end-of-game-button-save");
    endOfGameButtonSaveDiv.style.display = "none";

    const endOfGameMainDiv = document.getElementById("end-of-game-main-box");
    const endOfGameTitleDiv = document.getElementById("end-of-game-title");
    const endOfGameTimeDiv = document.getElementById("end-of-game-time");
    const endOfGameTypeDiv = document.getElementById("end-of-game-type");

    endOfGameMainDiv.style.opacity = 1;
    endOfGameMainDiv.style.pointerEvents = "all";

    endOfGameTitleDiv.innerText = "PRZEGRANA";


    let gameSecundsString = Math.floor(GAME.gameTime / 1000);
    let gameMinutesString = Math.floor((GAME.gameTime / 1000) / 60);
    // let gameMilisecundsString = GAME.gameTime%1000;
    // let gameMilisecundsString = Math.floor((GAME.gameTime%1000) / 10);

    if (gameSecundsString < 10)
        gameSecundsString = "0" + gameSecundsString;

    if (gameMinutesString < 10)
        gameMinutesString = "0" + gameMinutesString;

    endOfGameTimeDiv.innerText = gameMinutesString + ":" + gameSecundsString;

    endOfGameTypeDiv.innerHTML = GAME.boardWidth + "x" + GAME.boardHeight + " <span>[" + GAME.boardMines + "]</span>";
}

function winGame() {
    const endOfGameMainDiv = document.getElementById("end-of-game-main-box");
    const endOfGameTitleDiv = document.getElementById("end-of-game-title");
    const endOfGameTimeDiv = document.getElementById("end-of-game-time");
    const endOfGameTypeDiv = document.getElementById("end-of-game-type");

    endOfGameMainDiv.style.opacity = 1;
    endOfGameMainDiv.style.pointerEvents = "all";

    endOfGameTitleDiv.innerText = "WYGRANA";


    let gameSecundsString = GAME.gameSecunds;
    let gameMinutesString = GAME.gameMinutes;

    if (gameSecundsString < 10)
        gameSecundsString = "0" + gameSecundsString;

    if (gameMinutesString < 10)
        gameMinutesString = "0" + gameMinutesString;

    endOfGameTimeDiv.innerText = gameMinutesString + ":" + gameSecundsString;

    endOfGameTypeDiv.innerHTML = GAME.boardWidth + "x" + GAME.boardHeight + " <span>[" + GAME.boardMines + "]</span>";

    const endOfGameButtonSaveDiv = document.getElementById("end-of-game-button-save");
    endOfGameButtonSaveDiv.style.display = "flex";
}



function stopGame() {

}



function openRecordsScreen() {

    if (GAME.isVolumeOn == true) {
        const audio = new Audio("music/button-click.mp3");
        audio.play();
    }

    const gameRecordsMainBoxDiv = document.getElementById("game-records-main-box");
    gameRecordsMainBoxDiv.style.display = "flex";

    const settingsMenuDiv = document.getElementById("settings-menu");
    settingsMenuDiv.classList.remove("settings-menu-open");

    loadRecordsMap();
}


function closeRecordsScreen(event) {
    if (event.target.id == "game-records-main-box") {

        if (GAME.isVolumeOn == true) {
            const audio = new Audio("music/button-click.mp3");
            audio.play();
        }

        const gameRecordsMainBoxDiv = document.getElementById("game-records-main-box");
        gameRecordsMainBoxDiv.style.display = "none";
    }
}




function loadRecordsMap() {
    GAME.gameRecords = decompressCookiesFile();


    // GAME.gameRecords = new Map();
    // console.log(GAME.gameRecords.size);

    if (GAME.gameRecords.size > 0) {
        const gameFormatListDiv = document.getElementById("game-formats-list");
        const gameRecordsListDiv = document.getElementById("game-records-list");
        const gameRecordsListTitleDiv = document.getElementById("game-records-list-format-title");

        gameFormatListDiv.replaceChildren();
        gameRecordsListDiv.replaceChildren();
        gameRecordsListTitleDiv.innerText = "Wybierz wymiar";

        GAME.gameRecords.forEach((value, key) => {
            const gameFormatBox = document.createElement("div");
            gameFormatBox.classList.add("game-format-box");
            gameFormatBox.addEventListener("click", (e) => { changeRecordList(e) })
            gameFormatBox.innerText = key;


            // const deleteFormatBoxDiv = document.createElement("div");
            // deleteFormatBoxDiv.classList.add("delete-format-box");
            // deleteFormatBoxDiv.addEventListener("click", (e) => { deleteRecordFormat(e) });

            // gameFormatBox.appendChild(deleteFormatBoxDiv);

            gameFormatListDiv.appendChild(gameFormatBox);
        });
    }
}

function deleteRecordFormat(e){
    // isDeleted = true;
    // console.log(e.path[1].innerText);
    const gameFormat = e.path[1].innerText;

    deleteCookie(gameFormat);
    loadRecordsMap();


    const gameRecordsListTitleDiv = document.getElementById("game-records-list-format-title");
    gameRecordsListTitleDiv.innerText = "Wybierz wymiar";
    // isDeleted = false;
}




function changeRecordList(event) {

    if (GAME.isVolumeOn == true) {
        const audio = new Audio("music/button-click.mp3");
        audio.play();
    }

    const gameFormat = event.target.innerText;
    const gameRecordsListTitleDiv = document.getElementById("game-records-list-format-title");
    const gameRecordsListDiv = document.getElementById("game-records-list");
    const gameFormatListDiv = document.getElementById("game-formats-list");


    const formatListChildren = gameFormatListDiv.children;
    for (let i = 0; i < formatListChildren.length; i++) {
        formatListChildren[i].classList.remove("selected-game-format-box");
    }

    event.target.classList.add("selected-game-format-box");


    const tempString = "Dla wymiaru: " + gameFormat.slice(0, gameFormat.lastIndexOf("x")).concat(" ") + "<span>[" + gameFormat.slice(gameFormat.lastIndexOf("x")+1) + "]</span>";

    gameRecordsListTitleDiv.innerHTML = tempString;
    gameRecordsListDiv.replaceChildren();

    GAME.gameRecords.get(gameFormat).forEach(element => {
        const gameRecordBox = document.createElement("div");
        gameRecordBox.classList.add("game-record-box");
        let stringTime = "";
        if (Math.floor((element[1] / 1000) / 60) < 10)
            stringTime += "0" + Math.floor((element[1] / 1000) / 60) + ":";
        else
            stringTime += Math.floor((element[1] / 1000) / 60) + ":";
        if(Math.floor(element[1] / 1000)%60 < 10)
            stringTime += "0" + Math.floor(element[1] / 1000)%60 + ":";
        else
            stringTime += Math.floor(element[1] / 1000)%60 + ":"
        stringTime += element[1]%1000;
        // const stringTime = Math.floor((element[1] / 1000) / 60) + ":" + Math.floor(element[1] / 1000)%60 + ":" + element[1]%1000;
        gameRecordBox.innerText = `${element[0]} ${stringTime}`;

        gameRecordsListDiv.appendChild(gameRecordBox);
    });
}



function saveGameResults() {

    const nicknameInput = document.getElementById("custom-nick-input");
    nicknameInput.value == "" ? GAME.nickname = "GOŚĆ" : GAME.nickname = nicknameInput.value;

    GAME.addNewRecord();
}



/* ----------------------COOKIE FUNCTIONS------------------------- */

function setCookie(cookieName, cookieValue, exDays) {
    const d = new Date();
    d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let c = cookieArray[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
    }
    return "";
}

function deleteCookie(cookieName) {
    document.cookie = cookieName + "=; expires=01 Jan 1970 00:00:00 GMT;path=/";
}

function deleteAllCookies() {

    if(document.cookie == ""){
        console.log("nie ma cookiesów");
        return;
    }

    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function decompressCookiesFile(){

    const records = new Map();


    if(document.cookie == ""){
        console.log("nie ma cookiesów");
        return records;
    }

    const cookieArray = document.cookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
        while (cookieArray[i].charAt(0) == ' ') {
            cookieArray[i] = cookieArray[i].substring(1);
        }
    }


    for(let i=0; i<cookieArray.length; i++){
        const gameFormat = cookieArray[i].substring(0,cookieArray[i].indexOf("="));

        const recordsArray = [];

        cookieArray[i] = cookieArray[i].replace((gameFormat+"="),"");

        const cookieElementsArray = cookieArray[i].split("?");

        for(let j=0; j<cookieElementsArray.length; j++){
            const cookieElementsOfElementsArray = cookieElementsArray[j].split("~");
            recordsArray.push(cookieElementsOfElementsArray);
        }

        records.set(gameFormat,recordsArray);
    }

    return records;
}

function compressCookieFile(recordsArray){
    recordsArray.forEach((value, key) => {
        const cookieName = key;
        let cookieString = "";
        for(let i=0; i< value.length; i++){
            cookieString += value[i][0] + "~" + value[i][1];
            if(i < value.length-1)
                cookieString += "?";
        }
        setCookie(cookieName, cookieString, 10);
    });
}