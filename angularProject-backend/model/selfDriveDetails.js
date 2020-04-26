const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const selfDriveSchema = new Schema({
  city: String,
  deliveryAddress: String,
  startDate: String,
  endDate: String,
  vehicle: String,
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
  "selfDriveDetail",
  selfDriveSchema,
  "selfDriveDetails"
);
