const mongoose = require("mongoose");

const User = require("./user.model");

const Car = mongoose.model(
  "Car",
  new mongoose.Schema({
    brand: String,
    name: String,
    type: String,
    serialNumber: String,
    carsInSerial: String,
    username: String,
  photos: [{
    type: String,
    required: false
}],
    // user: User,
  })
);

module.exports = Car;