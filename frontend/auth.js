// auth.js
document.addEventListener('DOMContentLoaded', () => {
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (email && password) {
                // In real app, send to backend
                localStorage.setItem('loggedIn', 'true');
                window.location.href = 'app.html'; // Your main app page
            }
        });
    }

    // Handle registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // In real app, send to backend
            localStorage.setItem('loggedIn', 'true');
            window.location.href = 'app.html';
        });
    }

    // Check authentication status
    const protectedPages = ['app.html']; // Add your protected pages
    if (protectedPages.includes(window.location.pathname.split('/').pop())) {
        const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
        if (!isLoggedIn) {
            window.location.href = 'login.html';
        }
    }
});