class BinAuth {
  constructor() {
    this.auth = firebase.auth();
    this.user = null;
  }

  async login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async register(email, username, password) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
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

      storageRef.put(image);
      return this.auth.currentUser.updateProfile({
        email: email,
        displayName: username,
        photoURL: path,
      });
    } else {
      return this.auth.currentUser.updateProfile({
        email: email,
        displayName: username,
      });
    }
  }

  getCurrentUserId() {
    return this.auth.currentUser.uid;
  }

  async getUserPhotoUrl() {
    if (this.user.photoURL) {
      return firebase.storage().ref(this.user.photoURL).getDownloadURL();
    }
  }

  async updatePassword(newPassword){
    return this.user.updatePassword(newPassword);
  }
}

const changeAuthState = new Promise((resolve) => {
  firebase.auth().onAuthStateChanged((user) => {
    binAuth.user = user;
    if (user) {
      showUserInfo(user);
    } else {
      showAuthButtons();
    }
    resolve();
  });
});

function showUserInfo(user) {
  let signedIn = document.getElementById("signed-in");
  let anonymous = document.getElementById("anonymous");

  signedIn.style.display = "block";
  anonymous.style.display = "none";

  let userName = document.getElementsByClassName("header__user-name")[0];
  let userImage = document.getElementsByClassName("header__user-image")[0];
  userName.textContent = user.displayName;
  if (user.photoURL != null) {
    firebase
      .storage()
      .ref(user.photoURL)
      .getDownloadURL()
      .then((url) => {
        userImage.setAttribute("src", url);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function showAuthButtons() {
  let signedIn = document.getElementById("signed-in");
  let anonymous = document.getElementById("anonymous");

  signedIn.style.display = "none";
  anonymous.style.display = "block";
}

let binAuth = new BinAuth();
