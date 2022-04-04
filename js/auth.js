function submitLoginForm() {
  clearErrors();
  var email = document.getElementById("email-input").value;
  var password = document.getElementById("password-input").value;

  var foundErrors = false;

  if (email === "") {
    addError("Email cannot be blank");
    foundErrors = true;
  }

  if (password === "") {
    addError("Password cannot be blank");
    foundErrors = true;
  }

  if (foundErrors) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    location.href = "main-signed-in.html";
  }
}

function submitRegisterForm() {
  clearErrors();
  var email = document.getElementById("email-input").value;
  var username = document.getElementById("username-input").value;
  var password = document.getElementById("password-input").value;
  var confirmPassword = document.getElementById("confirm-password-input").value;
  var foundErrors = false;

  if (email === "") {
    addError("Email cannot be blank");
    foundErrors = true;
  }

  if (username === "") {
    addError("Username cannot be blank");
    foundErrors = true;
  }

  if (password === "") {
    addError("Password cannot be blank");
    foundErrors = true;
  }

  if (confirmPassword != password) {
    addError("Passwords don't match");
    foundErrors = true;
  }

  if (foundErrors) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    location.href = "main-signed-in.html";
  }
}

function login() {
  location.href = "index.html";
  isAuthenticated = true;
  var signedIn = document.getElementById("signed-in");
  var anonymous = document.querySelector("anonymous");

  signedIn.style.display = "block";
  anonymous.style.display = "none";
}

function logOut() {
  isAuthenticated = false;
  var signedIn = document.getElementById("signed-in");
  var anonymous = document.querySelector("anonymous");

  signedIn.style.display = "none";
  anonymous.style.display = "block";
}
