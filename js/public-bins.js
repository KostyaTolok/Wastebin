db.getPublicCodeBins()
  .then((snapshot) => {
    snapshot.docs.forEach((bin) => {
      addBin(bin.data(), bin.id);
    });
  })
  .catch((error) => {
    console.error("Error getting bins: ", error);
  });
