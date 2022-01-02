const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
//db.car = require("./car.model")
db.role = require("./role.model");

db.ROLES = ["assure", "assurance", "SOS"];

module.exports = db;