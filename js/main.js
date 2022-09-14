let GAME = new SaperGame();
let firstRun = true;
let widthPercent = 35;

document.getElementById("stop-button").disabled = true;

customBoardSize();
scaleBoxSize();
loadSoundBefore();