let db = {
  openConnection() {
    return new Promise((resolve, reject) => {
      resolve(users);
    });
  },
  log() {},
};

let promise = db
  .openConnection()
  .then(
    (users) =>
      new Promise((resolve, reject) => {
        // getUser
        resolve(user);
      })
  )
  .then(
    (user) =>
      new Promise((resolve, reject) => {
        // getPermission
        resolve(permission);
      })
  )
  .then((permission) => {
    db.log("");
  });
