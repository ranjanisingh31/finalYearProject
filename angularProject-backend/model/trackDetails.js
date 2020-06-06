const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const trackSchema = new Schema({
    total: Number,
    address: {
        type: String,
        required: [true]
    },
    city: {
        type: String,
        required: [true]
    },
    companyDesc: {
        type: String
    },
    companyName: {
        type: String
    },
    email: {
        type: String,
        required: [true]

    },
    fullName: {
        type: String,
        required: [true]
    },
    mob: {
        type: String,
        required: [true]
    },
    postalCode: {
        type: String,
        required: [true]
    },
    state: {
        type: String,
        required: [true]
    },
    trackFor: {
        type: String,
        required: [true]
    },
    url: {
        type: String
    },
    selectedPlan: {
        _id: {
            type: String,
            required: [true]
        },
        vehicle: {
            type: String
        }

    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    expirationDate: {
        type: Date,
        default: Date.now() + 30 * 24 * 60 * 60 * 1000
    },
    userIDs: [],
    addVehicle: [
        {
            userId: String,
            vehicleName: String,
            iconColor: String,
            moving: String,
            stopped: String,
            offline: String,
            state: {
                type: String,
                default: "offline"
            }
        }
    ]
}
);

module.exports = mongoose.model("trackDetail", trackSchema, "trackDetails");
