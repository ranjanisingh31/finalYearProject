const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const registerSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
});

module.exports = mongoose.model(
  "register",
  registerSchema,
  "registerationDetails"
);
