document.addEventListener("DOMContentLoaded", () => {
    let current = localStorage.getItem('currentUser');
    if (current) {
        let user = JSON.parse(localStorage.getItem(current));
        document.getElementById("name").textContent = "Hello " + user.userName + '👋. Just choose and start playing';
    }
});