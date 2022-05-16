import { firebase } from "../db/firebase-config";
import "firebase/auth";
import {
  UserProfile,
  userProfileConverter,
} from "../db/models/user-profile-model";

class BinAuth {
  constructor() {
    this.auth = firebase.auth();
    this.user = null;
    this.database = firebase.firestore();
  }

  async login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async register(email, username, password) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (cred) => {
        await this.createUserProfile(cred.user.uid, username);
        return this.auth.currentUser.updateProfile({
          displayName: username,
        });
      });
  }

  async logout() {
    return this.auth.signOut();
  }

  async isAuthenticated() {
    let authService = this;
    return await changeAuthState.then(() => {
      return authService.user != null;
    });
  }

  async updateUser(email, username, image) {
    if (image) {
      var path = this.auth.currentUser.uid + "/profilePicture/" + image.name;
      var storageRef = firebase.storage().ref(path);

      return storageRef.put(image).then(() => {
        return this.auth.currentUser
          .updateProfile({
            displayName: username,
            photoURL: path,
          })
          .then(() => {
            return this.auth.currentUser.updateEmail(email).then(() => {
              return this.updateUserProfile(
                this.auth.currentUser.uid,
                username,
                path
              );
            });
          });
      });
    } else {
      return this.auth.currentUser
        .updateProfile({
          displayName: username,
        })
        .then(() => {
          return this.auth.currentUser.updateEmail(email).then(() => {
            return this.updateUserProfile(
              this.auth.currentUser.uid,
              username,
              this.auth.currentUser.photoURL
            );
          });
        });
    }
  }

  async createUserProfile(userId, username) {
    let userProfile = new UserProfile(username, null, new Date(), []);
    return this.database
      .collection("users")
      .withConverter(userProfileConverter)
      .doc(userId)
      .set(userProfile);
  }

  async getUserProfile(userId) {
    return this.database
      .collection("users")
      .withConverter(userProfileConverter)
      .doc(userId)
      .get();
  }

  async updateUserProfile(id, name, photoUrl) {
    return this.database.collection("users").doc(id).update({
      name: name,
      photoUrl: photoUrl,
    });
  }

  async addBinAccess(binId) {
    return this.database
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .update({
        binAccess: firebase.firestore.FieldValue.arrayUnion(binId),
      });
  }

  async removeBinAccess(binId) {
    return this.database
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .update({
        binAccess: firebase.firestore.FieldValue.arrayRemove(binId),
      });
  }

  async getUser(userId) {
    return this.auth.getUser(userId);
  }

  getCurrentUserId() {
    return this.auth.currentUser.uid;
  }

  async getUserPhotoUrl(photoUrl) {
    if (photoUrl) {
      return firebase.storage().ref(photoUrl).getDownloadURL();
    }
  }

  async updatePassword(newPassword) {
    return this.user.updatePassword(newPassword);
  }
}

export const changeAuthState = new Promise((resolve) => {
  firebase.auth().onAuthStateChanged((user) => {
    binAuth.user = user;
    resolve();
  });
});


export let binAuth = new BinAuth();
