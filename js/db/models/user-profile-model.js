class UserProfile {
  constructor(name, photoUrl, registrationDate, binAccess) {
    this.name = name;
    this.photoUrl = photoUrl;
    this.registrationDate = registrationDate;
    this.binAccess = binAccess;
  }
}

const userProfileConverter = {
  toFirestore: (user) => {
    return {
      name: user.name,
      photoUrl: user.photoUrl,
      registrationDate: user.registrationDate,
      binAccess: user.binAccess,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new UserProfile(
      data.name,
      data.photoUrl,
      data.registrationDate.toDate().toDateString(),
      data.binAccess
    );
  },
};
