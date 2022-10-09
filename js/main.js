let GAME = new SaperGame();
let firstRun = true;
document.getElementById("stop-button").disabled = true;

customBoardSize();
scaleBoxSize();
loadSoundBefore();
// loadRecordsMap();

const gameRecordsMainBoxDiv = document.getElementById("game-records-main-box");
gameRecordsMainBoxDiv.addEventListener("click", (e) => {closeRecordsScreen(e)});

// setCookie("8x12x10", "Kamil~287034?Seba~12704",10);
// deleteCookie("8x12x10");
