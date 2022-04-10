var binsList = document.getElementsByClassName("bins-list__container")[0];

function addBin(bin, id) {
  var binTitle = createAnchor(
    `bin-view.html?id=${id}`,
    "bins-list__container-item",
    bin.title
  );
  var binAdded = createParagraph("bins-list__container-item", bin.createdDate);
  var binExpiration = createParagraph(
    "bins-list__container-item",
    bin.expiration
  );
  var binSyntax = createParagraph(
    "bins-list__container-item",
    bin.syntaxHighlighting
  );
  binsList.appendChild(binTitle);
  binsList.appendChild(binAdded);
  binsList.appendChild(binExpiration);
  binsList.appendChild(binSyntax);
  createDivider();
}

function createDivider() {
  var divider = document.createElement("div");
  divider.setAttribute("class", "bins-list__container-divider");
  binsList.appendChild(divider);
}

function createBinsListHead() {
  var title = createParagraph("bins-list__container-item", "Title");
  var added = createParagraph("bins-list__container-item", "Added");
  var expiration = createParagraph("bins-list__container-item", "Expires");
  var syntax = createParagraph("bins-list__container-item", "Syntax");
  binsList.appendChild(title);
  binsList.appendChild(added);
  binsList.appendChild(expiration);
  binsList.appendChild(syntax);
  createDivider();
}

function clearBinsList() {
  binsList.innerHTML = "";
  createBinsListHead();
}

function fillBinsList(bins) {
  bins.forEach((bin) => {
    addBin(bin.data, bin.id);
  });
}
