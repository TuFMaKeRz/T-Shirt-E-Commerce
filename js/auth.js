document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('.account-page')) return;
    
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const toggleForms = document.querySelectorAll('.toggle-form');
    
    if (toggleForms) {
        toggleForms.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                loginForm.classList.toggle('hidden');
                registerForm.classList.toggle('hidden');
            });
        });
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Implement login logic
            alert('Login functionality would go here');
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Implement registration logic
            alert('Registration functionality would go here');
        });
    }
});