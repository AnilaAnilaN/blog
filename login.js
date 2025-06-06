document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    // Form validation
    const loginForm = document.querySelector('.login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const isValid = validateLoginForm(email, password);
            
            if (isValid) {
                // Simulate successful login (replace with actual authentication)
                showAlert('success', 'Login successful! Redirecting...');
                setTimeout(() => {
                    window.location.href = 'index.html'; // Redirect to home page
                }, 1500);
            }
        });
    }

    // Form validation function
    function validateLoginForm(email, password) {
        // Reset previous errors
        document.getElementById('email').classList.remove('is-invalid');
        document.getElementById('password').classList.remove('is-invalid');
        
        let isValid = true;
        
        // Email validation
        if (!email) {
            document.getElementById('email').classList.add('is-invalid');
            showAlert('danger', 'Please enter your email address');
            isValid = false;
        } else if (!validateEmail(email)) {
            document.getElementById('email').classList.add('is-invalid');
            showAlert('danger', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Password validation
        if (!password) {
            document.getElementById('password').classList.add('is-invalid');
            showAlert('danger', 'Please enter your password');
            isValid = false;
        } else if (password.length < 6) {
            document.getElementById('password').classList.add('is-invalid');
            showAlert('danger', 'Password must be at least 6 characters');
            isValid = false;
        }
        
        return isValid;
    }

    // Email validation helper
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Show alert message
    function showAlert(type, message) {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Insert after the login header
        const loginHeader = document.querySelector('.login-header');
        if (loginHeader) {
            loginHeader.insertAdjacentElement('afterend', alertDiv);
        }
        
        // Auto dismiss after 5 seconds
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alertDiv);
            bsAlert.close();
        }, 5000);
    }
});
