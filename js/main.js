let GAME = new SaperGame();
let firstRun = true;
// let isDeleted = false;

document.getElementById("stop-button").disabled = true;

customBoardSize();
scaleBoxSize();
loadSoundBefore();

// loadRecordsMap();

const gameRecordsMainBoxDiv = document.getElementById("game-records-main-box");
gameRecordsMainBoxDiv.addEventListener("click", (e) => {closeRecordsScreen(e)});





// setCookie("10x10x5", "Seba~72000?Kamil~12000?Krzyś~134037",10);
// setCookie("8x12x10", "Kamil~287034?Seba~12704",10);
// deleteCookie("8x12x10");

deleteAllCookies();




decompressCookiesFile();
// console.log(GAME.gameRecords);

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