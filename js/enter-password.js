var binId = getUrlParam("id");
var bin;

db.getCodeBin(binId)
  .then((newBin) => {
    bin = newBin.data();
  })
  .catch((error) => {
    console.error("Error getting bins: ", error);
  });

function submitBinPasswordForm(callback) {
  clearErrors();
  var binPassword = document.getElementById("bin-password-input").value;
  var errors = [];

  if (binPassword === "") {
    errors.push("Bin password cannot be blank");
  }

  if (bin) {
    if (bin.password !== binPassword) {
      errors.push("Incorrect bin password");
    }
  } else {
    errors.push("Bin does not exist");
  }

  if (errors.length > 0) {
    errors.forEach((error) => {
      callback(error);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    binAuth.addBinAccess(binId).then(() => {
      location.href = "bin-view.html?id=" + binId;
    });
  }
}
