let numClicks = 0;
let openCard;
let numOfpairOfCards = 0;
let timerId;
let seconds;
let current;
let user;
document.addEventListener("DOMContentLoaded", () => {
    let newgame = document.getElementById('newGame');
    newgame.addEventListener('click', newGame);
    current = localStorage.getItem('currentUser');
    if (current) {
        user = JSON.parse(localStorage.getItem(current));
        document.getElementById("name").textContent = "Hello " + user.userName + '👋';
    }
    newGame();
});

function newGame() {
    let cards = document.getElementById('cards');
    document.getElementById("cards").innerHTML = "";
    let level = localStorage.getItem('currentLevel');
    let numPairs;
    if (level === "hard") {
        numPairs = 12;
    }
    if (level === "medium") {
        numPairs = 9;
    }
    if (level === "easy") {
        numPairs = 6;
    }
    for (let i = 1; i <= numPairs; i++) {
        cards.insertAdjacentHTML('beforeend', `<button class="cardBtn"></button>`);
    }
    /*מקבלת מערך של תמונות בסדר חדש על ידי שליחה לפונקציה randomImeges*/
    let arrImgNew = randomImages();
    /*שולחת לפונקציה שמכניסה את ערכי המערך החדש ב html*/
    drawImages(arrImgNew);
    numClicks = 0;
    if (timerId) {
        clearInterval(timerId)
    };
    timer();
};

function timer() {
    let level = localStorage.getItem('currentLevel');
    if (level === "hard") {
        seconds = 150;
    }
    if (level === "medium") {
        seconds = 120;
    }
    if (level === "easy") {
        seconds = 90;
    }
    let titleOfTimer = document.getElementById('safeTimerDisplay');
    timerId = setInterval(function() {
        titleOfTimer.textContent = 'Time left: ' + seconds + ' seconds⏳';
        seconds--;
        if (seconds < 0) {
            clearInterval(timerId);
            let isLevel = localStorage.getItem('currentLevel');
            /* אם כל הזוגות נפתחו - בדיקה לפי רמת המשחק*/
            if (isLevel === "hard") {
                isTime = 150;
            }
            if (isLevel === "medium") {
                isTime = 120;
            }
            if (isLevel === "easy") {
                isTime = 90;
            }
            const score = {
                level: isLevel,
                time: isTime + ' seconds',
                success: '❌'
            }
            user.games.push(score);
            localStorage.setItem(user.mail, JSON.stringify(user));
            window.location = "../html/lose.html";
        }
        if (seconds < 10) {
            titleOfTimer.style.color = 'red';
        } else {
            titleOfTimer.style.color = 'black';
        }
    }, 1000);
}

function randomImages() {
    let arrImgNew = [];
    let arrImg = [];
    let arrPlace = [];
    let numPairs;
    let level = localStorage.getItem('currentLevel');
    if (level === "hard") {
        numPairs = 12;
    }
    if (level === "medium") {
        numPairs = 9;
    }
    if (level === "easy") {
        numPairs = 6;
    }
    for (let i = 0; i < numPairs; i++) { /*ממלאה את המערך של התמונות */
        arrImg[i] = `../images/pooh${i}.jpg`;
    }
    for (let i = 0; i < numPairs; i++) { /*מאפסת את המערך של המונים*/
        arrPlace[i] = 0;
    }
    for (let i = 0; i < 2 * numPairs; i++) {
        let numRan;
        do {
            numRan = Math.floor(Math.random() * numPairs);
        } while (arrPlace[numRan] === 2); /*בודקת במערך המונים אם המקום של המספר שהוגרל שווה ל2*/
        arrImgNew[i] = arrImg[numRan]; /*מכניסה את התמונה מהמערך במקום שהוגרל לתוך המערך החדש*/
        arrPlace[numRan]++; /*מעלה במערך המונים במיקום שהוגרל*/
    }
    return arrImgNew; /*מחזירה את המערך החדש*/
}

function drawImages(arrImgNew) {
    /*ריקון האלמנטים מהמשחק הקודם*/
    document.getElementById("cards").innerHTML = "";
    for (let i = 0; i < arrImgNew.length; i++) {
        /*יצירת אלמנטים ב html*/
        let newDiv2 = document.createElement("div");
        newDiv2.setAttribute("class", "cardBtn");
        /*בלחיצה על אחד הכרטיסים שנוצרו תזומן הפונקציה flip*/
        newDiv2.addEventListener('click', flip);
        let imgFront = document.createElement("img");
        imgFront.setAttribute("class", "front");
        imgFront.setAttribute("src", arrImgNew[i]);
        let imgBack = document.createElement("img");
        imgBack.setAttribute("class", "back");
        imgBack.setAttribute("src", "../images/backgroundcard.jpg");
        /*הכנסת האלמנטים לפי הסדר המתאים*/
        newDiv2.appendChild(imgFront);
        newDiv2.appendChild(imgBack);
        document.getElementById("cards").appendChild(newDiv2);
    }
}

function flip(event) {
    let element = event.currentTarget;
    if (numClicks < 2) { /*בודק אם מספר הקלפים שנפתחו קטן מ2*/
        element.style.transform = "rotateY(180deg)"; /*פותח את הקלף*/
        numClicks++; /*מעלה את מספר הקלפים שנפתחו*/
        if (numClicks == 1) { /*אם מספר הקלפים שנפתחו שווה ל1*/
            openCard = element; /*שומר את הקלף שנפתח*/
            openCard.removeEventListener("click", flip);
            return;
        }
        if (openCard.children[0].src === element.children[0].src) {
            numClicks = 0; /*מאפס את מספר הקלפים שנפתחו*/
            //מבטל את הפעולה הזו עבור הקלפים הזהים
            element.removeEventListener("click", flip);
            openCard.removeEventListener("click", flip);
            numOfpairOfCards++; /*מעלה את מספר הזוגות שהמשתמש מצא*/
            setTimeout(() => {
                element.style.visibility = "hidden";
                openCard.style.visibility = "hidden";
            }, 500)
            let level = localStorage.getItem('currentLevel');
            /* אם כל הזוגות נפתחו - בדיקה לפי רמת המשחק*/
            if (level === "hard" && numOfpairOfCards === 12) {
                clap();
            }
            if (level === "medium" && numOfpairOfCards === 9) {
                clap();
            }
            if (level === "easy" && numOfpairOfCards === 6) {
                clap();
            }
            return;
        }
        setTimeout(() => {
            openCard.style.transform = "rotateY(0deg)";
            element.style.transform = "rotateY(0deg)";
            numClicks = 0;
            openCard.addEventListener("click", flip);
        }, 800)
    }
}

function clap() {
    let isLevel = localStorage.getItem('currentLevel');
    /* אם כל הזוגות נפתחו - בדיקה לפי רמת המשחק*/
    if (isLevel === "hard") {
        isTime = 150 - seconds;
    }
    if (isLevel === "medium") {
        isTime = 120 - seconds;
    }
    if (isLevel === "easy") {
        isTime = 90 - seconds;
    }
    const score = {
        level: isLevel,
        time: isTime + ' seconds',
        success: '✔️'
    }
    user.games.push(score);
    localStorage.setItem(user.mail, JSON.stringify(user));
    /*יצירת audio חדש*/
    let newAudio = document.createElement("audio");
    newAudio.src = "../audio/claping.mp3.wav";
    /*יפעל אוטומטית*/
    newAudio.autoplay = "autoplay";
    newAudio.controls = "controls";
    setInterval(() => {
        window.location = "../html/winner.html";
    }, 2000);
}