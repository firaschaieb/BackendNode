const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    phone: String,
    address: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    // cars: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "car"
    //   }
    // ]
  })
);

module.exports = User;
