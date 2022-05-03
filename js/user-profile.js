var emailInput = document.getElementById("email-input");
var usernameInput = document.getElementById("username-input");
var imageInput = document.getElementById("image-input");
var image = document.getElementsByClassName("user-picture")[0];

binAuth.isAuthenticated().then((isAuthenticated) => {
  if (isAuthenticated) {
    emailInput.value = binAuth.user.email;
    usernameInput.value = binAuth.user.displayName;
    if (binAuth.user.photoURL) {
      binAuth.getUserPhotoUrl(binAuth.user.photoURL).then((url) => {
        image.setAttribute("src", url);
      });
    }
  }
});

function submitUpdateForm(callback) {
  clearErrors();
  let errors = [];

  if (emailInput.value === "") {
    errors.push("Email cannot be blank");
  }

  if (usernameInput.value === "") {
    errors.push("Username cannot be blank");
  }

  if (errors.length > 0) {
    errors.forEach((error) => {
      callback(error);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    binAuth
      .updateUser(emailInput.value, usernameInput.value, imageInput.files[0])
      .then(() => {
        location.href = "index.html";
      })
      .catch((error) => {
        callback(error);
      });
  }
}

var fileTypes = ["image/jpeg", "image/pjpeg", "image/png"];
imageInput.addEventListener("change", updateUserPicture);

function updateUserPicture() {
  clearErrors();
  let currentFiles = imageInput.files;

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
