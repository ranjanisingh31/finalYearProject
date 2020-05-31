const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const coordinateSchema = new Schema({
    searchId: String,
    userId: String,
    vName: String,
    iconColor: String,
    location: [{
        lng: Number,
        lat: Number
    }]
});

module.exports = mongoose.model(
    "coordinate",
    coordinateSchema,
    "coordinates"
);