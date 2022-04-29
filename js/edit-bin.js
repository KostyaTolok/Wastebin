var binId = getUrlParam("id");

db.getCodeBin(binId)
  .then((bin) => {
    loadEditableBin(bin.data());
  })
  .catch((error) => {
    console.error("Error getting bins: ", error);
  });

function loadEditableBin(bin) {
  let code = document.getElementsByClassName("code-area")[0];
  let syntaxSelect = document.getElementsByName(
    "syntax-highlighting-select"
  )[0];
  let expirationSelect = document.getElementsByName("bin-expiration-select")[0];
  let publicitySelect = document.getElementsByName("bin-publicity-select")[0];
  let password = passwordInput;
  let title = document.getElementById("title-input");

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
  let code = document.getElementsByClassName("code-area")[0].value;
  let selectedSyntax = document.getElementsByName(
    "syntax-highlighting-select"
  )[0].value;
  let selectedExpiration = document.getElementsByName(
    "bin-expiration-select"
  )[0].value;
  let selectedPublicity = document.getElementsByName("bin-publicity-select")[0]
    .value;
  let password = passwordInput.value;
  let title = document.getElementById("title-input").value;

  if (title === "") {
    title = "Untitled";
  }

  if (checkBinForm()) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    let currentBin = new CodeBin(
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
