// ===== Default config (used if user hasn't set up yet) =====
const DEFAULT_CONFIG = {
    username: "mylove",
    password: "forever",
    usernameHint: "💡 Hint: What do I always call you?",
    passwordHint: "💡 Hint: What did we promise each other?",
    youtubeUrl: "https://www.youtube.com/embed/rtOvBOTyX00",
    loveMessage: "Every day with you is a blessing. You are my sunshine, my happiness, and my everything. I cannot imagine my life without you. You make every moment special and every day worth living.\n\nFrom the moment I met you, I knew you were the one. Your laugh, your smile, the way you look at me — everything about you is perfect.\n\nI love you more than words could ever express. 💕",
    reasons: [
        "Your smile lights up my entire world",
        "You understand me like no one else",
        "Every moment with you feels magical",
        "You make me want to be a better person every day"
    ]
};

// ===== Load config from localStorage or use defaults =====
function getConfig() {
    const saved = localStorage.getItem('lovesite-config');
    if (saved) {
        return JSON.parse(saved);
    }
    return DEFAULT_CONFIG;
}

// ===== Initialize page =====
function init() {
    const config = getConfig();

    // Set hints on login page
    document.getElementById('username-hint').textContent = config.usernameHint;
    document.getElementById('password-hint').textContent = config.passwordHint;

    // Set reasons
    if (config.reasons) {
        for (let i = 0; i < 4; i++) {
            const el = document.getElementById(`reason${i + 1}-text`);
            if (el && config.reasons[i]) {
                el.textContent = config.reasons[i];
            }
        }
    }

    // Set love message
    if (config.loveMessage) {
        document.getElementById('letter-body').innerHTML = `<p>${config.loveMessage.replace(/\n/g, '<br>')}</p>`;
    }
}

// ===== Show Setup Page =====
function showSetup() {
    document.getElementById('login-page').classList.remove('active');
    document.getElementById('setup-page').classList.add('active');
}

// ===== Save Setup =====
function saveSetup() {
    const username = document.getElementById('setup-username').value.trim();
    const password = document.getElementById('setup-password').value.trim();
    const usernameHint = document.getElementById('setup-username-hint').value.trim();
    const passwordHint = document.getElementById('setup-password-hint').value.trim();
    const youtubeUrl = document.getElementById('setup-youtube').value.trim();
    const message = document.getElementById('setup-message').value.trim();
    const reason1 = document.getElementById('setup-reason1').value.trim();
    const reason2 = document.getElementById('setup-reason2').value.trim();
    const reason3 = document.getElementById('setup-reason3').value.trim();
    const reason4 = document.getElementById('setup-reason4').value.trim();

    if (!username || !password) {
        document.getElementById('setup-error').textContent = "Please fill in at least the name and secret word! 💕";
        return;
    }

    // Convert YouTube URL to embed format
    let embedUrl = youtubeUrl;
    if (youtubeUrl.includes('watch?v=')) {
        const videoId = youtubeUrl.split('watch?v=')[1].split('&')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (youtubeUrl.includes('youtu.be/')) {
        const videoId = youtubeUrl.split('youtu.be/')[1].split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    const config = {
        username: username.toLowerCase(),
        password: password,
        usernameHint: usernameHint ? `💡 Hint: ${usernameHint}` : "💡 No hint provided",
        passwordHint: passwordHint ? `💡 Hint: ${passwordHint}` : "💡 No hint provided",
        youtubeUrl: embedUrl || DEFAULT_CONFIG.youtubeUrl,
        loveMessage: message || DEFAULT_CONFIG.loveMessage,
        reasons: [
            reason1 || DEFAULT_CONFIG.reasons[0],
            reason2 || DEFAULT_CONFIG.reasons[1],
            reason3 || DEFAULT_CONFIG.reasons[2],
            reason4 || DEFAULT_CONFIG.reasons[3]
        ]
    };

    localStorage.setItem('lovesite-config', JSON.stringify(config));

    // Reinitialize and go to login
    init();
    document.getElementById('setup-page').classList.remove('active');
    document.getElementById('login-page').classList.add('active');
}

// ===== Login =====
function login() {
    const config = getConfig();
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value.trim();

    if (username === config.username.toLowerCase() && password === config.password) {
        showPage('menu-page');
    } else {
        document.getElementById('login-error').textContent = "Wrong credentials! Try again my love 💔";
        // Shake animation
        const container = document.querySelector('.login-container');
        container.style.animation = 'none';
        setTimeout(() => {
            container.style.animation = 'shake 0.5s ease';
        }, 10);
    }
}

// ===== Page Navigation =====
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(pageId);
    targetPage.classList.add('active');

    // If navigating to song page, load the YouTube video
    if (pageId === 'song-page') {
        const config = getConfig();
        document.getElementById('youtube-player').src = config.youtubeUrl;
    } else {
        // Stop video when leaving song page
        document.getElementById('youtube-player').src = '';
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

// ===== Love Question Responses =====
function answerYes() {
    document.getElementById('yes-popup').classList.add('active');
}

function answerNo() {
    document.getElementById('try-again-popup').classList.add('active');
}

function tryAgain() {
    document.getElementById('try-again-popup').classList.remove('active');
    // The question is still there, so user sees it again
}

function closePopup() {
    document.getElementById('yes-popup').classList.remove('active');
}

// ===== Allow Enter key for login =====
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const loginPage = document.getElementById('login-page');
        if (loginPage.classList.contains('active')) {
            login();
        }
    }
});

// ===== Add shake animation =====
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-10px); }
        40% { transform: translateX(10px); }
        60% { transform: translateX(-10px); }
        80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ===== Run init on load =====
init();
