// Toggle password visibility
function togglePassword() {
    const passwordField = document.getElementById("password");
    const toggleButton = document.getElementById("toggle-password");

    // Check the input type and toggle visibility
    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleButton.innerHTML = "🙈"; // Change to eye closed emoji
    } else {
        passwordField.type = "password";
        toggleButton.innerHTML = "👁️"; // Change back to eye open emoji
    }
}

// Analyze password strength
function analyzePassword() {
    const password = document.getElementById("password").value;
    const strengthText = document.getElementById("strength-text");
    const recommendationsList = document.getElementById("recommendations");

    let strength = "Weak";  // Default strength
    let recommendations = [];

    // Clear previous results
    recommendationsList.innerHTML = "";

    // Check password length
    if (password.length >= 12) {
        strength = "Strong";
    } else if (password.length >= 8) {
        strength = "Moderate";
    } else {
        recommendations.push("Password should be at least 8 characters long.");
    }

    // Check for upper/lowercase letters
    if (!/[a-z]/.test(password)) {
        recommendations.push("Include at least one lowercase letter.");
    }
    if (!/[A-Z]/.test(password)) {
        recommendations.push("Include at least one uppercase letter.");
    }

    // Check for numbers
    if (!/\d/.test(password)) {
        recommendations.push("Include at least one number.");
    }

    // Check for special characters
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        recommendations.push("Include at least one special character.");
    }

    // Check for common passwords (basic check)
    const commonPasswords = ["password", "123456", "qwerty", "letmein"];
    if (commonPasswords.includes(password.toLowerCase())) {
        strength = "Weak";
        recommendations.push("Avoid using common passwords.");
    }

    // Check for predictability (simple pattern detection)
    if (/1234|abcd|qwerty|password/.test(password)) {
        strength = "Weak";
        recommendations.push("Avoid using easily guessable patterns.");
    }

    // Display the strength of the password
    strengthText.innerHTML = `Password Strength: ${strength}`;
    if (strength === "Weak") {
        strengthText.className = "weak";
    } else if (strength === "Moderate") {
        strengthText.className = "moderate";
    } else {
        strengthText.className = "strong";
    }

    // Display the recommendations
    recommendations.forEach((recommendation) => {
        const li = document.createElement("li");
        li.textContent = recommendation;
        recommendationsList.appendChild(li);
    });
}
