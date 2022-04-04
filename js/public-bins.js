db.getPublicCodeBins()
  .then((snapshot) => {
    snapshot.docs.forEach((bin) => {
      addBin(bin.data(), bin.id);
    });
  })
  .catch((error) => {
    console.error("Error getting bins: ", error);
  });

function addBin(bin, id) {
  var binsList = document.getElementsByClassName("bins-list__container")[0];
  var binTitle = createAnchor(
    `bin-view.html?id=${id}`,
    "bins-list__container-item",
    bin.title
  );
  var binAdded = createParagraph("bins-list__container-item", bin.createdDate);
  var binExpiration = createParagraph("bins-list__container-item", bin.expiration);
  var binSyntax = createParagraph("bins-list__container-item", bin.syntaxHighlighting);
  binsList.appendChild(binTitle);
  binsList.appendChild(binAdded);
  binsList.appendChild(binExpiration);
  binsList.appendChild(binSyntax);
  var divider = document.createElement("div");
  divider.setAttribute("class", "bins-list__container-divider");
  binsList.appendChild(divider);
}
