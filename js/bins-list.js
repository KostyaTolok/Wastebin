var binsList = document.getElementsByClassName("bins-list__container")[0];

function addBin(bin, id) {
  let binTitle = createAnchor(
    `bin-view.html?id=${id}`,
    "bins-list__container-item",
    bin.title
  );
  let binAdded = createParagraph("bins-list__container-item", bin.createdDate);
  let binExpiration = createParagraph(
    "bins-list__container-item",
    bin.expiration
  );
  let binSyntax = createParagraph(
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
  let divider = document.createElement("div");
  divider.setAttribute("class", "bins-list__container-divider");
  binsList.appendChild(divider);
}

function createBinsListHead() {
  let title = createParagraph("bins-list__container-item", "Title");
  let added = createParagraph("bins-list__container-item", "Added");
  let expiration = createParagraph("bins-list__container-item", "Expires");
  let syntax = createParagraph("bins-list__container-item", "Syntax");
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
