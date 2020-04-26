const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chauffeurDriveSchema = new Schema({
  type: String,
  city: String,
  transferType: String,
  pickupAddress: String,
  deliveryAddress: String,
  startDate: String,
  endDate: String,
  toCity: String,
  clientDetails: {
    fullName: String,
    email: String,
    mobile: String,
    gender: String,
    dob: String,
  },
  selectedVehicleDetails: {
    _id: String,
  },
});

module.exports = mongoose.model(
  "chauffeurDriveDetail",
  chauffeurDriveSchema,
  "chauffeurDriveDetails"
);
