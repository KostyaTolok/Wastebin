const firebaseConfig = {
  apiKey: "AIzaSyBE2KYC-yd__rdy2r5a2QtLkH0uza_KHbM",

  authDomain: "wastebin-2eb92.firebaseapp.com",

  projectId: "wastebin-2eb92",

  storageBucket: "wastebin-2eb92.appspot.com",

  messagingSenderId: "774926963229",

  appId: "1:774926963229:web:e3e8eea4d2181a99872cf4",
};

class BinDatabase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.database = firebase.firestore();
  }

  async addCodeBin(bin) {
    return this.database
      .collection("bins")
      .withConverter(binConverter)
      .add(bin);
  }

  async getPublicCodeBins() {
    return this.database
      .collection("bins")
      .withConverter(binConverter)
      .orderBy("createdDate", "desc")
      .where("publicity", "==", "Public")
      .get();
  }

  async getCodeBin(id) {
    return this.database
      .collection("bins")
      .doc(id)
      .withConverter(binConverter)
      .get();
  }

  async deleteCodeBin(id) {
    return this.database.collection("bins").doc(id).delete();
  }

  async updateBinViewsCount(id, count) {
    return this.database.collection("bins").doc(id).update({
      viewsCount: count,
    });
  }

  async updateCodeBin(id, bin) {
    return this.database.collection("bins").doc(id).update({
      code: bin.code,
      syntaxHighlighting: bin.syntaxHighlighting,
      expiration: bin.expiration,
      publicity: bin.publicity,
      password: bin.password,
      title: bin.title,
    });
  }
}

var db = new BinDatabase();
