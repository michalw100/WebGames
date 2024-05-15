document.addEventListener("DOMContentLoaded", () => {
    let current = localStorage.getItem('currentUser');
    if (current) {
        let user = JSON.parse(localStorage.getItem(current));
        document.getElementById("hello").textContent = "Hi " + user.userName + '! its time to choose a level';
    }
    let hard = document.getElementById('hard');
    let medium = document.getElementById('medium');
    let easy = document.getElementById('easy');
    hard.addEventListener('click', hardLevel);
    medium.addEventListener('click', mediumLevel);
    easy.addEventListener('click', easyLevel);
});

function hardLevel() {
    localStorage.setItem('currentLevel', "hard");
    window.location = "../html/memoryGame.html";
}

function mediumLevel() {
    localStorage.setItem('currentLevel', "medium");
    window.location = "../html/memoryGame.html";
}

function easyLevel() {
    localStorage.setItem('currentLevel', "easy");
    window.location = "../html/memoryGame.html";
}