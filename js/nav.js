console.log('nav.js loaded');

let isLoggedIn = false;

function updateNavbar() {
    console.log('Updating navbar, isLoggedIn:', isLoggedIn);
    fetch('nav.html')
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error ${res.status}`);
            return res.text();
        })
        .then(text => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const navbar = doc.querySelector('.navbar');
            if (!navbar) {
                console.error('Navbar not found in nav.html');
                return;
            }

            // Remove auth-required links if not logged in
            if (!isLoggedIn) {
                navbar.querySelectorAll('.auth-required').forEach(link => link.remove());
            }

            // Update login/logout button
            const loginButton = navbar.querySelector('#loginButton');
            if (loginButton) {
                loginButton.textContent = isLoggedIn ? 'Log Out' : 'Login';
                loginButton.onclick = isLoggedIn ? () => {
                    console.log('Logout clicked');
                    // Direct signOut call (Firebase loaded in login.js)
                    firebase.auth().signOut()
                        .then(() => {
                            console.log('User logged out');
                            isLoggedIn = false;
                            updateNavbar();
                        })
                        .catch(error => console.error('Logout error:', error.message));
                } : openLoginModal;
            }

            // Insert navbar
            const oldelem = document.querySelector("script#replace_with_navbar");
            if (!oldelem) {
                console.error('Placeholder script#replace_with_navbar not found');
                return;
            }
            const newelem = document.createElement("div");
            newelem.appendChild(navbar);
            oldelem.parentNode.replaceChild(newelem, oldelem);
            console.log('nav.html inserted');

            // Update navbar class for spacing
            navbar.classList.toggle('logged-out', !isLoggedIn);

            document.dispatchEvent(new Event('navbarLoaded'));
        })
        .catch(err => console.error('Error loading nav.html:', err));
}

function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
        console.log('Login modal opened');
    } else {
        console.error('Login modal not found');
    }
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
        console.log('Login modal closed');
    } else {
        console.error('Login modal not found');
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target == modal) {
        modal.style.display = 'none';
        console.log('Modal closed by clicking outside');
    }
};

// Listen for login state changes
document.addEventListener('loginStateChanged', () => {
    isLoggedIn = window.isLoggedIn || false;
    console.log('Login state changed, isLoggedIn:', isLoggedIn);
    updateNavbar();
});

// Initial navbar render
updateNavbar();