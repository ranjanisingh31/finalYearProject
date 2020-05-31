const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const trackPlanSchema = new Schema({
  vehicle: String,
  type: String,
  intervals: String,
  price: Number,
});

module.exports = mongoose.model(
  "trackPlanDetail",
  trackPlanSchema,
  "trackPlanDetails"
);
