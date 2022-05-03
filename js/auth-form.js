function submitLoginForm(callback) {
  clearErrors();
  let email = document.getElementById("email-input").value;
  let password = document.getElementById("password-input").value;

  let errors = [];

  if (email === "") {
    errors.push("Email cannot be blank");
  }

  if (password === "") {
    errors.push("Password cannot be blank");
  }

  if (errors.length > 0) {
    errors.forEach((error) => {
      callback(error);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    binAuth
      .login(email, password)
      .then(() => {
        location.href = "index.html";
      })
      .catch((error) => {
        console.log(error.message);
        callback("Email or password is incorrect");
      });
  }
}

function submitRegisterForm(callback) {
  clearErrors();
  let email = document.getElementById("email-input").value;
  let username = document.getElementById("username-input").value;
  let password = document.getElementById("password-input").value;
  let confirmPassword = document.getElementById("confirm-password-input").value;
  let errors = [];

  if (email === "") {
    errors.push("Email cannot be blank");
  }

  if (username === "") {
    errors.push("Username cannot be blank");
  }

  if (password === "") {
    errors.push("Password cannot be blank");
  }

  if (confirmPassword != password) {
    errors.push("Passwords do not match");
  }

  if (errors.length > 0) {
    errors.forEach((error) => {
      callback(error);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    binAuth
      .register(email, username, password)
      .then(() => {
        location.href = "index.html";
      })
      .catch((error) => {
        console.log(error.message);
        callback("Email is already in use");
      });
  }
}
