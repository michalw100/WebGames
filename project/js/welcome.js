document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("hidden");
        createAccountForm.classList.remove("hidden");
        document.getElementById("nameSign").value = "";
        document.getElementById("emailSign").value = "";
        document.getElementById("passwordSign").value = "";
        document.getElementById("passwordSign2").value = "";
        document.getElementById("messege").checked = false;
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("hidden");
        createAccountForm.classList.add("hidden");
        document.getElementById("emailLog").value = "";
        document.getElementById("passwordLog").value = "";
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
    });

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
    });
});

let okLog = document.querySelector("#okeyLog");
let okSign = document.querySelector("#okeySign");

okLog.addEventListener('click', function () {
    LogIn();
}); /*continue ארוע בלחיצה על כפתור*/

okSign.addEventListener('click', function () {
    saveUser();
}); /*continue ארוע בלחיצה על כפתור*/

function LogIn() {
    /*הכנס פרטי משתמש למשתנים*/
    let mail = document.getElementById("emailLog").value;
    let password = document.getElementById("passwordLog").value;
    /*אם לא מולאו כל הפרטים*/
    if (mail == "" || password == "") {
        alert("Not all details have been filled in");
        return;
    }
    if (!ValidateEmail(mail))
        return;
    /*בודק אם קיים משתמש עם מייל וסיסמא שהתקבלו*/
    let userData = JSON.parse(localStorage.getItem(mail));
    if (userData) {
        if (userData.password === password) {
            localStorage.setItem('currentUser', mail);
            window.location = "../html/main.html";
            return;
        }
        alert("email or password is incorrect");
        return;
    }
    alert("You are not registered, you must register");
    return;
}

function saveUser(e) {
    /*הכנס פרטי משתמש למשתנים*/
    let name = document.getElementById("nameSign").value;
    let mail = document.getElementById("emailSign").value;
    let password = document.getElementById("passwordSign").value;
    let password2 = document.getElementById("passwordSign2").value;
    /*אם לא מולאו כל הפרטים*/
    if (name == "" || mail == "" || password == "" || password2 == "") {
        alert("Not all details have been filled in");
        return;
    }
    //בדיקה אם הססמאות שוות
    if (password !== password2) {
        alert("The passwords are not the same");
        return;
    }
    if (!ValidateEmail(mail))
        return;
    /* בדוק סיסמה בין 8 ל-15 תווים המכילים לפחות אות קטנה אחת, אות גדולה אחת, ספרה מספרית אחת ותו מיוחד אחד.*/
    if (!CheckPassword(password))
        return;
    /*בודק אם לא קיים משתמש העונה לפרטים שנקלטו*/
    let userData = JSON.parse(localStorage.getItem(mail));
    if (userData) {
        alert("User exists");
        return;
    }
    const user = {
        userName: name,
        mail: mail,
        password: password,
        games: []
    }
    // localStorage הוספת המשתמש ל 
    localStorage.setItem(user.mail, JSON.stringify(user));
    localStorage.setItem('currentUser', user.mail);
    window.location = "../html/main.html";
}

function ValidateEmail(mailAdress) {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mailAdress.match(mailformat)) {
        return true;
    } else {
        alert("You have entered an invalid email address!");
        return false;
    }
}

function CheckPassword(password) {
    var passw = /^[A-Za-z]\w{7,14}$/;
    if (password.match(passw)) {
        return true;
    } else {
        alert('Wrong password...! The password must contain letters and numbers');
        return false;
    }
}