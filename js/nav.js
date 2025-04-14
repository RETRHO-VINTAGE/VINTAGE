fetch('nav.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_navbar");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
})

function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.getElementById('loginForm').addEventListener('submit', validateLogin);
}

// Function to close the login modal
function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Close the modal if clicked outside of it
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}


let users = {};
function validateLogin(event) {
    event.preventDefault();

    const email = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const errorMsg = document.getElementById("loginError");

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Login successful
            errorMsg.style.color = "green";
            errorMsg.textContent = "Login successful! Redirecting...";
            setTimeout(() => {
                closeLoginModal();
                window.location.href = "dashboard.html";
            }, 1500);
        })
        .catch((error) => {
            errorMsg.style.color = "red";
            errorMsg.textContent = "Incorrect email or password.";
            console.error("Login failed:", error.message);
        });
}
