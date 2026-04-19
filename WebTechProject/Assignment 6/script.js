document.getElementById('registrationForm').addEventListener('submit', function(e) {
    // Prevent the form from refreshing the page
    e.preventDefault();

    // Select elements
    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();
    const successMsg = document.getElementById('successMessage');

    // Reset error messages
    const errors = document.querySelectorAll('.error-text');
    errors.forEach(err => err.innerText = "");
    successMsg.classList.add('hidden');

    let isValid = true;

    // 1. Name Validation
    if (name === "") {
        showError("nameError", "Name is required");
        isValid = false;
    }

    // 2. Email Validation (Regex)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showError("emailError", "Please enter a valid email address");
        isValid = false;
    }

    // 3. Phone Validation (Numbers only check)
    const phonePattern = /^[0-9]+$/;
    if (phone === "") {
        showError("phoneError", "Phone number is required");
        isValid = false;
    } else if (!phonePattern.test(phone)) {
        showError("phoneError", "Phone must contain only numbers");
        isValid = false;
    }

    // 4. Password Validation
    if (password.length < 6) {
        showError("passwordError", "Password must be at least 6 characters");
        isValid = false;
    }

    // Final check
    if (isValid) {
        successMsg.classList.remove('hidden');
        // Optional: Reset form fields after success
        document.getElementById('registrationForm').reset();
    }
});

/**
 * Helper function to display error messages
 */
function showError(elementId, message) {
    document.getElementById(elementId).innerText = message;
}