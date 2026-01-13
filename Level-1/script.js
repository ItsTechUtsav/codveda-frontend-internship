const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");
const successMsg = document.querySelector(".success-msg");
const strengthBar = document.querySelector(".strength-bar");

function showError(input, message) {
  const formGroup = input.parentElement.closest(".form-group");
  const error = formGroup.querySelector(".error-msg");
  error.innerText = message;
}

function clearError(input) {
  const formGroup = input.parentElement.closest(".form-group");
  const error = formGroup.querySelector(".error-msg");
  error.innerText = "";
}

function validateName() {
  if (nameInput.value.trim().length < 2) {
    showError(nameInput, "Please enter a valid name");
    return false;
  }
  clearError(nameInput);
  return true;
}

function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    showError(emailInput, "Enter a valid email address");
    return false;
  }
  clearError(emailInput);
  return true;
}

function validatePhone() {
  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phoneInput.value.trim())) {
    showError(phoneInput, "Phone number must be 10 digits");
    return false;
  }
  clearError(phoneInput);
  return true;
}

function validatePassword() {
  const password = passwordInput.value;
  if (password.length < 8) {
    showError(passwordInput, "Password must be at least 8 characters");
    return false;
  }
  clearError(passwordInput);
  return true;
}

/* Password strength */
passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;
  let strength = 0;

  if (value.length >= 8) strength++;
  if (/[A-Z]/.test(value)) strength++;
  if (/[0-9]/.test(value)) strength++;
  if (/[^A-Za-z0-9]/.test(value)) strength++;

  if (strength === 0) {
    strengthBar.style.width = "0%";
  } else if (strength === 1) {
    strengthBar.style.width = "25%";
    strengthBar.style.background = "#EF4444";
  } else if (strength === 2) {
    strengthBar.style.width = "50%";
    strengthBar.style.background = "#F59E0B";
  } else if (strength === 3) {
    strengthBar.style.width = "75%";
    strengthBar.style.background = "#3B82F6";
  } else {
    strengthBar.style.width = "100%";
    strengthBar.style.background = "#22C55E";
  }
});

/* Show / Hide password */
togglePassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.innerText = "Hide";
  } else {
    passwordInput.type = "password";
    togglePassword.innerText = "Show";
  }
});

/* Blur events */
nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("blur", validateEmail);
phoneInput.addEventListener("blur", validatePhone);
passwordInput.addEventListener("blur", validatePassword);

/* Submit */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isPasswordValid = validatePassword();

  if (isNameValid && isEmailValid && isPhoneValid && isPasswordValid) {
    successMsg.innerText = "Form submitted successfully!";
    form.reset();
    strengthBar.style.width = "0%";
  } else {
    successMsg.innerText = "";
  }
});
