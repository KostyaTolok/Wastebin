import { firebase } from "./firebase-config";
import { binConverter } from "./models/code-bin";

class BinDatabase {
  constructor() {
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

  async getCodeBinsByUserId(userId) {
    return this.database
      .collection("bins")
      .withConverter(binConverter)
      .where("userId", "==", userId)
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

  async isOwner(id, userId) {
    return this.getCodeBin(id).then((bin) => {
      return bin.data().userId === userId;
    });
  }
}

export var db = new BinDatabase();
