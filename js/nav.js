console.log('nav.js loaded');

const oldelem = document.querySelector("script#replace_with_navbar");
if (!oldelem) {
    console.error('Placeholder script#replace_with_navbar not found');
} else {
    console.log('Placeholder found');
}

fetch('nav.html')
    .then(res => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.text();
    })
    .then(text => {
        let newelem = document.createElement("div");
        newelem.innerHTML = text;
        oldelem.parentNode.replaceChild(newelem, oldelem);
        console.log('nav.html inserted');
        document.dispatchEvent(new Event('navbarLoaded'));
    })
    .catch(err => console.error('Error loading nav.html:', err));

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