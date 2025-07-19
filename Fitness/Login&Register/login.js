const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

// Firebase Authentication logic
// Login form
const loginForm = document.querySelector('.form-box.login form');
const loginInputs = loginForm.querySelectorAll('input');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = loginInputs[0].value; // Username (not used for auth)
    const password = loginInputs[1].value;
    // For demo, treat username as email (or update HTML to use email input)
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Login successful!');
            window.location.href = '../../Fitness.html'; // Redirect to dashboard
        })
        .catch((error) => {
            alert('Login failed: ' + error.message);
        });
});

// Password reset
const forgotLink = document.querySelector('.forgot-link a');
forgotLink.addEventListener('click', function (e) {
    e.preventDefault();
    const email = loginInputs[0].value;
    if (!email) {
        alert('Please enter your email in the email field first.');
        return;
    }
    firebase.auth().sendPasswordResetEmail(email)
        .then(function () {
            alert('Password reset email sent! Check your inbox.');
        })
        .catch(function (error) {
            alert('Error: ' + error.message);
        });
});

// Register form
const registerForm = document.querySelector('.form-box.register form');
const registerInputs = registerForm.querySelectorAll('input');

registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = registerInputs[1].value; // Email
    const password = registerInputs[2].value; // Password
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Registration successful! You can now log in.');
            container.classList.remove('active'); // Switch to login view
        })
        .catch((error) => {
            alert('Registration failed: ' + error.message);
        });
});







