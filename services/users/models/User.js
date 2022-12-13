const { getDb } = require("../config/mongo");
const { ObjectId } = require("mongodb");

class User {
  static user() {
    const users = getDb().collection("users");
    return users;
  }

  static findAll() {
    return this.user().find().toArray();
  }

  static findById(userId) {
    return this.user().findOne({
      _id: ObjectId(userId),
    });
  }

  static findByEmail(email) {
    return this.user().findOne({
      email,
    });
  }

  static createUser(data) {
    return this.user().insertOne(data);
  }

  static update(body) {
    return this.user().updateOne(
      { _id: ObjectId(body.id) },
      {
        $set: {
          name: body.name,
          address: body.address,
          email: body.email,
          password: body.password,
        },
      }
    );
  }

  static deleteUser(userId) {
    return this.user().deleteOne({
      _id: ObjectId(userId),
    });
  }
}

module.exports = User;

// db.books.update(
//   { _id: 1 },
//   {
//     $inc: { stock: 5 },
//     $set: {
//       item: "ABC123",
//       "info.publisher": "2222",
//       tags: [ "software" ],
//       "ratings.1": { by: "xyz", rating: 3 }
//     }
//   }
// )
