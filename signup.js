document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility for both fields
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const inputId = this.closest('.input-group').querySelector('input').id;
            const passwordInput = document.getElementById(inputId);
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    });

    // Password strength indicator
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });
    }

    // Form validation
    const signupForm = document.querySelector('.signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();
            const termsChecked = document.getElementById('terms').checked;
            
            const isValid = validateSignupForm(
                firstName, 
                lastName, 
                email, 
                password, 
                confirmPassword, 
                termsChecked
            );
            
            if (isValid) {
                // Simulate successful signup (replace with actual registration)
                showAlert('success', 'Account created successfully! Redirecting...');
                setTimeout(() => {
                    window.location.href = 'index.html'; // Redirect to home page
                }, 1500);
            }
        });
    }

    // Form validation function
    function validateSignupForm(firstName, lastName, email, password, confirmPassword, termsChecked) {
        // Reset previous errors
        document.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });
        
        let isValid = true;
        
        // First name validation
        if (!firstName) {
            document.getElementById('firstName').classList.add('is-invalid');
            showAlert('danger', 'Please enter your first name');
            isValid = false;
        }
        
        // Last name validation
        if (!lastName) {
            document.getElementById('lastName').classList.add('is-invalid');
            showAlert('danger', 'Please enter your last name');
            isValid = false;
        }
        
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
            showAlert('danger', 'Please enter a password');
            isValid = false;
        } else if (password.length < 8) {
            document.getElementById('password').classList.add('is-invalid');
            showAlert('danger', 'Password must be at least 8 characters');
            isValid = false;
        }
        
        // Confirm password validation
        if (password !== confirmPassword) {
            document.getElementById('confirmPassword').classList.add('is-invalid');
            showAlert('danger', 'Passwords do not match');
            isValid = false;
        }
        
        // Terms validation
        if (!termsChecked) {
            document.getElementById('terms').classList.add('is-invalid');
            showAlert('danger', 'You must agree to the terms and conditions');
            isValid = false;
        }
        
        return isValid;
    }

    // Update password strength indicator
    function updatePasswordStrength(password) {
        const strengthBar = document.createElement('div');
        strengthBar.className = 'password-strength';
        strengthBar.innerHTML = '<div class="password-strength-bar"></div>';
        
        let strength = 0;
        let barColor = '';
        let barWidth = '0%';
        
        if (password.length > 0) strength += 20;
        if (password.length >= 8) strength += 20;
        if (/[A-Z]/.test(password)) strength += 20;
        if (/\d/.test(password)) strength += 20;
        if (/[^A-Za-z0-9]/.test(password)) strength += 20;
        
        if (strength <= 40) {
            barColor = 'bg-danger';
        } else if (strength <= 70) {
            barColor = 'bg-warning';
        } else {
            barColor = 'bg-success';
        }
        
        barWidth = `${strength}%`;
        
        // Remove existing strength indicator if any
        const existingStrength = document.querySelector('.password-strength');
        if (existingStrength) {
            existingStrength.remove();
        }
        
        // Insert strength indicator
        const passwordGroup = document.getElementById('password').closest('.mb-3');
        if (passwordGroup) {
            passwordGroup.appendChild(strengthBar);
            const bar = document.querySelector('.password-strength-bar');
            bar.style.width = barWidth;
            bar.classList.add(barColor);
        }
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
        
        // Insert after the signup header
        const signupHeader = document.querySelector('.signup-header');
        if (signupHeader) {
            signupHeader.insertAdjacentElement('afterend', alertDiv);
        }
        
        // Auto dismiss after 5 seconds
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alertDiv);
            bsAlert.close();
        }, 5000);
    }
});
