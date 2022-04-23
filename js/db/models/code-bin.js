class CodeBin {
  constructor(
    code,
    syntaxHighlighting,
    expiration,
    publicity,
    password,
    title,
    userId,
    createdDate,
    viewsCount
  ) {
    this.code = code;
    this.syntaxHighlighting = syntaxHighlighting;
    this.expiration = expiration;
    this.publicity = publicity;
    this.password = password;
    this.title = title;
    this.userId = userId;
    this.createdDate = createdDate;
    this.viewsCount = viewsCount;
  }
}

const binConverter = {
  toFirestore: (bin) => {
    return {
      code: bin.code,
      syntaxHighlighting: bin.syntaxHighlighting,
      expiration: bin.expiration,
      publicity: bin.publicity,
      password: bin.password,
      title: bin.title,
      userId: bin.userId,
      createdDate: bin.createdDate,
      viewsCount: bin.viewsCount,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new CodeBin(
      data.code,
      data.syntaxHighlighting,
      data.expiration,
      data.publicity,
      data.password,
      data.title,
      data.userId,
      data.createdDate.toDate().toDateString(),
      data.viewsCount
    );
  },
};
