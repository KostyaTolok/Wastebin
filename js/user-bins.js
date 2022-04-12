var bins = [];

binAuth.isAuthenticated().then((isAuthenticated) => {
  if (isAuthenticated) {
    db.getCodeBinsByUserId(binAuth.getCurrentUserId())
      .then((snapshot) => {
        snapshot.docs.forEach((bin) => {
          bins.push({ id: bin.id, data: bin.data() });
        });
        fillBinsList(bins);
      })
      .catch((error) => {
        console.error("Error getting bins: ", error);
      });
    let userName = document.getElementsByClassName(
      "user-details__user-name"
    )[0];
    let userImage = document.getElementsByClassName("user-info__image")[0];
    userName.textContent = binAuth.user.displayName;
    if (binAuth.user.photoURL) {
      binAuth.getUserPhotoUrl().then((url) => {
        userImage.setAttribute("src", url);
      });
    }
  }
});

var searchInput = document.getElementsByClassName("search-container__input")[0];

searchInput.addEventListener("input", (event) => {
  let searchTerm = event.target.value;
  let newBins = [];
  if (searchTerm.length > 0) {
    bins.forEach((bin) => {
      if (bin.data.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        newBins.push(bin);
      }
    });
  } else {
    newBins = bins;
  }
  clearBinsList();
  fillBinsList(newBins);
});
