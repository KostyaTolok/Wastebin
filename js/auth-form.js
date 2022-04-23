function submitLoginForm(callback) {
  clearErrors();
  var email = document.getElementById("email-input").value;
  var password = document.getElementById("password-input").value;

  var foundErrors = false;

  if (email === "") {
    callback("Email cannot be blank");
    foundErrors = true;
  }

  if (password === "") {
    callback("Password cannot be blank");
    foundErrors = true;
  }

  if (foundErrors) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    binAuth
      .login(email, password)
      .then(() => {
        location.href = "index.html";
      })
      .catch((error) => {
        callback("Email or password is incorrect");
      });
  }
}

function submitRegisterForm(callback) {
  clearErrors();
  var email = document.getElementById("email-input").value;
  var username = document.getElementById("username-input").value;
  var password = document.getElementById("password-input").value;
  var confirmPassword = document.getElementById("confirm-password-input").value;
  var foundErrors = false;

  if (email === "") {
    callback("Email cannot be blank");
    foundErrors = true;
  }

  if (username === "") {
    callback("Username cannot be blank");
    foundErrors = true;
  }

  if (password === "") {
    callback("Password cannot be blank");
    foundErrors = true;
  }

  if (confirmPassword != password) {
    callback("Passwords don't match");
    foundErrors = true;
  }

  if (foundErrors) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    binAuth
      .register(email, username, password)
      .then(() => {
        location.href = "index.html";
      })
      .catch((error) => {
        callback("Email is already in use");
      });
  }
}
