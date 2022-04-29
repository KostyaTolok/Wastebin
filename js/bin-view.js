var binId = getUrlParam("id");

db.getCodeBin(binId)
  .then((bin) => {
    loadBin(bin.data());
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
  if (confirm("Do you really want to delete bin?")) {
    db.deleteCodeBin(binId)
      .then(() => {
        console.log(`Bin with id ${binId} successfully deleted`);
        location.href = "index.html";
      })
      .catch((error) => {
        console.error("Error deleting bin: ", error);
      });
  }
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
