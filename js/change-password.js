function submitChangePasswordForm(callback) {
  clearErrors();
  var oldPassword = document.getElementById("old-password-input").value;
  var newPassword = document.getElementById("new-password-input").value;
  var confirmPassword = document.getElementById("confirm-password-input").value;
  var foundErrors = false;

  if (oldPassword === "") {
    callback("Old password cannot be blank");
    foundErrors = true;
  }

  if (newPassword === "") {
    callback("New password cannot be blank");
    foundErrors = true;
  }

  if (newPassword === oldPassword) {
    callback("Old and new passwords are same");
    foundErrors = true;
  }

  if (confirmPassword != newPassword) {
    callback("Passwords don't match");
    foundErrors = true;
  }

  if (foundErrors) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    location.href = "index.html";
  }
}
