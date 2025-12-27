// Toggle password visibility
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const eyeIcon = document.getElementById('eyeIcon');

togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    eyeIcon.textContent = type === 'password' ? '👁️' : '🙈';
    
    this.style.transform = 'translateY(-50%) scale(1.2)';
    setTimeout(() => {
        this.style.transform = 'translateY(-50%) scale(1)';
    }, 200);
});

// Add focus effects to inputs
const inputs = document.querySelectorAll('.input-wrapper input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// Handle form submission
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');
const submitBtn = document.querySelector('.login-submit-btn');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Show loading state
    submitBtn.classList.add('loading');
    btnText.parentElement.style.display = 'none';
    btnLoader.style.display = 'flex';
    errorMessage.style.display = 'none';

    // Simulate API call
    setTimeout(() => {
        // Authentication
        if (username === 'Myadmin' && password === 'admin123') {
            // Successful login
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            
            // Store admin session data in memory (not localStorage)
            sessionStorage.setItem('adminLoggedIn', 'true');
            sessionStorage.setItem('adminUsername', username);
            
            if (rememberMe) {
                sessionStorage.setItem('rememberAdmin', 'true');
            }

            // Success animation
            btnLoader.innerHTML = '<span style="font-size: 1.5rem;">✓</span>';
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 800);
        } else {
            // Failed login
            submitBtn.classList.remove('loading');
            btnText.parentElement.style.display = 'flex';
            btnLoader.style.display = 'none';
            
            errorMessage.innerHTML = '<span class="error-icon">❌</span> Invalid username or password';
            errorMessage.style.display = 'flex';
            
            // Shake animation
            loginForm.classList.add('shake');
            setTimeout(() => {
                loginForm.classList.remove('shake');
            }, 500);
        }
    }, 1500);
});

// Auto-fill if remembered (using sessionStorage)
if (sessionStorage.getItem('rememberAdmin') === 'true') {
    document.getElementById('rememberMe').checked = true;
    const savedUsername = sessionStorage.getItem('adminUsername');
    if (savedUsername) {
        document.getElementById('username').value = savedUsername;
    }
}