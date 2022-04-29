var passwordInput = document.getElementById("password-input");
var passwordCheckbox = document.getElementById("password-checkbox");

function switchPassword() {
  let passwordLabel = document.getElementById("password-label");

  if (passwordCheckbox.checked) {
    passwordLabel.textContent = "Enabled";
    passwordInput.removeAttribute("disabled");
    passwordInput.classList.remove("disabled");
  } else {
    passwordLabel.textContent = "Disabled";
    passwordInput.setAttribute("disabled", "disabled");
    passwordInput.classList.add("disabled");
  }
}

async function submitAddBinForm() {
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

  if (checkBinForm(addError)) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    let userId = null;
    if (binAuth.auth.currentUser) {
      userId = binAuth.getCurrentUserId();
    }

    let newBin = new CodeBin(
      code
        .replace(new RegExp("\n", "g"), "<br>")
        .replace(new RegExp(" ", "g"), "&nbsp;"),
      selectedSyntax,
      selectedExpiration,
      selectedPublicity,
      password,
      title,
      userId,
      new Date(),
      0
    );

    db.addCodeBin(newBin)
      .then((bin) => {
        console.log("Bin added with ID: ", bin.id);
        location.href = `bin-view.html?id=${bin.id}`;
      })
      .catch((error) => {
        console.error("Error adding bin: ", error);
      });
  }
}

function checkBinForm(callback) {
  let code = document.getElementsByClassName("code-area")[0].value;
  let password = passwordInput.value;

  let foundErrors = false;

  if (code === "") {
    callback("You cannot create empty bin");
    foundErrors = true;
  }

  if (passwordCheckbox.checked && password == "") {
    callback("Password cannot be blank");
    foundErrors = true;
  }

  return foundErrors;
}

function checkTab(element, event) {
  let code = element.value;
  if (event.key == "Tab") {
    event.preventDefault();
    let beforeTab = code.slice(0, element.selectionStart);
    let afterTab = code.slice(element.selectionEnd, element.value.length);
    let cursorPos = element.selectionEnd + 1;
    element.value = beforeTab + "\t" + afterTab;

    element.selectionStart = cursorPos;
    element.selectionEnd = cursorPos;
    update(element.value);
  }
}
