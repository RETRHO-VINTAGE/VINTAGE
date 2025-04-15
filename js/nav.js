// Fetch and inject nav.html
fetch('nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('replace_with_navbar').outerHTML = data;
        initializeNavbar();
    })
    .catch(error => console.error('Error loading navbar:', error));

function initializeNavbar() {
    // Define modal functions first
    window.openLoginModal = function() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.style.display = 'block';
        }
    };

    window.closeLoginModal = function() {
        const modal = document.getElementById('loginModal');
        const form = document.getElementById('loginForm');
        const errorDiv = document.getElementById('loginError');
        if (modal) modal.style.display = 'none';
        if (form) form.reset();
        if (errorDiv) errorDiv.textContent = '';
    };

    // Update navbar
    updateNavbar();

    // Set up form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
            const errorDiv = document.getElementById('loginError');

            try {
                const isAuthorized = await verifyEmail(email, password);
                if (isAuthorized) {
                    errorDiv.style.color = '#22884c'; // gatorGreen
                    errorDiv.textContent = 'Login successful!';
                    localStorage.setItem('userEmail', email);
                    setTimeout(window.closeLoginModal, 1000);
                    updateNavbar();
                } else {
                    errorDiv.style.color = '#D32737'; // bottlebrushRed
                    errorDiv.textContent = 'Invalid username or password.';
                }
            } catch (error) {
                errorDiv.style.color = '#D32737';
                errorDiv.textContent = 'Error verifying credentials. Please try again.';
                console.error(error);
            }
        });
    }
}

function updateNavbar() {
    const loginButton = document.querySelector('.loginButton');
    const restrictedLinks = document.querySelectorAll('.navbarPage.restricted');
    const userEmail = localStorage.getItem('userEmail');

    if (loginButton) {
        if (userEmail) {
            loginButton.textContent = `Logout (${userEmail})`;
            loginButton.onclick = () => {
                localStorage.removeItem('userEmail');
                // Check if on a restricted page
                const restrictedPages = ['observingSchedule.html', 'observingResources.html', 'resources.html'];
                const currentPage = window.location.pathname.split('/').pop();
                if (restrictedPages.includes(currentPage)) {
                    window.location.href = 'index.html';
                } else {
                    window.location.reload();
                }
            };
            restrictedLinks.forEach(link => link.style.display = 'inline');
        } else {
            loginButton.textContent = 'Login';
            loginButton.onclick = window.openLoginModal;
            restrictedLinks.forEach(link => link.style.display = 'none');
        }
    }
}