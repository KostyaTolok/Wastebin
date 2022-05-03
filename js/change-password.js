function submitChangePasswordForm(callback) {
  clearErrors();
  let newPassword = document.getElementById("new-password-input").value;
  let confirmPassword = document.getElementById("confirm-password-input").value;
  let errors = [];

  if (newPassword === "") {
    errors.push("New password cannot be blank");
  }

  if (confirmPassword != newPassword) {
    errors.push("Passwords do not match");
  }

  if (errors.length > 0) {
    errors.forEach((error) => {
      callback(error);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    binAuth
      .updatePassword(newPassword)
      .then(() => {
        location.href = "index.html";
      })
      .catch((error) => {
        callback(error.message);
      });
  }
}
