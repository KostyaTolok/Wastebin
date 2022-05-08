var binId = getUrlParam("id");

db.getCodeBin(binId)
  .then((bin) => {
    if (bin.data().password !== "") {
      binAuth.isAuthenticated().then((isAuthenticated) => {
        if (isAuthenticated) {
          binAuth.getUserProfile(binAuth.user.uid).then((profile) => {
            if (!profile.data().binAccess.includes(binId)) {
              location.href = "enter-password.html?id=" + binId;
            } else loadBin(bin.data());
          });
        } else {
          alert("You need to be logged in to view this bin");
          location.href = "login.html";
        }
      });
    } else loadBin(bin.data());
  })
  .catch((error) => {
    console.error("Error getting bins: ", error);
  });

function loadBin(bin) {
  let binTitle = document.getElementsByClassName("bin-info__title")[0];
  let binCreatedDate = document.getElementById("bin-created-date");
  let binViews = document.getElementById("bin-views-count");
  let binExpiration = document.getElementById("bin-expiration");
  let binSyntax = document.getElementsByClassName("top-area__left")[0];
  let sourceCode = document.getElementById("code-content");
  let newViewsCount = bin.viewsCount + 1;
  let editAnchor = document.getElementById("edit-button");
  editAnchor.setAttribute("href", `edit-bin.html?id=${binId}`);

  db.updateBinViewsCount(binId, newViewsCount)
    .then(() => {
      binViews.textContent = newViewsCount;
    })
    .catch((error) => {
      console.error("Error updating views count: ", error);
    });

  let binOwnerName = document.getElementById("bin-owner-name");
  let binOwnerImage = document.getElementById("bin-owner-image");
  binAuth
    .getUserProfile(bin.userId)
    .then((profile) => {
      binOwnerName.textContent = profile.data().name;
      if (profile.data().photoUrl) {
        binAuth.getUserPhotoUrl(profile.data().photoUrl).then((url) => {
          binOwnerImage.setAttribute("src", url);
        });
      }
    })
    .catch((error) => {
      console.error("Error getting user profile: ", error);
    });

  binTitle.textContent = bin.title;
  binCreatedDate.textContent = bin.createdDate;
  binExpiration.textContent = bin.expiration;
  binSyntax.textContent = bin.syntaxHighlighting;

  if (bin.syntaxHighlighting.toLowerCase() == "html") {
    sourceCode.innerHTML = bin.code
      .replace(new RegExp("<br>", "g"), "\n")
      .replace(new RegExp("&nbsp;", "g"), " ")
      .replace(new RegExp("&", "g"), "&amp;")
      .replace(new RegExp("<", "g"), "&lt;")
      .replace(new RegExp(">", "g"), "&gt;");
  } else {
    sourceCode.innerHTML = bin.code
      .replace(new RegExp("<br>", "g"), "\n")
      .replace(new RegExp("&nbsp;", "g"), " ");
  }
  highlightElement(bin.syntaxHighlighting, sourceCode);
}

function deleteBin() {
  binAuth.isAuthenticated().then((isAuthenticated) => {
    if (isAuthenticated) {
      db.isOwner(binId, binAuth.getCurrentUserId()).then((isOwner) => {
        if (isOwner) {
          if (confirm("Do you really want to delete bin?")) {
            db.deleteCodeBin(binId)
              .then(() => {
                console.log(`Bin with id ${binId} successfully deleted`);
                binAuth.removeBinAccess(binId).then(() => {
                  location.href = "index.html";
                });
              })
              .catch((error) => {
                console.error("Error deleting bin: ", error);
              });
          }
        } else {
          alert("You are not the owner of this bin");
        }
      });
    } else {
      alert("You need to be logged in to delete this bin");
    }
  });
}

function highlightElement(syntax, sourceCode) {
  switch (syntax.toLowerCase()) {
    case "javascript":
      sourceCode.setAttribute("class", "language-js line-numbers");
      break;
    case "html":
      sourceCode.setAttribute("class", "language-html line-numbers");
      break;
    case "css":
      sourceCode.setAttribute("class", "language-css line-numbers");
      break;
    case "c":
      sourceCode.setAttribute("class", "language-c line-numbers");
      break;
    case "c++":
      sourceCode.setAttribute("class", "language-cpp line-numbers");
      break;
    case "c#":
      sourceCode.setAttribute("class", "language-csharp line-numbers");
      break;
    case "python":
      sourceCode.setAttribute("class", "language-python line-numbers");
      break;
    default:
      break;
  }
  Prism.highlightElement(sourceCode);
}
