db.getPublicCodeBins()
  .then((snapshot) => {
    snapshot.docs.forEach((bin) => {
      addSideBin(bin.data(), bin.id);
    });
  })
  .catch((error) => {
    console.error("Error getting bins: ", error);
  });

function addSideBin(bin, id) {
  var binsList = document.getElementsByClassName("aside-bins-list")[0];
  var listitem = document.createElement("li");
  listitem.setAttribute("class", "aside-bins-list__item");

  var binTitle = createAnchor(
    `bin-view.html?id=${id}`,
    "aside-bins-list__item-name",
    bin.title
  );
  var binInfo = createParagraph(
    "aside-bins-list__item-info",
    `User | ${bin.syntaxHighlighting} | ${bin.createdDate}`
  );

  listitem.appendChild(binTitle);
  listitem.appendChild(binInfo);
  binsList.appendChild(listitem);
}

function createAnchor(link, cls, text) {
  var anchor = document.createElement("a");
  anchor.setAttribute("href", link);
  anchor.setAttribute("class", cls);
  anchor.textContent = text;
  return anchor;
}

function createParagraph(cls, text) {
  var paragraph = document.createElement("p");
  paragraph.setAttribute("class", cls);
  paragraph.textContent = text;
  return paragraph;
}

function addError(errorText) {
  var errorSummary = document.getElementsByClassName("error-summary")[0];
  var errorsList = document.getElementsByClassName("error-summary__list")[0];

  errorSummary.style.display = "block";
  var error = document.createElement("li");
  error.appendChild(document.createTextNode(errorText));
  errorsList.appendChild(error);
}

function clearErrors() {
  var errorsList = document.getElementsByClassName("error-summary__list")[0];
  errorsList.innerHTML = "";
}

function getUrlParam(param) {
  let queryString = location.search;
  let urlParams = new URLSearchParams(queryString);
  let value = urlParams.get(param);
  return value;
}

