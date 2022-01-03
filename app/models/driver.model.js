const mongoose = require("mongoose");

const User = require("./user.model");

const Driver = mongoose.model(
  "Driver",
  new mongoose.Schema({
    name: String,
    prenom: String,
    permis: String,
    address: String,
    deliv: String,

    // user: User,
  })
);

module.exports = Driver;