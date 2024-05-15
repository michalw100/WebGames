let current;
let user;
document.addEventListener("DOMContentLoaded", () => {
    current = localStorage.getItem('currentUser');
    if (current) {
        user = JSON.parse(localStorage.getItem(current));
        document.getElementById("name").textContent = "Hi " + user.userName + "👋. It's your games:";
    }
    games();
});

function games() {
    let score = user.games;
    if (!score.length) {
        document.getElementById("name").textContent = "Hi " + user.userName + "👋. You have no games. Go to play!";
        return;
    }
    let container = document.getElementById('container');
    container.insertAdjacentHTML('afterbegin', `<table id="table"></table>`);
    let table = document.getElementById('table');
    table.insertAdjacentHTML('afterbegin', `<tr id="headerRow"></tr>`);
    let headerRow = document.getElementById('headerRow');
    headerRow.insertAdjacentHTML('beforeend', `<th>Level🎚️</th>`);
    headerRow.insertAdjacentHTML('beforeend', `<th>Time⏰</th>`);
    headerRow.insertAdjacentHTML('beforeend', `<th>Success❔</th>`);
    for (let i = 0; i < score.length; i++) {
        table.insertAdjacentHTML('beforeend',
            `<tr>
        <td data-label = 'Level🎚️'>` + score[i].level + `</td>
        <td data-label = 'Time⏰'>` + score[i].time + `</td>
        <td data-label = 'Success❔'>` + score[i].success + `</td>
        </tr>`);
    }
}