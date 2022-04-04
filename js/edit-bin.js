var binId = getUrlParam("id");

db.getCodeBin(binId)
  .then((bin) => {
    loadEditableBin(bin.data());
  })
  .catch((error) => {
    console.error("Error getting bins: ", error);
  });

function loadEditableBin(bin) {
  var code = document.getElementsByClassName("code-area")[0];
  var syntaxSelect = document.getElementsByName(
    "syntax-highlighting-select"
  )[0];
  var expirationSelect = document.getElementsByName("bin-expiration-select")[0];
  var publicitySelect = document.getElementsByName("bin-publicity-select")[0];
  var password = passwordInput;
  var title = document.getElementById("title-input");

  code.value = bin.code
    .replace(new RegExp("<br>", "g"), "\n")
    .replace(new RegExp("&nbsp;", "g"), " ");
  syntaxSelect.value = bin.syntaxHighlighting;
  expirationSelect.value = bin.expiration;
  publicitySelect.value = bin.publicity;
  password.value = bin.password;
  title.value = bin.title;
  if (bin.password != "") {
    passwordCheckbox.checked = true;
    switchPassword();
  }
}

function submitUpdateBinForm() {
  clearErrors();
  var code = document.getElementsByClassName("code-area")[0].value;
  var selectedSyntax = document.getElementsByName(
    "syntax-highlighting-select"
  )[0].value;
  var selectedExpiration = document.getElementsByName(
    "bin-expiration-select"
  )[0].value;
  var selectedPublicity = document.getElementsByName("bin-publicity-select")[0]
    .value;
  var password = passwordInput.value;
  var title = document.getElementById("title-input").value;

  if (checkBinForm()) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    var currentBin = new CodeBin(
      code
        .replace(new RegExp("\n", "g"), "<br>")
        .replace(new RegExp(" ", "g"), "&nbsp;"),
      selectedSyntax,
      selectedExpiration,
      selectedPublicity,
      password,
      title
    );

    db.updateCodeBin(binId, currentBin)
      .then(() => {
        console.log("Bin updated with ID: ", binId);
        location.href = `bin-view.html?id=${binId}`;
      })
      .catch((error) => {
        console.error("Error updating bin: ", error);
      });
  }
}
