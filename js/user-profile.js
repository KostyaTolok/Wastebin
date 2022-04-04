function submitUpdateForm() {
  clearErrors();
  var email = document.getElementById("email-input").value;
  var username = document.getElementById("username-input").value;
  var foundErrors = false;

  if (email === "") {
    addError("Email cannot be blank");
    foundErrors = true;
  }

  if (username === "") {
    addError("Username cannot be blank");
    foundErrors = true;
  }

  if (foundErrors) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    location.href = "main-signed-in.html";
  }
}

var imageInput = document.getElementById("image-input");
var image = document.getElementsByClassName("user-picture")[0];
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
