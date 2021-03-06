const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const vehicleSchema = new Schema({
  img: String,
  name: String,
  price: String,
  mode: String,
  door: Number,
  seat: Number,
  luggage: Number,
  city: [String],
  useCase: String,
  type: String
});

module.exports = mongoose.model(
  "vehicleDetail",
  vehicleSchema,
  "vehicleDetails"
);
