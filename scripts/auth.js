// Get references to the form and error message
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Sign in with email and password
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Login successful
            const user = userCredential.user;
            console.log('Logged in user:', user);
            window.location.href = '/dashboard.html'; // Redirect to dashboard
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessageText = error.message;
            errorMessage.textContent = errorMessageText; // Display error message
            console.error('Login error:', errorCode, errorMessageText);
        });
});

// Optional: Check if user is already logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        console.log('User is logged in:', user);
        window.location.href = '/dashboard.html'; // Redirect to dashboard
    } else {
        // User is signed out
        console.log('No user is logged in.');
    }
});