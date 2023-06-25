let db = {
  openConnection() {
    return new Promise((resolve, reject) => {
      resolve(users);
    });
  },
  log() {},
};

let users = await db.openConnection();
let user1 = await users.getUsers(1);
let permission = await user1.getPermission();
