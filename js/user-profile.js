var emailInput = document.getElementById("email-input");
var usernameInput = document.getElementById("username-input");
var imageInput = document.getElementById("image-input");
var image = document.getElementsByClassName("user-picture")[0];

binAuth.isAuthenticated().then((isAuthenticated) => {
  if (isAuthenticated) {
    emailInput.value = binAuth.user.email;
    usernameInput.value = binAuth.user.displayName;
    if (binAuth.user.photoURL) {
      binAuth.getUserPhotoUrl().then((url) => {
        image.setAttribute("src", url);
      });
    }
  }
});

function submitUpdateForm() {
  clearErrors();
  var foundErrors = false;

  if (emailInput.value === "") {
    addError("Email cannot be blank");
    foundErrors = true;
  }

  if (usernameInput.value === "") {
    addError("Username cannot be blank");
    foundErrors = true;
  }

  if (foundErrors) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    binAuth
      .updateUser(emailInput.value, usernameInput.value, imageInput.files[0])
      .catch((error) => {
        addError(error);
      });
  }
}

var fileTypes = ["image/jpeg", "image/pjpeg", "image/png"];
imageInput.addEventListener("change", updateUserPicture);

function updateUserPicture() {
  var currentFiles = imageInput.files;

  if (currentFiles.length === 0) {
    addError("No user image selected");
  } else if (currentFiles.length > 1) {
    addError("Too many user images selected");
  } else if (!fileTypes.includes(currentFiles[0].type)) {
    addError("Incorrect user image type");
  } else {
    image.src = window.URL.createObjectURL(currentFiles[0]);
  }
}
