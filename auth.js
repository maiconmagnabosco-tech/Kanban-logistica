// Authentication Configuration
const AUTH_CONFIG = {
    domain: '@transmagnabosco.com.br',
    password: '123456',
    sessionKey: 'kanban_auth',
    userKey: 'kanban_user'
};

// Check if user is already authenticated
function checkAuth() {
    const isAuthenticated = localStorage.getItem(AUTH_CONFIG.sessionKey) === 'true';
    const userEmail = localStorage.getItem(AUTH_CONFIG.userKey);

    if (isAuthenticated && userEmail) {
        // Redirect to main app
        window.location.href = 'index.html';
    }
}

// Validate email domain
function validateEmail(email) {
    if (!email || typeof email !== 'string') {
        return { valid: false, message: 'E-mail inválido' };
    }

    const emailLower = email.toLowerCase().trim();

    // Check if email ends with the company domain
    if (!emailLower.endsWith(AUTH_CONFIG.domain)) {
        return {
            valid: false,
            message: `E-mail deve ser do domínio ${AUTH_CONFIG.domain}`
        };
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailLower)) {
        return { valid: false, message: 'Formato de e-mail inválido' };
    }

    return { valid: true, message: '' };
}

// Validate password
function validatePassword(password) {
    if (!password) {
        return { valid: false, message: 'Senha é obrigatória' };
    }

    if (password !== AUTH_CONFIG.password) {
        return { valid: false, message: 'Senha incorreta' };
    }

    return { valid: true, message: '' };
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = message ? 'block' : 'none';
    }
}

// Clear all errors
function clearErrors() {
    showError('email-error', '');
    showError('password-error', '');
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    clearErrors();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = event.target.querySelector('button[type="submit"]');

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
        showError('email-error', emailValidation.message);
        emailInput.focus();
        return;
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
        showError('password-error', passwordValidation.message);
        passwordInput.focus();
        return;
    }

    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;

    // Simulate authentication delay (for better UX)
    setTimeout(() => {
        // Save authentication state
        localStorage.setItem(AUTH_CONFIG.sessionKey, 'true');
        localStorage.setItem(AUTH_CONFIG.userKey, email.toLowerCase());

        // Redirect to main app
        window.location.href = 'index.html';
    }, 800);
}

// Logout function (to be called from main app)
function logout() {
    localStorage.removeItem(AUTH_CONFIG.sessionKey);
    localStorage.removeItem(AUTH_CONFIG.userKey);
    window.location.href = 'login.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if already authenticated
    checkAuth();

    // Setup form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Focus email input
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.focus();
    }

    // Clear errors on input
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            const errorId = input.id + '-error';
            showError(errorId, '');
        });
    });
});

// Export for use in other files
if (typeof window !== 'undefined') {
    window.logout = logout;
    window.checkAuth = checkAuth;
}
