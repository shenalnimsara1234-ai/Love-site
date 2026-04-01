// ============================================
// 🔒 FIXED CREDENTIALS — Change these values!
// ============================================
const FIXED_USERNAME = "Kavindu";      // Change to your lover's name
const FIXED_PASSWORD = "ILU";          // Change to your secret word

// ============================================
// 🔑 Login Function
// ============================================
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('login-error');

    if (username === "" || password === "") {
        errorMsg.textContent = "Please fill in both fields 💔";
        return;
    }

    if (username.toLowerCase() === FIXED_USERNAME.toLowerCase() && password === FIXED_PASSWORD) {
        errorMsg.textContent = "";
        showPage('menu-page');
    } else {
        errorMsg.textContent = "Wrong name or secret word! Try again 💔";
    }
}

// ============================================
// 📄 Page Navigation
// ============================================
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

// ============================================
// 💕 "Do You Love Me?" Logic
// ============================================
let noClickCount = 0;

function answerYes() {
    document.getElementById('yes-popup').classList.add('active');
}

function answerNo() {
    noClickCount++;
    const noBtn = document.getElementById('no-btn');

    if (noClickCount >= 3) {
        document.getElementById('try-again-popup').classList.add('active');
        noClickCount = 0;
        return;
    }

    // Make the "No" button shrink each time
    const scale = Math.max(0.3, 1 - noClickCount * 0.25);
    noBtn.style.transform = `scale(${scale})`;

    // Move it randomly
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 100 - 50;
    noBtn.style.position = 'relative';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

function closePopup() {
    document.getElementById('yes-popup').classList.remove('active');
}

function tryAgain() {
    document.getElementById('try-again-popup').classList.remove('active');
    const noBtn = document.getElementById('no-btn');
    noBtn.style.transform = 'scale(1)';
    noBtn.style.left = '0';
    noBtn.style.top = '0';
}

// Allow Enter key to submit login
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('password').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') login();
    });
    document.getElementById('username').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') login();
    });
});
