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
const sheetID = "1D_G_IbZKeNXvvbb_ZL6IgIrwoCy8iUpUZEvPYdZ5EeU";
const apiKey = "AIzaSyASQPliHBF4eIKF1DjCiGYfGzw6lp10kQc";
const range = "Sheet1!A2:B";
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;



function fetchLoginData() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.values) {
                users = Object.fromEntries(data.values);
            }
        })
        .catch(error => console.error("Error fetching login data:", error));
}

function validateLogin(event) {
    event.preventDefault();
    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    let errorMsg = document.getElementById("loginError");

    if (users[username] === password) {
        errorMsg.style.color = "green";
        errorMsg.textContent = "Login successful! Redirecting...";
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1500);
    } else {
        errorMsg.style.color = "red";
        errorMsg.textContent = "Incorrect username or password.";
    }
}