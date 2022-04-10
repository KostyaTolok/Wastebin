function submitChangePasswordForm() {
  clearErrors();
  var oldPassword = document.getElementById("old-password-input").value;
  var newPassword = document.getElementById("new-password-input").value;
  var confirmPassword = document.getElementById("confirm-password-input").value;
  var foundErrors = false;

  if (oldPassword === "") {
    addError("Old password cannot be blank");
    foundErrors = true;
  }

  if (newPassword === "") {
    addError("New password cannot be blank");
    foundErrors = true;
  }

  if (newPassword === oldPassword) {
    addError("Old and new passwords are same");
    foundErrors = true;
  }

  if (confirmPassword != newPassword) {
    addError("Passwords don't match");
    foundErrors = true;
  }

  if (foundErrors) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    location.href = "index.html";
  }
}
