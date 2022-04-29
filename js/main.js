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
  let binsList = document.getElementsByClassName("aside-bins-list")[0];
  let listitem = document.createElement("li");
  listitem.setAttribute("class", "aside-bins-list__item");

  let binTitle = createAnchor(
    `bin-view.html?id=${id}`,
    "aside-bins-list__item-name",
    bin.title
  );
  let binInfo = createParagraph(
    "aside-bins-list__item-info",
    `User | ${bin.syntaxHighlighting} | ${bin.createdDate}`
  );

  listitem.appendChild(binTitle);
  listitem.appendChild(binInfo);
  binsList.appendChild(listitem);
}

function createAnchor(link, cls, text) {
  let anchor = document.createElement("a");
  anchor.setAttribute("href", link);
  anchor.setAttribute("class", cls);
  anchor.textContent = text;
  return anchor;
}

function createParagraph(cls, text) {
  let paragraph = document.createElement("p");
  paragraph.setAttribute("class", cls);
  paragraph.textContent = text;
  return paragraph;
}

function addError(errorText) {
  let errorSummary = document.getElementsByClassName("error-summary")[0];
  let errorsList = document.getElementsByClassName("error-summary__list")[0];

  errorSummary.style.display = "block";
  let error = document.createElement("li");
  error.appendChild(document.createTextNode(errorText));
  errorsList.appendChild(error);
}

function clearErrors() {
  let errorsList = document.getElementsByClassName("error-summary__list")[0];
  errorsList.innerHTML = "";
}

function getUrlParam(param) {
  let queryString = location.search;
  let urlParams = new URLSearchParams(queryString);
  let value = urlParams.get(param);
  return value;
}

const logOutLink = document.getElementById("log-out-link");
logOutLink.addEventListener("click", (e) => {
  e.preventDefault();
  binAuth.logout().then(() => {
    location.href = "index.html";
  });
});
