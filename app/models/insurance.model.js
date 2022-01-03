const mongoose = require("mongoose");

const User = require("./user.model");

const Insurance = mongoose.model(
  "Insurance",
  new mongoose.Schema({
    label: String,
    NumContrat: String,
    Agence: String,
    dateDu: String,
    dateAu: String,

    // user: User,
  })
);

module.exports = Insurance;